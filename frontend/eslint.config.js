import mantine from 'eslint-config-mantine';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  ...mantine,

  // Global rules
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      'max-lines': ['error', 200], // This applies to all files
      'import/extensions': ['warn', 'always', {
        ignorePackages: true,
      }], // Warn about missing .tsx/.ts extensions to prevent build issues on Render
    },
  },

  // Override for story files
  {
    files: ['**/*.story.tsx'],
    rules: {
      'no-console': 'off',
    },
  },

  // General ignore rules
  {
    ignores: ['**/*.{mjs,cjs,js,d.ts,d.mts}', './.storybook/main.ts'],
  }
);
