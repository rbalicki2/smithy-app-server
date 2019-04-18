# `smithy-app-server`

This repository makes it easy to build, launch and deploy Smithy apps.

Let's assume your Smithy project is in a folder called `~/my-smithy-project`, exposes a `pub fn start(root_element: web_sys::Element)` and has an appropriate `Makefile`. For a more complete discussion of the requirements, see [this section](smithy-app-requirements).

Throughout this, we will assume you are using `rustc 1.32.0-nightly`, although hopefully it will work with other versions. The `wasm32-unknown-unknown` target must also be installed.

## Initial setup

```sh
# from ~
git clone https://github.com/rbalicki2/smithy-app-server
cd smithy-app-server
```

## Building and running locally

In one terminal:

```sh
# from ~/smithy-app-server
TARGET=../my-smithy-project/ npm run serve
```

In another:

```sh
# from ~/smithy-app-server
TARGET=../my-smithy-project/ npm run watch
```

Don't forget to change `my-smithy-project` to the name of your project.

Now, navigate to `localhost:8080`.

## Building and deploying

Register an AWS S3 bucket, let's say `my-smithy-project`, and make sure `wasm-opt` is availabe in your `$PATH`.

In your terminal:

```sh
# from ~/smithy-app-server
TARGET=../my-smithy-project/ npm run build_prod
# N.B. if the above doesn't work, try passing WASM_OPT_LOCATION=../path-to-wasm-opt-binary, as in:
# WASM_OPT_LOCATION=../binaryen/bin/ TARGET=../my-smithy-project/ npm run build_prod
NODE_ENV=production TARGET=../my-smithy-project/ npm run webpack
S3_BUCKET=my-smithy-project npm run upload
```

Now, the latest build has been uploaded to your S3 bucket!

## Smithy app requirements

The easiest way to get a Smithy app up and running is to clone the starter project and modify that:

```sh
# from ~
git clone https://github.com/rbalicki2/smithy_starter
```

In order to build for production, `wasm-opt` (from the [`binaryen`](https://github.com/WebAssembly/binaryen) project) must be accessible in your `$PATH` variable. If it is located in a different location, pass the `WASM_OPT_LOCATION` environment variable. This is not required if you are just running your app locally.

### Requirements, in detail

(At least) the following is required:

* The Cargo.toml has

```toml
[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = { version = "< 0.2.39", features = ["nightly", "serde-serialize"] }
smithy = { path = "../smithy/crates/smithy", features = [
  # "mouse-events",
  # "input-events",
  # "debug-logs",
] }
web-sys = { version = "0.3.5", features = [
  "Element",
] }
js-sys = "0.3.5"

[replace]
"proc-macro2:0.4.27" = { git = "https://github.com/rbalicki2/smithy" }
```

That last `[replace]` section is important and required!

* The Makefile exposes `watch`, `build` and `build_prod` recipes.
* The `src/lib.rs` file exposes a method named `start` as follows:

```rs
#[wasm_bindgen]
pub fn start(root_element: web_sys::Element) {
  // do whatever you want
}
```
