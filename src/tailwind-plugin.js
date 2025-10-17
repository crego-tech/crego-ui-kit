const plugin = require('tailwindcss/plugin')

/**
 * Crego UI Kit Tailwind Plugin
 *
 * This plugin ensures that all Tailwind classes used in @crego/ui-kit components
 * are available in consuming applications.
 *
 * Usage in tailwind.config.js:
 * ```js
 * module.exports = {
 *   plugins: [
 *     require('@crego/ui-kit/tailwind-plugin')
 *   ]
 * }
 * ```
 */
module.exports = plugin(
  function ({ addComponents, addUtilities }) {
    // Add any custom components if needed
    addComponents({
      // Custom components can be added here if needed
    })

    // Add any custom utilities if needed
    addUtilities({
      // Custom utilities can be added here if needed
    })
  },
  {
    // Theme extensions for the UI kit
    theme: {
      extend: {
        // Add any custom theme extensions here
        // This ensures the theme tokens are available
      }
    }
  }
)
