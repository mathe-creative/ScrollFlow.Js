import { defineConfig } from 'vite';
import babel from '@rollup/plugin-babel';
import { resolve } from 'path';

export default defineConfig(({ command }) => {
  if (command === 'build') {
    return {
      plugins: [
        babel({
          babelHelpers: 'bundled',
          extensions: ['.js', '.ts', '.jsx', '.tsx'],
          include: ['src/**/*'],
        }),
      ],
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'ScrollFlow',
          fileName: (format) => `scrollflow.${format}.js`,
          formats: ['es', 'umd'],
        },
        rollupOptions: {
          output: {
            globals: {},
            name: 'ScrollFlow'
          },
        },
      },
    };
  } else {
    return {
      base: '/dist/',
      plugins: [
        babel({
          babelHelpers: 'bundled',
          extensions: ['.js', '.ts', '.jsx', '.tsx'],
          include: ['src/**/*'],
        }),
      ],
      build: {
        outDir: 'dist',
        rollupOptions: {
          input: [
            resolve(__dirname, 'examples/main/index.html'),
            resolve(__dirname, 'examples/main/page-example.html')
          ],
        },
      },
    };
  }
});
