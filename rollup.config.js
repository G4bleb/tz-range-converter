import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

export default [
  {
    input: "src/lib.ts",
    output: [
      {
        file: "dist/lib.js",
        format: "cjs",
        sourcemap: true,
      },
      // {
      //   file: "dist/esm/lib.js",
      //   format: "esm",
      //   sourcemap: true,
      // },
    ],
    external: [],
    plugins: [nodeResolve(), commonjs(), typescript()],
  },
  {
    input: "src/converter.ts",
    output: [
      {
        file: "dist/converter.js",
        format: "cjs",
        sourcemap: true,
      },
      // {
      //   file: "dist/esm/converter.js",
      //   format: "esm",
      //   sourcemap: true,
      // },
    ],
    plugins: [nodeResolve(), commonjs(), typescript()],
  },
];
