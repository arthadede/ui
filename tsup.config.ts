import { defineConfig } from 'tsup';
import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const copyFonts = () => {
  const srcDir = 'src/assets/fonts';
  const destDir = 'dist/assets/fonts';

  if (!existsSync(srcDir)) return;

  mkdirSync(destDir, { recursive: true });

  const fontFiles = [
    'inter-v13-latin-100.woff2',
    'inter-v13-latin-200.woff2',
    'inter-v13-latin-300.woff2',
    'inter-v13-latin-400.woff2',
    'inter-v13-latin-500.woff2',
    'inter-v13-latin-600.woff2',
    'inter-v13-latin-700.woff2',
    'inter-v13-latin-800.woff2',
    'inter-v13-latin-900.woff2',
  ];

  fontFiles.forEach(file => {
    const srcPath = join(srcDir, file);
    const destPath = join(destDir, file);
    if (existsSync(srcPath)) {
      copyFileSync(srcPath, destPath);
    }
  });
};

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  injectStyle: true,
  minify: false,
  splitting: false,
  onSuccess: copyFonts,
});
