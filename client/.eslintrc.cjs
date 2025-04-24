// eslint-disable-next-line @typescript-eslint/no-var-requires
/** @type {path.PlatformPath | path} */
const path = require("path");

/** @type {import("eslint").Linter.Config} */
const config = {
  overrides: [
    {
      extends: ["plugin:@typescript-eslint/recommended-requiring-type-checking"],
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: path.join(__dirname, "tsconfig.json"),
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: path.join(__dirname, "tsconfig.json"),
  },
  plugins: [
    "jsx-a11y",
    "eslint-plugin-tailwindcss",
    "@typescript-eslint",
    "react-hooks",
    "react",
    "import",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: ["plugin:@typescript-eslint/recommended"],
  rules: {
    // TypeScript - Imports & Exports
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "no-duplicate-imports": "error",
    "@typescript-eslint/consistent-type-exports": [
      "error",
      {
        fixMixedExportsWithInlineTypeSpecifier: true,
      },
    ],
    // TypeScript - Variables & Usage
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        vars: "all",
        args: "all",
        varsIgnorePattern: "^_",
      },
    ],
    "no-unused-vars": "off",
    "prefer-const": "error",
    "no-var": "error",
    // TypeScript - Code Quality
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unsafe-assignment": "error",
    "@typescript-eslint/no-unsafe-member-access": "error",
    "@typescript-eslint/no-unsafe-call": "error",
    "@typescript-eslint/no-unsafe-return": "error",
    "@typescript-eslint/no-unsafe-argument": "error",
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "@typescript-eslint/no-empty-interface": "error",
    "@typescript-eslint/no-duplicate-enum-values": "error",
    // TypeScript - Promises & Async
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
    "@typescript-eslint/return-await": "error",
    // TypeScript - Types & Interfaces
    "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
    "@typescript-eslint/explicit-function-return-type": [
      "warn",
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      },
    ],
    "@typescript-eslint/array-type": [
      "error",
      {
        default: "array-simple",
      },
    ],
    "@typescript-eslint/explicit-member-accessibility": [
      "error",
      {
        accessibility: "explicit",
        overrides: {
          accessors: "off",
          constructors: "no-public",
          methods: "explicit",
          properties: "explicit",
          parameterProperties: "explicit",
        },
      },
    ],
    "@typescript-eslint/consistent-generic-constructors": "error",
    // TypeScript - Best Practices
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/no-unnecessary-condition": "error",
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/no-confusing-non-null-assertion": "error",
    "@typescript-eslint/no-confusing-void-expression": "error",
    "@typescript-eslint/no-meaningless-void-operator": "error",
    "@typescript-eslint/strict-boolean-expressions": [
      "error",
      {
        allowString: false,
        allowNumber: false,
        allowNullableObject: false,
        allowNullableBoolean: false,
        allowNullableString: false,
        allowNullableNumber: false,
        allowNullableEnum: false,
        allowAny: false,
        allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false,
      },
    ],
    // JavaScript Rules
    // JavaScript - Best Practices
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["../"],
            message: "Relative imports are not allowed.",
          },
        ],
      },
    ],
    "no-dupe-else-if": "error",
    "no-dupe-keys": "error",
    "no-else-return": "error",
    "no-console": "error",
    "no-unreachable": "error",
    "no-use-before-define": "error",
    "dot-notation": "error",
    eqeqeq: "error",
    "no-lonely-if": "error",
    "no-return-await": "error",
    "no-useless-catch": "error",
    "consistent-return": "error",
    "no-unneeded-ternary": "error",
    "no-plusplus": [
      "error",
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    "no-implicit-coercion": "error",
    "no-restricted-syntax": [
      "error",
      {
        selector: "ExportDefaultDeclaration",
        message: "Prefer named exports",
      },
    ],
    "no-shadow": "error",
    "no-self-compare": "error",
    // React Rules
    // React - Best Practices
    "react/function-component-definition": [
      "error",
      {
        namedComponents: ["arrow-function"],
        unnamedComponents: "arrow-function",
      },
    ],
    "react/prop-types": "off",
    "react/jsx-key": "error",
    "react/jsx-no-target-blank": "error",
    "react/jsx-no-useless-fragment": "warn",
    "react/no-array-index-key": "warn",
    "react/no-deprecated": "warn",
    "react/no-unused-state": "error",
    "react/button-has-type": "error",
    "react/display-name": "error",
    "react/hook-use-state": "error",
    "react/jsx-fragments": ["error", "element"],
    "react/no-children-prop": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-curly-brace-presence": "error",
    "react/jsx-boolean-value": "error",
    "react/no-direct-mutation-state": "error",
    "react/self-closing-comp": "error",
    "react/no-unknown-property": "error",
    // Accessibility Rules
    "jsx-a11y/label-has-associated-control": [
      "error",
      {
        labelComponents: ["Label"],
        labelAttributes: ["label"],
        controlComponents: ["Input", "Select"],
        depth: 2,
        required: {
          some: ["nesting", "id"],
        },
      },
    ],
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["hrefLeft", "hrefRight"],
        aspects: ["invalidHref", "preferButton"],
      },
    ],
    // Tailwind
    "tailwindcss/enforces-negative-arbitrary-values": "error",
    "tailwindcss/no-contradicting-classname": "error",
    "tailwindcss/no-unnecessary-arbitrary-value": "error",
    "tailwindcss/enforces-shorthand": "error",
    // Deprecated or Off Rules
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    // Import Rules
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", ["parent", "sibling"], "index", "type"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
};

module.exports = config;
