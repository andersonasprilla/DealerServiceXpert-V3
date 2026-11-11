import assert from 'node:assert/strict';
import { test } from 'node:test';
import mongoose from 'mongoose';
import Customer from '../server/models/customerSchema.js';
import RepairOrder from '../server/models/repairOrderSchema.js';
import User from '../server/models/userSchema.js';
import buildQuery from '../server/utils/queryBuilder.js';

function customer(overrides = {}) {
  return new Customer({
    firstName: 'jANE', lastName: 'DOE', phone: '5551234567',
    vehicle: { make: 'Honda', model: 'Civic', year: 2024 }, ...overrides
  });
}

test('customer setters and nested validation remain compatible', async () => {
  const document = customer();
  await document.validate();
  assert.equal(document.firstName, 'Jane');
  assert.equal(document.lastName, 'Doe');
  const error = customer({ phone: '123', vehicle: { year: 1900 } }).validateSync();
  for (const field of ['phone', 'vehicle.make', 'vehicle.model', 'vehicle.year']) {
    assert.ok(error.errors[field], `Expected validation error for ${field}`);
  }
});

test('repair-order defaults, references and ObjectId casting remain compatible', async () => {
  const id = new mongoose.Types.ObjectId();
  const order = new RepairOrder({
    hatNumber: '1234', repairOrderNumber: '123456', repairDescription: 'Oil change',
    customer: id.toString(), user: id.toString()
  });
  await order.validate();
  assert.equal(order.status, 'checked-in');
  assert.equal(order.specialOrder, '');
  assert.ok(order.customer.equals(id));
  assert.equal(RepairOrder.schema.path('customer').options.ref, 'Customer');
  assert.equal(RepairOrder.schema.path('user').options.ref, 'User');
});

test('repair-order validation rejects invalid numbers and status', () => {
  const error = new RepairOrder({
    hatNumber: '12', repairOrderNumber: 'abc', repairDescription: 'Oil change', status: 'invalid'
  }).validateSync();
  for (const field of ['hatNumber', 'repairOrderNumber', 'status']) {
    assert.ok(error.errors[field], `Expected validation error for ${field}`);
  }
});

test('existing application-built $in filters still cast normally', () => {
  const filter = buildQuery({ status: ['checked-in', 'in-repair'] }, ['status']);
  const count = RepairOrder.countDocuments(filter).cast(RepairOrder);
  const find = RepairOrder.find(filter).cast(RepairOrder);
  assert.deepEqual(count, { status: { $in: ['checked-in', 'in-repair'] } });
  assert.deepEqual(count, find);
});

test('user validation, normalization and password hashing middleware still work', async t => {
  // Exercise the real save hooks and Argon2, stubbing only MongoDB's insert boundary.
  t.mock.method(User.collection, 'insertOne', async document => ({
    acknowledged: true, insertedId: document._id
  }));
  const user = new User({
    username: 'jANE DOE', email: 'advisor@example.com', password: 'review-password',
    role: 'Service Advisor'
  });
  await user.save();
  assert.equal(user.username, 'Jane Doe');
  assert.notEqual(user.password, 'review-password');
  assert.equal(await user.matchPassword('review-password'), true);
  assert.equal(await user.matchPassword('wrong-password'), false);
});
