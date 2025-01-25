import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import pluginReact from 'eslint-plugin-react';
import prettier from 'eslint-config-prettier';
import pluginImport from 'eslint-plugin-import';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx,d.ts}'], // Match all relevant file types inclduing def
    plugins: {
      import: pluginImport, // Register import plugin
      'jsx-a11y': pluginJsxA11y, // Register jsx-a11y plugin
      react: pluginReact, // Register react plugin
      '@typescript-eslint': tseslint, // Register TypeScript plugin
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest', // Use the latest ECMAScript standard
        sourceType: 'module',
        ecmaFeatures: { jsx: true }, // Enable JSX parsing
        project: './tsconfig.json', // Ensure TypeScript type-aware linting
      },
      globals: globals.browser,
    },
    settings: {
      react: { version: 'detect' }, // Automatically detect React version
      'import/resolver': { typescript: { project: ['./tsconfig.json'] } }, // Enable TypeScript-aware import resolution
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...pluginReact.configs.flat.recommended.rules,
      ...pluginJsxA11y.configs.recommended.rules,
      ...pluginImport.configs.recommended.rules,
      ...pluginJs.configs.recommended.rules,
      ...prettier.rules, // Prettier integration to turn off ESLint rules conflicting with Prettier

      // General JavaScript rules
      'no-console': 'warn',
      'no-unused-vars': 'off', // Handled by TypeScript
      'import/namespace': 'off', // turn of imports non sense
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'never',
        },
      ],

      // React-specific rules
      'react/react-in-jsx-scope': 'off', // Not required in modern React
      'react/prop-types': 'off', // Handled by TypeScript
      // Accessibility rules
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['to'],
        },
      ],

      // TypeScript-specific rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-interface': 'off', // Allow empty interfaces for extending styled-components
      // Add recommended configs from plugins
    },
  },
];
