module.exports = {
  // Lista de arquivos ou padrões de arquivos a serem incluídos nos testes
  testMatch: ["**/__tests__/**/*.js", "**/?(*.)+(spec|test).js"],

  // Diretório onde os resultados dos testes serão salvos
  coverageDirectory: "coverage",

  // Transformadores para diferentes tipos de arquivos
  transform: {
    "^.+\\.jsx?$": [
      "babel-jest",
      {
        presets: ["@babel/preset-env", "@babel/preset-react"],
        plugins: ["@babel/plugin-transform-modules-commonjs"],
      },
    ],
    "^.+\\.scss$": "jest-transform-stub",
    "^.+\\.svg$": "<rootDir>/svgTransform.cjs",
  },

  // Outras opções de configuração podem ser adicionadas aqui
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],

  // Configuração transferida do package.json
  transformIgnorePatterns: ["/node_modules/(?!vmsg)"],
};
