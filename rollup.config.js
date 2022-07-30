import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default [
  {
    input: "build/lib.js",
    output: {
      file: "build/lib.js",
      format: "cjs",
    },
    external: [],
    plugins: [nodeResolve(), commonjs()],
  },
  {
    input: "build/converter.js",
    output: {
      file: "build/converter.js",
      format: "cjs",
    },
    plugins: [nodeResolve(), commonjs()],
  },
];
