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


for (const api of ['connect', 'createConnection']) {
  it(`${api} applies connection-level sanitizeFilter against a real test database`, async () => {
    const instance = new mongoose.Mongoose();
    const uri = `mongodb://${mongoose.connection.host}:${mongoose.connection.port}/${mongoose.connection.name}`;
    let connection: mongoose.Connection;
    if (api === 'connect') {
      await instance.connect(uri, { sanitizeFilter: true });
      connection = instance.connection;
    } else {
      connection = await instance.createConnection(uri, { sanitizeFilter: true }).asPromise();
    }
    try {
      expect(connection.get('sanitizeFilter')).toBe(true);
      const Account = connection.model('ConnectionAccount', new instance.Schema({
        email: String, password: String
      }));
      await Account.create({ email: 'advisor@example.com', password: 'test-password' });
      await expect(Account.findOne({ email: 'advisor@example.com', password: 'wrong' }).lean().exec())
        .resolves.toBeNull();
      await expect(Account.findOne({ email: 'advisor@example.com', password: { $ne: null } }).lean().exec())
        .rejects.toBeInstanceOf(mongoose.Error.CastError);
      await expect(Account.countDocuments({ password: { $ne: null } }).exec())
        .rejects.toBeInstanceOf(mongoose.Error.CastError);
      await expect(Account.countDocuments({ email: 'advisor@example.com' }).exec()).resolves.toBe(1);
    } finally {
      await connection.close();
    }
  });
}
