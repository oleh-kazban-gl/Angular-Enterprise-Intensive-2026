import globals from 'globals';
import eslintTs from 'typescript-eslint';
import eslintNxPlugin from '@nx/eslint-plugin';
import eslintAngular from 'angular-eslint';
import eslintImportPlugin from 'eslint-plugin-import';
import eslintPrettierPlugin from 'eslint-plugin-prettier';
import eslintUnusedImportsPlugin from 'eslint-plugin-unused-imports';

const selectorPrefix = 'gl';
const commonGlobals = {
  ...globals.browser,
  ...globals.node,
};
const directiveSelectorRule = [
  'error',
  {
    type: 'attribute',
    prefix: selectorPrefix,
    style: 'camelCase',
  },
];
const componentSelectorRule = [
  'error',
  {
    type: 'element',
    prefix: selectorPrefix,
    style: 'kebab-case',
  },
];
const importOrderRule = [
  'error',
  {
    // Intentionally grouped for project readability:
    // 1. Angular imports
    // 2. third-party imports
    // 3. internal alias imports
    // 4. relative imports
    groups: [['builtin'], ['external', 'unknown'], ['parent', 'sibling', 'index']],
    pathGroups: [
      {
        pattern: '@angular/**',
        group: 'builtin',
      },
      {
        pattern: 'rxjs',
        group: 'external',
        position: 'before',
      },
      {
        pattern: 'rxjs/**',
        group: 'external',
        position: 'before',
      },
      {
        pattern: '@gl/**',
        group: 'parent',
        position: 'before',
      },
    ],
    pathGroupsExcludedImportTypes: ['builtin'],
    'newlines-between': 'always',
    distinctGroup: false,
    alphabetize: {
      order: 'asc',
      caseInsensitive: true,
    },
  },
];

export default [
  ...eslintNxPlugin.configs['flat/base'],
  ...eslintNxPlugin.configs['flat/typescript'],
  ...eslintNxPlugin.configs['flat/javascript'],
  {
    ignores: ['node_modules/**', '.angular/**', '.github/**', '**/dist', '**/out-tsc', '**/coverage', '**/*.spec.ts'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,tsx,jsx}'],
    plugins: {
      prettier: eslintPrettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-trailing-spaces': 'error',
      'no-tabs': 'error',
      'no-mixed-spaces-and-tabs': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
      'eol-last': 'error',
      'no-extra-semi': 'error',
    },
    languageOptions: {
      globals: globals.browser,
    },
  },

  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['**/*.spec.ts'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          depConstraints: [
            { sourceTag: '*', onlyDependOnLibsWithTags: ['*'] },
            { sourceTag: 'type:ui', onlyDependOnLibsWithTags: ['type:util', 'type:ui'] },
            {
              sourceTag: 'type:feature',
              onlyDependOnLibsWithTags: [
                'type:data-access',
                'type:ui',
                'type:util',
                'type:root',
                'type:shared',
                'type:feature',
              ],
            },
            {
              sourceTag: 'type:data-access',
              onlyDependOnLibsWithTags: ['type:data-access', 'type:util', 'type:shared', 'type:root'],
            },
            {
              sourceTag: 'type:util',
              onlyDependOnLibsWithTags: ['type:util', 'type:root', 'type:data-access', 'type:ui'],
            },
            {
              sourceTag: 'type:app',
              onlyDependOnLibsWithTags: [
                'type:root',
                'type:data-access',
                'type:feature',
                'type:ui',
                'type:util',
                'type:shared',
              ],
            },
            {
              sourceTag: 'type:root',
              onlyDependOnLibsWithTags: ['type:root', 'type:util', 'type:data-access', 'type:shared'],
            },
            {
              sourceTag: 'type:shared',
              onlyDependOnLibsWithTags: ['type:data-access', 'type:ui', 'type:util', 'type:shared', 'type:root'],
            },
            {
              sourceTag: 'type:e2e',
              onlyDependOnLibsWithTags: ['type:data-access'],
            },
          ],
        },
      ],
    },
  },

  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['**/*.spec.ts'],
    processor: eslintAngular.processInlineTemplates,
    languageOptions: {
      parser: eslintTs.parser,
      globals: commonGlobals,
    },
    plugins: {
      import: eslintImportPlugin,
      'unused-imports': eslintUnusedImportsPlugin,
    },
    rules: {
      'guard-for-in': 'error',
      'no-mixed-operators': 'off',
      'no-useless-escape': 'error',
      'no-control-regex': 'off',
      'no-prototype-builtins': 'off',
      'prefer-rest-params': 'off',
      'no-debugger': 'error',
      'no-console': 'off',
      'no-dupe-args': 'off',
      'no-dupe-class-members': 'off',
      'no-dupe-else-if': 'off',
      'no-dupe-keys': 'off',
      'no-duplicate-case': 'off',
      'no-empty-pattern': 'off',
      'no-else-return': 'error',
      'no-ex-assign': 'off',
      'no-fallthrough': 'off',
      'no-obj-calls': 'off',
      'no-setter-return': 'error',
      'getter-return': 'error',
      'no-sparse-arrays': 'off',
      'no-template-curly-in-string': 'off',
      'no-this-before-super': 'off',
      'no-unreachable': 'off',
      'no-unreachable-loop': 'off',
      'no-empty': 'error',
      'no-empty-function': 'off',
      'no-var': 'off',
      'no-lonely-if': 'error',
      'no-unneeded-ternary': 'error',
      'no-constructor-return': 'error',
      'no-extra-boolean-cast': 'error',
      'no-lone-blocks': 'error',
      'unused-imports/no-unused-imports': 'error',
      'prefer-template': 'error',
      'prefer-object-spread': 'error',
      'prefer-regex-literals': 'off',
      'array-bracket-spacing': 'off',
      'arrow-spacing': 'off',
      'no-nested-ternary': 'error',
      'default-param-last': 'error',
      'comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'never',
        },
      ],
      curly: 'error',
      'no-multi-spaces': 'error',
      'max-params': 'off',
      'no-magic-numbers': 'off',
      'no-unused-vars': 'off',
      'object-curly-spacing': ['error', 'always'],
      eqeqeq: ['error', 'always'],
      'one-var': ['error', 'never'],
      'default-case': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: "Decorator[expression.callee.name='Component'] Property[key.name='standalone'][value.value=true]",
          message:
            'In Angular 19+ has standalone components by default. The "standalone: true" property is no longer necessary and should be removed.',
        },
      ],

      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': 'allow-with-description',
          'ts-nocheck': 'allow-with-description',
          'ts-check': 'allow-with-description',
        },
      ],
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-wrapper-object-types': 'error',
      '@typescript-eslint/adjacent-overload-signatures': 'off',
      '@typescript-eslint/no-this-alias': 'off',
      '@typescript-eslint/array-type': ['error', { default: 'array' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-duplicate-enum-values': 'error',
      '@typescript-eslint/no-duplicate-type-constituents': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/no-unsafe-enum-comparison': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'error',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unnecessary-type-assertion': 'off',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',
      '@typescript-eslint/no-empty-object-type': 'error',
      '@typescript-eslint/prefer-string-starts-ends-with': 'off',
      '@typescript-eslint/prefer-literal-enum-member': 'error',
      '@typescript-eslint/prefer-for-of': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/prefer-enum-initializers': 'off',
      '@typescript-eslint/no-useless-constructor': 'error',
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/no-shadow': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'none',
        },
      ],
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/member-ordering': 'off',
      '@typescript-eslint/class-literal-property-style': 'warn',
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/consistent-generic-constructors': 'off',
      '@typescript-eslint/consistent-indexed-object-style': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',

      '@angular-eslint/directive-class-suffix': 'off',
      '@angular-eslint/component-class-suffix': 'error',
      '@angular-eslint/no-empty-lifecycle-method': 'error',
      '@angular-eslint/no-input-rename': 'off',
      '@angular-eslint/directive-selector': directiveSelectorRule,
      '@angular-eslint/component-selector': componentSelectorRule,
      '@angular-eslint/prefer-standalone': 'error',
      '@angular-eslint/template/click-events-have-key-events': 'off',
      '@angular-eslint/template/interactive-supports-focus': 'off',
      '@angular-eslint/template/role-has-required-aria': 'off',
      '@angular-eslint/template/label-has-associated-control': 'off',

      'import/no-cycle': 'error',
      'import/no-absolute-path': 'error',
      'import/no-self-import': 'error',
      'import/no-useless-path-segments': 'error',
      'import/newline-after-import': 'off',
      'import/imports-first': 'off',
      'import/no-duplicates': 'error',
      'import/order': importOrderRule,
    },
    settings: {
      'import/external-module-folders': ['node_modules'],
      'import/resolver': {
        typescript: {
          project: './tsconfig.base.json',
        },
        node: true,
      },
    },
  },
];
