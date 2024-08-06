import { defineConfig } from 'vite';
import babel from '@rollup/plugin-babel';

export default defineConfig({
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
      input: ['index.html', 'page-example.html'],
    },
  },
});
