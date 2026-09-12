const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const motion = {setAttribute() {}, addEventListener() {}};
const media = {matches: false, addEventListener() {}};
const states = [];
const document = {
  hidden: false,
  body: {classList: {toggle(name, enabled) { states.push({name, enabled}); }}},
  querySelector() { return motion; },
  querySelectorAll() { return []; },
  getElementById() { return null; },
  addEventListener() {},
};
const context = vm.createContext({document, window: {matchMedia: () => media, addEventListener() {}}, location: {hash: ''}, HTMLDetailsElement: class {}});
vm.runInContext(fs.readFileSync('templates/chatsheet/dist/app.js', 'utf8'), context);
assert.equal(states.at(-1).enabled, true);
document.hidden = true;
vm.runInContext('syncMotion()', context);
assert.equal(states.at(-1).enabled, false);
document.hidden = false;
media.matches = true;
vm.runInContext('syncMotion()', context);
assert.equal(states.at(-1).enabled, false);
assert.equal(motion.hidden, true);
media.matches = false;
vm.runInContext('paused = true; syncMotion()', context);
assert.equal(states.at(-1).enabled, false);
assert.equal(motion.textContent, 'Resume motion');
vm.runInContext('paused = false; syncMotion()', context);
assert.equal(states.at(-1).enabled, true);
console.log(JSON.stringify({boundary: 'Actual app.js in VM with mocked DOM/media/visibility; not a real OS preference or background-tab event', states, result: 'pass'}, null, 2));
