<!-- PROJECT LOGO -->
<p align="center">
  <h1 align="center"><b>Frontend Template</b></h1>

  <p align="center">
    <a href="https://github.com/iamfelipe/static-boilerplate"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/iamfelipe/static-boilerplate/issues">Report Bug</a>
    ·
    <a href="https://github.com/iamfelipe/static-boilerplate/issues">Request Feature</a>
  </p>
</p>

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About the Project](#about-the-project)
- [Getting Started](#getting-started)
- [Production deployment](#production-deployment)

<!-- ABOUT THE PROJECT -->

## About The Project

Site template built with Top-Notch technologies and methodologies.

### Built With

- [Webpack](https://babeljs.io)
- [Babel](https://tailwindcss.com)
- [Prettier](https://prettier.io)
- [PostCSS](https://postcss.org)
- [ESLint](https://eslint.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Modular Scale](https://github.com/modularscale/modularscale-sass)

<!-- GETTING STARTED -->

## Getting Started

> 🏗 Most of the setup below is enabled by default.

To get a local copy up and running follow these simple steps.

1. First, install and generate a custom template by the custom CLI:

   ```sh
   $ npx @felipecastillo/create-template --install
   # or
   $ npm init @felipecastillo/template --install
   ```

2. Install packages if not installed by CLI:

   ```sh
   $ npm install
   # or
   $ yarn
   ```

3. Setup custom file routes in `webpack.settings.js`:

   ```javascript
   // webpack.settings.js
   module.exports = {
     paths: {
       /* Source root files */
       src: {
         js: "./src/js/",
       },
       /* Distribution folder */
       dist: {
         base: "./dist/",
         clean: ["**/*"],
       },
       /* Styles root files */
       templates: "./templates/",
     },
     // ...
     entries: {
       /* Main script file */
       main: ["index.js"],
     },
     // ...
   };
   ```

4. Import custom theme styles in `src/js/index.js` file:

   ```javascript
   // index.js
   import "../css/main.scss";
   ```

   > ⚠️ In development mode the styles are not exported in the `dist` folder because are injected into the scripts.️

   > To disable **Tailwind CSS** remove the require statement on `postcss.config.js` and its SCSS partial on `css/vendor`.

5. Include file routes inside `dist` into the project.

   > 📦 Scripts, styles, assets, etc.

6. Then in the same directory, run the development server:
   ```sh
   $ npm run dev:start
   # or
   $ yarn run dev:start
   ```

<!-- PRODUCTION DEPLOYMENT -->

## Production deployment

1. Include files to purge:

   > ☠️ Only if **Tailwind CSS** is up and running in the project.

   ```javascript
   // webpack.settings.js
   module.exports = {
     // ...
     purgeCssConfig: {
       paths: ["./templates/**/*.{twig,html}", "./src/js/**/*.js"],
     },
   };
   ```

2. Run production build:

   ```sh
   $ npm run prod:build
   # or
   $ yarn run prod:build
   ```

3. Deploy if needed 🚀🚀🚀

## License

Distributed under the MIT License. See [LICENSE](https://github.com/iamfelipe/static-boilerplate/blob/master/LICENSE) for more information.

## Collaborators

- Felipe Castillo <castillo.devsigner@icloud.com>
