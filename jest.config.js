/** @type {import('@jest/types').Config.ProjectConfig} */
module.exports = {
  preset: "jest-expo",
  setupFiles: ["<rootDir>/test/setup.ts"],
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/node_modules/**",
    // Ignoring most of Ignite's boilerplate
    "!./App.tsx",
    "!./app.config.ts",
    "!./app/models/**",
    "!./app/navigators/**",
    "!./app/app.tsx",
    "!./plugins/**",
    "!./app/i18n/**",
    "!./app/devtools/**",
    "!./app/config/**",
    "!./app/services/api/**",
    // Svg icons created as tsx components are not worth testing
    "!./app/components/Icons/**/*.icon.tsx",
  ],
  coverageDirectory: "./coverage",
  collectCoverage: true,
}
