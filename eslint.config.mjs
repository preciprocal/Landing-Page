// eslint-config-next 15 ships legacy (eslintrc) configs, so they are loaded
// through FlatCompat. The flat entry points (eslint-config-next/typescript as
// a flat array) arrive with eslint-config-next 16.
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
];

export default eslintConfig;
