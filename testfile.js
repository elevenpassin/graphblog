const assert = require('mongodb').MongoClient;

try {
  assert.strictEqual("b", "a");
} catch(e) {
  console.log(e);
  console.clear();
}