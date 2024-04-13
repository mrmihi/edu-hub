import config from '../../../../../config';

export const constructCredentialEmailPayload = (email, role, password) => ({
  template: 'call_to_action',
  data: {
    header: 'Pharmaceutical Login Credentials',
    text: `You've been added as an user with role ${role} to the Pharmaceutical platform. Please use the following password to login to your account - ${password}`,
    c2a_link: `${config.FRONTEND_BASE_URL}/login`,
    c2a_button: 'Login',
  },
  options: {
    to: [email],
    subject: 'Pharmaceutical - Login Credentials',
  },
});
