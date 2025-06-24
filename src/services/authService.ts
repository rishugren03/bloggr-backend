import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const signupUser = async (email: string, password: string) => {
  let user = await User.findOne({ email });
  if (user) {
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  user = new User({ email, passwordHash });
  await user.save();
  return { msg: 'User registered successfully' };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const payload = { user: { id: user.id } };
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }

  const token = jwt.sign(payload, secret, { expiresIn: '1h' });
  return { token };
}; 