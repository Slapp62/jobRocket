const js = require("@eslint/js");
const importPlugin = require("eslint-plugin-import");
const nodePlugin = require("eslint-plugin-node");
const unusedImports = require("eslint-plugin-unused-imports");
const globals = require("globals");

module.exports = [
  // Base ESLint recommended rules
  js.configs.recommended,

  // Main configuration
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      import: importPlugin,
      node: nodePlugin,
      "unused-imports": unusedImports,
    },
    rules: {
      // Custom rules
      "max-lines": [
        "error",
        { max: 200, skipBlankLines: true, skipComments: true },
      ],

      // Import/Export rules
      "import/no-unresolved": "error",
      "import/named": "error",
      "import/default": "error",
      "import/namespace": "error",
      "import/no-absolute-path": "error",
      "import/no-dynamic-require": "error",
      "import/no-self-import": "error",
      "import/no-cycle": "error",
      "import/no-useless-path-segments": "error",
      "import/consistent-type-specifier-style": ["error", "prefer-inline"],

      // Unused imports
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // Node.js specific rules
      "node/no-missing-import": "off", // Handled by import plugin
      "node/no-missing-require": "off", // Handled by import plugin
      "node/no-unpublished-require": "off",
      "node/no-unsupported-features/es-syntax": "off",

      // General code quality
      "no-debugger": "error",
      "no-unused-vars": "off", // Using unused-imports instead
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-template": "error",
      "template-curly-spacing": "error",
      "arrow-spacing": "error",
      "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 1 }],
      "eol-last": "error",
      "comma-dangle": ["error", "always-multiline"],
      semi: ["error", "always"],
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js"],
        },
      },
    },
  },

  // Test files specific rules
  {
    files: ["**/*.test.js", "tests/**/*.js"],
    rules: {
      "no-console": "off",
      "max-lines": "off", // Test files can be longer
    },
  },

  // Ignore patterns
  {
    ignores: ["node_modules/", "dist/", "build/", "coverage/"],
  },
];
