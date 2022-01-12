module.exports = {
    extends: ['airbnb-base', 'plugin:react/recommended'],
    plugins: ['react', 'jest'],
    settings: {
        react: {
            version: '17'
        }
    },
    rules: {
        'import/no-extraneous-dependencies': [
            'error',
            { devDependencies: true }
        ],
        'import/prefer-default-export': [0, 'none'],
        'max-len': [1, 200],
        'no-console': 1,
        'new-cap': 0,
        'comma-dangle': ['error', 'never'],
        'object-curly-spacing': ['error', 'always'],
        indent: ['warn', 4],
        'arrow-parens': ['error', 'as-needed'],
        'class-methods-use-this': 0,
        quotes: ['error', 'single']
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        }
    },
    globals: {
        window: true,
        document: true,
        jQuery: false,
        $: false,
        moment: false,
        location: true,
        _: false,
        MODULE_MAP: true,
        System: false,
        T: true,
        localStorage: true,
        shallow: true,
        renderer: true,
        fetch: true
    },
    env: {
        'jest/globals': true
    }
};
