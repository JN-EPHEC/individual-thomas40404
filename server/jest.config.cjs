module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {
      tsconfig: {
        module: "CommonJS",
        verbatimModuleSyntax: false,
      },
    }],
  },
  testMatch: ["**/src/tests/**/*.test.ts"],
};
