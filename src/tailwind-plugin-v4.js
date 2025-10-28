const plugin = require('tailwindcss/plugin')

/**
 * Crego UI Kit Tailwind Plugin (v4)
 *
 * This plugin ensures that all Tailwind classes used in @crego/ui-kit components
 * are available in consuming applications using Tailwind CSS v4.
 *
 * Usage in CSS (v4 - Recommended):
 * ```css
 * @import "tailwindcss";
 * @plugin "@crego/ui-kit/tailwind-plugin-v4";
 * ```
 *
 * Or in tailwind.config.js (v4):
 * ```js
 * export default {
 *   plugins: [
 *     require('@crego/ui-kit/tailwind-plugin-v4')
 *   ]
 * }
 * ```
 */
const uiKitPluginV4 = plugin(
  function ({ addComponents, addUtilities, theme }) {
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

module.exports = uiKitPluginV4
