export function normalizeHumanName(value = '') {
  return value.replace(/\s+/g, ' ').trim();
}

export function validateHumanName(value = '', { label = 'Tên' } = {}) {
  if (!value) return `${label} là bắt buộc.`;
  if (value.length < 2) return `${label} phải có ít nhất 2 ký tự.`;
  return '';
}

export function isValidEmailAddress(value = '') {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateStrongPassword(value = '', { label = 'Mật khẩu' } = {}) {
  if (!value) return `${label} là bắt buộc.`;
  if (value.length < 8) return `${label} cần ít nhất 8 ký tự.`;
  if (!/[A-Z]/.test(value)) return `${label} cần ít nhất 1 chữ in hoa.`;
  if (!/[a-z]/.test(value)) return `${label} cần ít nhất 1 chữ thường.`;
  if (!/[0-9]/.test(value)) return `${label} cần ít nhất 1 chữ số.`;
  return '';
}

export function getPasswordHint() {
  return 'At least 8 characters, including uppercase, lowercase and a number.';
}
