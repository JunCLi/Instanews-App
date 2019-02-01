# Instanews-App

## Table of Contents
1. Purpose
2. Functionality
3. Technologies used
4. File structure
5. SCSS Organization

## Purpose
The purpose of this project is to create an 'Instanews App'. When users pick a category from the dropdown, it will pull the top stories of that category from New York Times using their api and display them.

## Functionality
1. When a category from the dropdown menu is chosen, twelve of the top stories will be shown in a grid. Grid type will vary depending on screen width

2. Header will shrink to allow more space for articles when category is chosen

3. Hovering over articles will show the article abstract in a sliding animation

4. Clicking the articles will lead the user to the article found on the New York Times website

## Technologies Used
1. New York Times API: [NYT](https://developer.nytimes.com/)
2. JQuery library: [JQuery](https://jquery.com/)
3. Transfonter to convert font formats to ensure cross-browser support: [Transfonter](https://transfonter.org/)
4. NPM package manager: [NPM](https://www.npmjs.com/)
5. Gulp and it's dependencies: [Gulp](https://www.npmjs.com/package/gulp)
6. James Nowland's Select Style Codepen: [James Nowland](https://codepen.io/jnowland/pen/GZLQBw)


## File Structure
1. NPM packages, gulp file and tasks, and eslint rules are located in the root directory
2. 'app' is the working directory containing uncompressed code and assets
3. 'dist' is the distribution directory containing compressed and ready-for-deployment code and assets for maximum performance

## SCSS Organization
Styles are coded with the sass css preprocessor, converted into css in the app directory for workflow, and finally minified and moved into dist for distribution.

Generally, SCSS is organized in a modular top-to-bottom format. Global and site-wide styles are at the top and then each part of the website will follow from top to bottom.

Within each section of the website, a similar top-to-bottom approach is followed. Elements on roughly the same position will have more specific elements towards the bottom.

Within each SCSS selector, the individual properties are organized as follows:

1. Display elements such as inline, block, flex, and their affected derivatives.
2. Positional elements such as absolute, top, left.
3. Dimensional elements such as width, margin, padding, height.
4. Visual elements such as color, background, and font.