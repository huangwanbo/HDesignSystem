import Ts from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import fs from "fs";
const base_path = "src/component";
const component_path = [];
const path = fs.readdirSync(base_path);
path.map((file) => {
  if (file === "_base") return;
  component_path.push(base_path + "/" + file + "/index.ts");
});
export default {
  input: ["src/index.ts", ...component_path],
  output: [
    {
      dir: "lib/esm",
      format: "esm",
      sourcemap: true,
      preserveModules: true,
    },
    {
      dir: "lib/esm.min",
      format: "es",
      plugins: [terser()],
      preserveModules: true,
    },
    {
      dir: "lib/cjs",
      format: "cjs",
      sourcemap: true,
    },
    {
      dir: "lib/cjs.min",
      format: "cjs",
      plugins: [terser()],
      sourcemap: true,
    },
    {
      input: ["src/index.ts"],
      dir: "lib/amd",
      format: "amd",
      sourcemap: true,
    },
  ],
  plugins: [Ts()],
  external: ["react", "react-dom"],
};
