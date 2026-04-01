import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import EnterpriseLogo from '../../components/EnterpriseLogo';
import { LockIcon, MailIcon, UserIcon } from '../../components/EnterpriseIcons';
import { PageGlow } from '../../components/EnterpriseShell';
import AuthField from '../../components/auth/AuthField';
import AuthNotice from '../../components/auth/AuthNotice';
import OAuthProviderButtons from '../../components/auth/OAuthProviderButtons';
import '../../components/EnterpriseLogo.css';
import '../../components/EnterpriseShell.css';
import '../../components/ui/AppButton.css';
import '../../styles/auth/AuthPages.css';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { authService } from '../../services';
import { ROUTES } from '../../routes';
import AppButton from '../../components/ui/AppButton';
import { useSubmitState } from '../../hooks/useSubmitState';
import {
  getPasswordHint,
  isValidEmailAddress,
  normalizeHumanName,
  validateHumanName,
  validateStrongPassword,
} from '../../lib/validation';
import { APP_CONFIG } from '../../config/appConfig';

export function RegisterPage() {
  const { theme } = useTheme();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', agree: true });
  const [fieldErrors, setFieldErrors] = useState({ name: '', email: '', password: '' });
  const [result, setResult] = useState(null);
  const state = useSubmitState();

  const updateField = (event) => {
    const { name, value, checked, type } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));

    if (name !== 'agree') {
      setFieldErrors((current) => ({ ...current, [name]: '' }));
      state.clear();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const normalizedName = normalizeHumanName(form.name);
    const normalizedEmail = form.email.trim().toLowerCase();
    const nextFieldErrors = {
      name: validateHumanName(normalizedName, { label: 'Họ tên' }),
      email: normalizedEmail && !isValidEmailAddress(normalizedEmail) ? 'Email không hợp lệ.' : '',
      password: validateStrongPassword(form.password),
    };

    if (!normalizedEmail) {
      nextFieldErrors.email = 'Email là bắt buộc.';
    }

    setFieldErrors(nextFieldErrors);
    const firstError = Object.values(nextFieldErrors).find(Boolean);
    if (firstError) return state.fail(firstError);
    if (!form.agree) return state.fail('Bạn cần đồng ý điều khoản trước khi tạo tài khoản.');

    try {
      state.start();
      const response = await register({
        name: normalizedName,
        email: normalizedEmail,
        password: form.password,
      });
      setResult(response);
      setFieldErrors({ name: '', email: '', password: '' });
      setForm({ name: '', email: '', password: '', agree: true });
    } catch (error) {
      state.fail(error.message);
    } finally {
      state.done();
    }
  };

  return (
    <div className={`suite-auth-screen suite-auth-register theme-${theme}`}>
      <PageGlow />
      <div className="suite-auth-frame">
        <div className="suite-auth-header centered">
          <Link to={ROUTES.home} aria-label="Go to landing page">
            <EnterpriseLogo subtitle="Enterprise HQ | Registration" />
          </Link>
        </div>

        <section className="suite-auth-card">
          <h2>Create Account</h2>
          <p>Tạo tài khoản mới với validation gọn hơn cho họ tên và mật khẩu trước khi gửi sang backend.</p>

          <form className="suite-auth-form" onSubmit={handleSubmit}>
            <AuthField
              label="FULL NAME"
              icon={<UserIcon />}
              placeholder="Nguyen Van A"
              name="name"
              value={form.name}
              onChange={updateField}
              autoComplete="name"
              maxLength={60}
              error={fieldErrors.name}
              hint="Dùng tên thật hoặc tên hiển thị dễ nhận diện."
            />
            <AuthField
              label="WORK EMAIL"
              icon={<MailIcon />}
              placeholder="name@company.com"
              name="email"
              value={form.email}
              onChange={updateField}
              autoComplete="email"
              error={fieldErrors.email}
              inputProps={{ inputMode: 'email' }}
            />
            <AuthField
              label="PASSWORD"
              icon={<LockIcon />}
              placeholder="••••••••••••"
              type="password"
              name="password"
              value={form.password}
              onChange={updateField}
              autoComplete="new-password"
              maxLength={64}
              error={fieldErrors.password}
              hint={getPasswordHint()}
            />

            <AuthNotice>{state.error}</AuthNotice>
            <AuthNotice type="info">{result?.message}</AuthNotice>

            <label className="suite-checkline">
              <input type="checkbox" name="agree" checked={form.agree} onChange={updateField} />
              <span>
                I agree to the <a href="/#">Terms of Service</a> and <a href="/#">Privacy Policy</a>.
              </span>
            </label>

            <AppButton block type="submit" disabled={state.submitting}>
              {state.submitting ? 'Creating account…' : 'Create Account'}
            </AppButton>
          </form>

          <OAuthProviderButtons mode="register" />

          {result?.verification_url ? (
            <div className="suite-inline-notice success">
              <div>SMTP chưa sẵn sàng, nên backend đã trả trực tiếp link xác thực để dùng ở môi trường dev.</div>
              <a href={result.verification_url}>Verify account</a>
            </div>
          ) : null}

          <div className="suite-auth-footnote">
            Already have an account? <Link to={ROUTES.login}>Login</Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export function LoginPage() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const state = useSubmitState();
  const verified = searchParams.get('verified') === '1';
  const verifyError = searchParams.get('verify_error');
  const redirectPath = location.state?.from?.pathname || APP_CONFIG.defaultAuthedRoute;

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    state.clear();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.email.trim() || !form.password) return state.fail('Vui lòng nhập email và mật khẩu.');

    try {
      state.start();
      await login(form.email.trim(), form.password);
      navigate(redirectPath, { replace: true });
    } catch (error) {
      state.fail(error.message);
    } finally {
      state.done();
    }
  };

  return (
    <div className={`suite-auth-screen suite-auth-login split theme-${theme}`}>
      <PageGlow />
      <div className="suite-auth-frame wide">
        <section className="suite-login-copy">
          <span className="suite-kicker">WORKSPACE INTELLIGENCE</span>
          <h1>
            Elevate
            <br />
            Together.
          </h1>
          <p>Đăng nhập để vào workspace, tiếp tục công việc và đồng bộ trực tiếp với backend hiện tại.</p>

          <div className="suite-trust-row">
            <div className="suite-avatar-stack">
              <span>A</span>
              <span>S</span>
              <span>D</span>
            </div>
            <div>
              <strong>Direct API Integration</strong>
              <p>Access token được lưu riêng và giữ phiên đăng nhập cho đến khi người dùng chủ động Sign out.</p>
            </div>
          </div>
        </section>

        <section className="suite-auth-card login-card">
          <Link to={ROUTES.home} aria-label="Go to landing page">
            <EnterpriseLogo compact />
          </Link>
          <div className="suite-login-heading">
            <strong>Welcome Back</strong>
            <p>Access your workspace dashboard</p>
          </div>

          <form className="suite-auth-form" onSubmit={handleSubmit}>
            <AuthField
              label="EMAIL ADDRESS"
              icon={<MailIcon />}
              placeholder="name@company.com"
              name="email"
              value={form.email}
              onChange={updateField}
              autoComplete="email"
            />
            <AuthField
              label="PASSWORD"
              icon={<LockIcon />}
              placeholder="••••••••"
              type="password"
              name="password"
              value={form.password}
              onChange={updateField}
              autoComplete="current-password"
            />

            <AuthNotice>{state.error || verifyError}</AuthNotice>
            <AuthNotice type="success">{verified ? 'Email verified successfully. You can log in now.' : ''}</AuthNotice>

            <AppButton block type="submit" disabled={state.submitting}>
              {state.submitting ? 'Logging in…' : 'Login'}
            </AppButton>
          </form>

          <OAuthProviderButtons mode="login" />

          <div className="suite-auth-footnote">
            <Link to={ROUTES.forgotPassword}>Forgot password?</Link>
          </div>
          <div className="suite-auth-footnote">
            Don’t have an account? <Link to={ROUTES.register}>Register Now</Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export function ForgotPasswordPage() {
  const { theme } = useTheme();
  const state = useSubmitState();
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) return state.fail('Vui lòng nhập email đã đăng ký.');
    if (!isValidEmailAddress(normalizedEmail)) return state.fail('Email không hợp lệ.');

    try {
      state.start();
      const response = await authService.forgotPassword({ email: normalizedEmail });
      setResult(response);
    } catch (error) {
      state.fail(error.message);
    } finally {
      state.done();
    }
  };

  return (
    <div className={`suite-auth-screen suite-auth-forgot theme-${theme}`}>
      <PageGlow />
      <div className="suite-auth-frame compact">
        <div className="suite-auth-header centered">
          <Link to={ROUTES.home} aria-label="Go to landing page">
            <EnterpriseLogo subtitle="Enterprise HQ Authentication" />
          </Link>
        </div>

        <section className="suite-auth-card narrow">
          <div className="suite-card-icon-block">↺</div>
          <h2>Forgot Password?</h2>
          <p>
            Nếu Gmail SMTP đã được cấu hình, hệ thống sẽ gửi link đặt lại mật khẩu qua email. Nếu chưa cấu hình,
            backend sẽ trả link trực tiếp để bạn dùng ở môi trường dev.
          </p>

          <form className="suite-auth-form" onSubmit={handleSubmit}>
            <AuthField
              label="WORK EMAIL"
              icon={<MailIcon />}
              placeholder="name@company.com"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              inputProps={{ inputMode: 'email' }}
            />

            <AuthNotice>{state.error}</AuthNotice>
            <AuthNotice type="info">{result?.message}</AuthNotice>

            <AppButton block type="submit" disabled={state.submitting}>
              {state.submitting ? 'Sending reset email…' : 'Send reset email'}
            </AppButton>
          </form>

          {result?.reset_url ? (
            <div className="suite-inline-notice success">
              <div>Reset link sẵn sàng trong 60 phút.</div>
              <a href={result.reset_url}>Open reset screen</a>
            </div>
          ) : null}

          <AppButton to={ROUTES.login} variant="ghost" block>
            Back to Login
          </AppButton>
          <Link className="suite-backlink" to={ROUTES.register}>
            ← Create a new account
          </Link>
        </section>
      </div>
    </div>
  );
}

export function ResetPasswordPage() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const state = useSubmitState();
  const [fieldErrors, setFieldErrors] = useState({ token: '', newPassword: '', confirmPassword: '' });
  const [form, setForm] = useState({
    token: searchParams.get('token') || '',
    newPassword: '',
    confirmPassword: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setFieldErrors((current) => ({ ...current, [name]: '' }));
    state.clear();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextFieldErrors = {
      token: form.token.trim() ? '' : 'Thiếu reset token.',
      newPassword: validateStrongPassword(form.newPassword, { label: 'Mật khẩu mới' }),
      confirmPassword: form.newPassword === form.confirmPassword ? '' : 'Mật khẩu xác nhận chưa khớp.',
    };

    setFieldErrors(nextFieldErrors);
    const firstError = Object.values(nextFieldErrors).find(Boolean);
    if (firstError) return state.fail(firstError);

    try {
      state.start();
      const response = await authService.resetPassword({
        token: form.token.trim(),
        newPassword: form.newPassword,
      });
      setSuccessMessage(response.message || 'Password reset successfully');
      setFieldErrors({ token: '', newPassword: '', confirmPassword: '' });
      setForm((current) => ({ ...current, newPassword: '', confirmPassword: '' }));
    } catch (error) {
      state.fail(error.message);
    } finally {
      state.done();
    }
  };

  return (
    <div className={`suite-auth-screen suite-auth-reset theme-${theme}`}>
      <PageGlow />
      <div className="suite-auth-frame compact">
        <div className="suite-auth-header centered">
          <Link to={ROUTES.home} aria-label="Go to landing page">
            <EnterpriseLogo subtitle={null} />
          </Link>
        </div>

        <section className="suite-auth-card narrow">
          <h2>Reset Password</h2>
          <p>Nhập token reset và mật khẩu mới. Đổi xong, mọi phiên cũ sẽ bị đăng xuất.</p>

          <form className="suite-auth-form" onSubmit={handleSubmit}>
            <AuthField
              label="RESET TOKEN"
              icon={<MailIcon />}
              placeholder="Paste reset token"
              name="token"
              value={form.token}
              onChange={updateField}
              autoComplete="off"
              error={fieldErrors.token}
            />
            <AuthField
              label="NEW PASSWORD"
              icon={<LockIcon />}
              placeholder="••••••••"
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={updateField}
              autoComplete="new-password"
              maxLength={64}
              error={fieldErrors.newPassword}
              hint={getPasswordHint()}
            />
            <AuthField
              label="CONFIRM PASSWORD"
              icon={<LockIcon />}
              placeholder="••••••••"
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={updateField}
              autoComplete="new-password"
              maxLength={64}
              error={fieldErrors.confirmPassword}
            />

            <AuthNotice>{state.error}</AuthNotice>
            <AuthNotice type="success">{successMessage}</AuthNotice>

            <AppButton block type="submit" disabled={state.submitting}>
              {state.submitting ? 'Resetting password…' : 'Reset password'}
            </AppButton>
          </form>

          {successMessage ? (
            <AppButton variant="ghost" block type="button" onClick={() => navigate(ROUTES.login)}>
              Go to Login
            </AppButton>
          ) : null}

          <Link className="suite-backlink" to={ROUTES.forgotPassword}>
            ← Back to forgot password
          </Link>
        </section>
      </div>
    </div>
  );
}

export function OAuthCallbackPage() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { completeSession } = useAuth();
  const [message, setMessage] = useState('Completing OAuth sign-in…');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    const userId = searchParams.get('user_id');
    const email = searchParams.get('email');
    const name = searchParams.get('name');
    const providerError = searchParams.get('error');

    if (providerError) {
      setError(providerError);
      setMessage('OAuth sign-in did not complete.');
      return;
    }

    if (!token || !userId || !email || !name) {
      setError('Missing OAuth session data. Please try again.');
      setMessage('OAuth sign-in did not complete.');
      return;
    }

    completeSession(token, {
      id: Number(userId),
      email,
      name,
    });
    navigate(APP_CONFIG.defaultAuthedRoute, { replace: true });
  }, [completeSession, navigate, searchParams]);

  return (
    <div className={`suite-auth-screen suite-auth-login split theme-${theme}`}>
      <PageGlow />
      <div className="suite-auth-frame compact">
        <section className="suite-auth-card narrow">
          <h2>OAuth Login</h2>
          <p>{message}</p>
          <AuthNotice>{error}</AuthNotice>
          {error ? (
            <AppButton to={ROUTES.login} block>
              Back to Login
            </AppButton>
          ) : null}
        </section>
      </div>
    </div>
  );
}
