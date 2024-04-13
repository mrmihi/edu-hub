import bcrypt from 'bcryptjs';

export const hashPasswordIfProvided = async (user) => {
  if (user.password && !user.password.match(/^\$2[ayb]\$.{56}$/)) user.password = await bcrypt.hash(user.password, 10); // If password is not already hashed, hash it
  return user;
};
