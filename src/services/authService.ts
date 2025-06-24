import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const signupUser = async (email: string, password: string) => {
  let user = await User.findOne({ email });
  if (user) {
    throw new Error('User already exists');
  }

  // Generate a unique username
  let username = email.split('@')[0];
  let existingUser = await User.findOne({ username });
  while (existingUser) {
    username = `${email.split('@')[0]}${Math.floor(Math.random() * 1000)}`;
    existingUser = await User.findOne({ username });
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  user = new User({ email, username, passwordHash });
  await user.save();
  
  // Log the user in immediately by returning a token
  const payload = { user: { id: user.id } };
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }

  const token = jwt.sign(payload, secret, { expiresIn: '1h' });
  return { token };
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