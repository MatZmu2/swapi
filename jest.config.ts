export default {
  displayName: "swapi-game",
  preset: "./jest.preset.js",
  setupFilesAfterEnv: ["<rootDir>/src/setup-jest.ts"],
  coverageDirectory: "./coverage/swapi-game",
  coverageReporters: ["text", "html", "lcov"],
  transform: {
    "^.+\\.(ts|mjs|js|html)$": [
      "jest-preset-angular",
      {
        tsconfig: "<rootDir>/tsconfig.spec.json",
        stringifyContentPathRegex: "\\.(html|svg)$",
      },
    ],
  },
  transformIgnorePatterns: ["node_modules/(?!.*\\.mjs$)"],
  snapshotSerializers: [
    "jest-preset-angular/build/serializers/no-ng-attributes",
    "jest-preset-angular/build/serializers/ng-snapshot",
    "jest-preset-angular/build/serializers/html-comment",
  ],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.[jt]s?(x)",
    "<rootDir>/src/**/*(*.)@(spec|test).[jt]s?(x)",
  ],
  testEnvironment: "jsdom", 
};
