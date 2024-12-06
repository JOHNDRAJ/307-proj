# PolyMessages

## Visit Our Deployed App!

https://blue-mushroom-09a68691e.5.azurestaticapps.net/


## Project Description

PolyMessages is a messaging platform for students that allows students to seamlessly communicate with fellow students in their school and in their classes. Unlike traditional messaging apps, our product provides the unique ability to message any student who has logged in before by name or by student info, offering a platform for students to discover and connect with their classmates. In addition to this, we provide many features, such as real-time messaging, editing and deleting messages from both sides, sending images, and much more. 


## Code Formatting/Style

To ensure consistency in our code, we follow these style guides:


- **JavaScript and React:** [Airbnb JavaScript/React Style Guide](https://airbnb.io/javascript/react/)
- **General JavaScript:** [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)

All code contributions must pass the style checks enforced by our tools (ESLint and Prettier)


## Development Environment Setup
1. Clone the repo
2. Create the .env file in express-backend
      1. Generate a JWT secret
      2. Obtain a connection string from MongoDB
3. Npm install
      3. Npm install in root
      4. Npm install in react-frontend
      5. Npm install in express-backend
4. Install ESLint and Prettier
      ```bash
      npm install eslint prettier eslint-config-prettier eslint-plugin-prettier --save-dev
      ```
      1. Install the Prettier and ESLint extensions from the VSCode Marketplace.
      2. Add the following settings to your VSCode configuration (.vscode/settings.json):

      ```json
      {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "eslint.validate": ["javascript", "javascriptreact"]
      }
      ```

4. Setup all configuration files as shown in the repository
5. Set up Auto-Formatting on Save (VSCode)


## UI Prototype (Last Updated Nov 1, 2024)

[Link To Figma Prototype](https://www.figma.com/proto/QVKcxyczvw30MdzpRSvwKr/PolyMessages?node-id=0-1&t=crvIM2CXmmpXuKlv-1)  


## UML Diagram (Last Updated Dec 4, 2024)

[Link To UML](./docs/UML.md)


## Contributors

1. John Raj
2. Brennan Andruss
3. Karthik Balaji
4. Alec Odell