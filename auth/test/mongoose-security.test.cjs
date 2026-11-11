const assert = require('node:assert/strict');
const { test } = require('node:test');
const mongoose = require('mongoose');

// GHSA-pcrw-h46h-c93h: exercise Query.exec(), not just sanitizeFilter().
// Stub only the MongoDB collection boundary. No database or credentials needed.
function fixture() {
  const instance = new mongoose.Mongoose();
  const Model = instance.model('SecurityRegression', new instance.Schema({
    email: String,
    metadata: instance.Schema.Types.Mixed
  }));
  const calls = [];
  Model.collection.countDocuments = async filter => {
    calls.push(filter);
    return 2;
  };
  return { instance, Model, calls };
}

async function rejectsSelector(Model, calls, filter, options = {}) {
  await assert.rejects(
    Model.countDocuments(filter).setOptions(options).exec(),
    error => error instanceof mongoose.Error.CastError && error.path === 'email'
  );
  assert.equal(calls.length, 0, 'An unsafe selector must not reach MongoDB');
}

test('countDocuments keeps ordinary scalar filters with sanitization enabled', async () => {
  const { Model, calls } = fixture();
  const count = await Model.countDocuments({ email: 'advisor@example.com' })
    .setOptions({ sanitizeFilter: true }).exec();
  assert.equal(count, 2);
  assert.deepEqual(calls, [{ email: 'advisor@example.com' }]);
});

test('countDocuments rejects a selector when query sanitization is enabled', async () => {
  const { Model, calls } = fixture();
  await rejectsSelector(Model, calls, { email: { $ne: null } }, { sanitizeFilter: true });
});

test('countDocuments honors instance-wide sanitizeFilter', async () => {
  const { instance, Model, calls } = fixture();
  instance.set('sanitizeFilter', true);
  await rejectsSelector(Model, calls, { email: { $ne: null } });
});

for (const logicalOperator of ['$or', '$and']) {
  test(`countDocuments sanitizes selectors inside ${logicalOperator}`, async () => {
    const { Model, calls } = fixture();
    await rejectsSelector(Model, calls, {
      [logicalOperator]: [{ email: { $ne: null } }]
    }, { sanitizeFilter: true });
  });
}

test('countDocuments treats an operator-shaped Mixed value as literal data', async () => {
  const { Model, calls } = fixture();
  await Model.countDocuments({ metadata: { $ne: null } })
    .setOptions({ sanitizeFilter: true }).exec();
  assert.deepEqual(calls, [{ metadata: { $eq: { $ne: null } } }]);
});

test('countDocuments preserves explicitly trusted application selectors', async () => {
  const { instance, Model, calls } = fixture();
  const selector = instance.trusted({ $in: ['advisor@example.com'] });
  const count = await Model.countDocuments({ email: selector })
    .setOptions({ sanitizeFilter: true }).exec();
  assert.equal(count, 2);
  assert.deepEqual(calls[0].email.$in, ['advisor@example.com']);
  assert.equal(Object.hasOwn(calls[0].email, '$eq'), false);
});

test('countDocuments preserves existing behavior when sanitization is disabled', async () => {
  const { Model, calls } = fixture();
  await Model.countDocuments({ email: { $ne: null } })
    .setOptions({ sanitizeFilter: false }).exec();
  assert.deepEqual(calls, [{ email: { $ne: null } }]);
});
