import express from 'express';
import { celebrate, Segments } from 'celebrate';
import { tracedAsyncHandler, traced } from '@sliit-foss/functions';
import { toSuccess } from '@app/middleware';
import { serviceLogin, serviceRegister, serviceRefreshToken, serviceVerifyUser, serviceLogout, serviceForgotPassword, serviceResetPassword } from './service';
import { loginSchema, registerSchema, refreshTokenSchema, validUserResetPasswordSchema, resetPasswordSchema } from './schema';

const auth = express.Router();
const login_post = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (role === "admin") {
      const admin = await adminSchema.login(email, password);
      const token = createTokenAdmin(admin._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ token, admin: admin.name});
    } else if (role === "instructor") {
      const instructor = await instructorSchema.login(email, password);
      const token = createTokenInstructor(instructor._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ token , instructor: instructor.name});
    } else if (role === "learner") {
      const learner = await learnerSchema.login(email, password);
      const token = createTokenLearner(learner._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({token , learner: learner.name});
    }
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

auth.post(
  '/login',
  login_post
);

auth.post(
  '/register',
  celebrate({ [Segments.BODY]: registerSchema }),
  tracedAsyncHandler(async function controllerRegister(req, res) {
    const data = await traced(serviceRegister)(req.body);
    return toSuccess({ res, data, message: 'Registration successfull! Please check your email to verify your account' });
  }),
);

auth.post(
  '/refresh-token',
  celebrate({ [Segments.BODY]: refreshTokenSchema }),
  tracedAsyncHandler(async function controllerRefreshToken(req, res) {
    const data = await traced(serviceRefreshToken)(req.body.refresh_token);
    return toSuccess({ res, data, message: 'Token refresh successfull!' });
  }),
);

auth.get(
  '/verify/:code',
  tracedAsyncHandler(async function controllerVerifyUser(req, res) {
    await traced(serviceVerifyUser)(req.params.code);
    return toSuccess({ res, message: 'User verified successfully!' });
  }),
);

auth.get(
  '/current',
  tracedAsyncHandler(function controllerGetAuthUser(req, res) {
    delete req.user.password;
    return toSuccess({ res, data: req.user, message: 'Auth user fetched successfully!' });
  }),
);

auth.post(
  '/logout',
  tracedAsyncHandler(async function controllerLogout(req, res) {
    await traced(serviceLogout)(req.token);
    return toSuccess({ res, message: 'Logout successfull!' });
  }),
);

auth.post(
  '/forgot-password',
  tracedAsyncHandler(async function controllerForgotPassword(req, res) {
    await traced(serviceForgotPassword)(req.body.email);
    return toSuccess({ res, message: 'A password registration link has been emailed to you. Please use it to reset your password' });
  }),
);

auth.post(
  '/reset-password/:code',
  celebrate({ [Segments.PARAMS]: validUserResetPasswordSchema, [Segments.BODY]: resetPasswordSchema }),
  tracedAsyncHandler(async function controllerResetPassword(req, res) {
    await traced(serviceResetPassword)(req.body.new_password, req.params.code);
    return toSuccess({ res, message: 'Password reset successfull!' });
  }),
);

export default auth;
