import { moduleForModel, test } from 'ember-qunit';

moduleForModel('chain', 'Unit | Model | chain', {
  // Specify the other units that are required for this test.
  needs: ['model:action']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
