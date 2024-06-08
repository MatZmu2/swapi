export default {
  displayName: "angular-shuffling-game",
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/src/setup-jest.ts"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.spec.json",
      stringifyContentPathRegex: "\\.html$",
      astTransformers: {
        before: [
          "jest-preset-angular/build/InlineFilesTransformer",
          "jest-preset-angular/build/StripStylesTransformer",
        ],
      },
    },
  },
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
    "^@app/(.*)$": "<rootDir>/src/app/$1",
    "^@environments/(.*)$": "<rootDir>/src/environments/$1",
  },
  transformIgnorePatterns: ["node_modules/(?!.*\\.mjs$)"],
  moduleFileExtensions: ["ts", "html", "js", "json"],
  collectCoverage: true,
  coverageReporters: ["html", "text", "text-summary", "cobertura"],
  coverageDirectory: "<rootDir>/coverage/",
  testMatch: ["<rootDir>/src/**/*.spec.ts"],
  reporters: [
    "default",
    [
      "jest-junit",
      { outputDirectory: "./test-results/jest", outputName: "results.xml" },
    ],
  ],
};
