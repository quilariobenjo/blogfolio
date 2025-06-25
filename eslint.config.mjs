import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...compat.config({
    rules: {
      "@next/next/no-duplicate-head": "off",
    },
    ignorePatterns: [
      "node_modules/",
      "dist/",
      "build/",
      ".next/",
      "out/",
      "coverage/",
      "public/",
      "scripts/",
      "tests/",
      "*.config.js",
      "*.config.mjs",
      "*.config.ts",
      "*.config.cjs=",
    ],
  }),
]

export default eslintConfig
