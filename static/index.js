const wasm = import('target');

wasm.then(module => {
  const rootEl = document.getElementById('app');
  module.start(rootEl);
});
