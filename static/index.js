const wasm = import("target");

wasm.then(module => {
  module.start("app");
});
