# Project Title

## Contributing

### Code Style and Formatting

To ensure consistency in our code, we follow these style guides:

- **JavaScript and React:** [Airbnb JavaScript/React Style Guide](https://airbnb.io/javascript/react/)
- **General JavaScript:** [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)

All code contributions must pass the style checks enforced by our tools (ESLint and Prettier).

### Contributors

1. John Raj
2. Brennan Andruss
3. Karthik Balaji
4. Alec Odell

### Setting up Code Style Tools

Follow these steps to set up Prettier and ESLint in your local development environment:

#### 1. Install ESLint and Prettier:

```bash
npm install eslint prettier eslint-config-prettier eslint-plugin-prettier --save-dev
```

#### 2. Configure ESLint (.eslintrc.json):

```json
{
  "env": {
    "browser": true,
    "es2021": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended"
  ],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": ["error"]
  }
}
```

#### 3. Set Up Auto-Formatting on Save (VSCode):

1.  Install the Prettier and ESLint extensions from the VSCode Marketplace.
2.  Add the following settings to your VSCode configuration (.vscode/settings.json):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.validate": ["javascript", "javascriptreact"]
}
```
