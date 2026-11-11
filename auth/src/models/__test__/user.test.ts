import mongoose from 'mongoose';
import { User } from '../user';
import { Password } from '../../services/password';

it('keeps the public user JSON contract without exposing password or database fields', async () => {
  const user = User.build({ email: 'advisor@example.com', password: 'password' });
  await user.save();
  expect(JSON.parse(JSON.stringify(user))).toEqual({
    email: 'advisor@example.com', id: user.id
  });
});

it('persists a hashed password and retains it on an unchanged save', async () => {
  const user = User.build({ email: 'advisor@example.com', password: 'password' });
  await user.save();
  const stored = await User.findById(user.id);
  expect(stored).not.toBeNull();
  expect(stored!.password).not.toEqual('password');
  expect(await Password.compare(stored!.password, 'password')).toBe(true);
  const hash = stored!.password;
  await stored!.save();
  expect(stored!.password).toEqual(hash);
});

it('countDocuments sanitization rejects an injected selector against a real test database', async () => {
  await User.build({ email: 'advisor@example.com', password: 'password' }).save();
  await expect(User.countDocuments({ email: 'advisor@example.com' })
    .setOptions({ sanitizeFilter: true }).exec()).resolves.toBe(1);
  await expect(User.countDocuments({ email: { $ne: null } })
    .setOptions({ sanitizeFilter: true }).exec()).rejects.toBeInstanceOf(mongoose.Error.CastError);
});
