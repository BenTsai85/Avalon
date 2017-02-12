module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb-base",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "env": {
        "browser": true,
        "node": true
    },
    rules: {
        "no-unused-vars": 0,
        "new-cap": 0,
        "computed-property-spacing": [ "error", "always" ],
        "space-in-parens": [ "error", "always" ],
        "strict": 0,
        "import/no-extraneous-dependencies": 0,
        "brace-style": [ "error", "stroustrup", { "allowSingleLine": true } ],
        "curly": [ "error", "multi-or-nest" ],
        "no-mixed-operators": 0,
        "class-methods-use-this": 0,
        "array-bracket-spacing": [ "error", "always" ],
    }
};