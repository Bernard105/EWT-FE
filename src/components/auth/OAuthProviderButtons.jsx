import React, { useEffect, useState } from 'react';
import { GoogleIcon } from '../EnterpriseIcons';
import AppButton from '../ui/AppButton';
import { authService } from '../../services';

export default function OAuthProviderButtons({ mode = 'login' }) {
  const [googleEnabled, setGoogleEnabled] = useState(false);

  useEffect(() => {
    let active = true;

    authService
      .getOAuthProviders()
      .then((response) => {
        if (!active) return;
        const googleProvider = (response.providers || []).find((provider) => provider.provider === 'google');
        setGoogleEnabled(Boolean(googleProvider?.enabled));
      })
      .catch(() => {
        if (!active) return;
        setGoogleEnabled(false);
      });

    return () => {
      active = false;
    };
  }, []);

  if (!googleEnabled) return null;

  const buttonLabel = mode === 'login' ? 'Sign in with Google' : 'Continue with Google';

  return (
    <div className="suite-auth-oauth-stack">
      <div className="suite-auth-footnote">Or continue with</div>
      <AppButton
        variant="ghost"
        block
        icon={<GoogleIcon />}
        className="suite-google-button"
        type="button"
        onClick={() => window.location.assign(authService.getOAuthStartUrl('google'))}
      >
        {buttonLabel}
      </AppButton>
    </div>
  );
}
