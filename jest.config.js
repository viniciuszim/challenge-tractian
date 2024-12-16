module.exports = {
  globals: {
    IS_REACT_ACT_ENVIRONMENT: true,
  },
  moduleDirectories: ["src", "test", "node_modules", __dirname],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "node"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/tests/fileMock.js",
  },
  roots: ["<rootDir>"],
  // setupFiles: ["./jest.setup-all.js"],
  setupFilesAfterEnv: [
    "./tests/importJestDOM.js",
    // "./jest.setup-each.js"
  ],
  testEnvironment: "jsdom",
  testMatch: ["**/*.(test|spec).(js|jsx|ts|tsx)"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)?$": [
      "babel-jest",
      {
        plugins: ["@babel/plugin-proposal-private-methods"],
      },
    ],
  },
  transformIgnorePatterns: [
    "[/\\\\](node_modules)[/\\\\].+\\.(ts|tsx)$, [/\\\\]git_submodules[/\\\\].+\\.(ts|tsx)$",
    "node_modules/(?!(jest-)?nanoid|(?!uuid))",
  ],
};
