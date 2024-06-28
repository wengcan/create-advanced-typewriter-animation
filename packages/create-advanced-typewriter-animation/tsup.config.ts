import { defineConfig } from 'tsup';
import fs from 'node:fs';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

const year = new Date().getFullYear();
const banner = `// ${packageJson.name}  v${packageJson.version} Copyright (c) ${year} ${packageJson.author}`;

export default defineConfig((options) => [
  {
    entry: [packageJson.source],
    format: ['esm','cjs', 'iife'],
    dts: true,
    minify: true,
    legacyOutput: true,
    banner: {
      js: banner,
    },
    outDir: 'dist',
  }
]);
