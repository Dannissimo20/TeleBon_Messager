module.exports = {
  parser: '@typescript-eslint/parser',
  root: true,
  env: {
    node: true
  },
  // Tells ESLint to use this parser installed at previous step
  plugins: ['unused-imports', 'import', 'prettier'],
  // parserOptions: {
  //   ecmaVersion: 2021,
  //   // The version of ECMAScript you are using
  //   sourceType: 'module',
  //   // Enables ECMAScript modules
  //   ecmaFeatures: {
  //     jsx: true
  //   }
  // },
  settings: {
    react: {
      version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
    }
  },
  extends: [
    'plugin:react/recommended',
    'eslint:recommended',
    'prettier',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    /* CUSTOM */
    // This is where you can disable/customize some of the rules specified by the plugins
    // suppress errors for missing 'import React' in files
    'react/prop-types': ['warn', { ignore: ['children'] }],
    'react/react-in-jsx-scope': 'off',
    //should add ".ts" if typescript project
    'react/no-unescaped-entities': [
      'warn',
      {
        forbid: ['>', '}']
      }
    ],
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto'
      }
    ],
    eqeqeq: ['warn', 'always'],
    'newline-before-return': ['warn'],
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_'
      }
    ],
    'unused-imports/no-unused-imports-ts': 2,
    '@typescript-eslint/ban-ts-comment': 0,

    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false
        }
      }
    ],
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'off',

    /*
      Enforce a convention in module import order
      https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md
    */
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'sibling'],
        pathGroups: [
          {
            pattern: 'react-**',
            group: 'builtin'
          },
          {
            pattern: 'react',
            group: 'builtin'
          },
          {
            pattern: '@telebon/**',
            group: 'internal'
          },
          {
            pattern: 'packages/**',
            group: 'internal'
          }
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ]
  }
};
