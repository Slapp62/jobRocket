import mantine from 'eslint-config-mantine';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...mantine,

  // Global rules
  {
    rules: {
      'max-lines': ['error', 200], // This applies to all files
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
