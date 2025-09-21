import { FlatCompat } from '@eslint/eslintrc'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: false,
  allConfig: false,
})

const config = [
  {
    ignores: ['.next/**/*', 'coverage/**/*'],
  },
  ...compat.config({
    extends: ['next/core-web-vitals', 'prettier'],
  }),
]

export default config
