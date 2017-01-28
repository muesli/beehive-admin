import { moduleForModel, test } from 'ember-qunit';

moduleForModel('bee', 'Unit | Model | bee', {
  // Specify the other units that are required for this test.
  needs: ['model:hive']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
