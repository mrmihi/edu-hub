import config from '../../../../../config';

export const constructVerificationEmailPayload = (email, code) => ({
  template: 'call_to_action',
  data: {
    header: 'Activate Account',
    text: "You're almost there. To finish activating your account please click the link below.",
    c2a_link: `${config.FRONTEND_BASE_URL}/verify?code=${code}`,
    c2a_button: 'Activate Account',
  },
  options: {
    to: [email],
    subject: 'Activate your account',
  },
});

export const constructForgotPasswordEmailPayload = (email, code) => ({
  template: 'call_to_action',
  data: {
    header: 'Reset Password',
    text: "You're almost there. Please click the link below to reset your password",
    c2a_link: `${config.FRONTEND_BASE_URL}/reset-password?code=${code}`,
    c2a_button: 'Reset',
  },
  options: {
    to: [email],
    subject: 'Reset Password',
  },
});
