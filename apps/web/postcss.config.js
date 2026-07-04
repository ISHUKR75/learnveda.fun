/**
 * @file postcss.config.js
 * @description PostCSS configuration for LearnVeda
 * Processes Tailwind CSS and applies autoprefixer for cross-browser compatibility
 */

module.exports = {
  plugins: {
    tailwindcss: {},  // Process Tailwind CSS utility classes
    autoprefixer: {}, // Add vendor prefixes for cross-browser support
  },
};
