/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  //testEnvironment: "react",
  setupFilesAfterEnv: ["<rootDir>/src/test/setupTests.ts"],
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
};
