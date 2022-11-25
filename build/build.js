import fs from "fs";

const createWidgetJson = () => `{
    "name": "siyuan-heatmap",
    "author": "hlyiww",
    "url": "https://github.com/hlyiww/siyuan-heatmap",
    "version": "${process.env.RELEASE_VERSION}"
  }`;

const createReadme = () => `
# Siyuan HeatMap
`;

const createCI = () => `
name: release

on:
  push:
    branches:
      main

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 6.32.9
          
      - name: read version
        id: version
        uses: ashley-taylor/read-json-property-action@v1.0
        with:
          path: ./widget.json
          property: version

      - name: Release
        uses: actions/create-release@master
        env:
          GITHUB_TOKEN: $\{\{ secrets.TOKEN \}\}
        with:
          tag_name: $\{\{ steps.version.outputs.value \}\}
          release_name: $\{\{ steps.version.outputs.value \}\}
          body: Release $\{\{ steps.version.outputs.value \}\}
          draft: false
          prerelease: false
`;

const main = () => {
  fs.writeFileSync("./dist/widget.json", createWidgetJson(), {
    encoding: "utf-8",
  });
  fs.writeFileSync("./dist/README.md", createReadme(), {
    encoding: "utf-8",
  });
  fs.writeFileSync("./dist/preview.png", fs.readFileSync("./preview.png"));
  fs.mkdirSync("./dist/.github");
  fs.mkdirSync("./dist/.github/workflows");
  fs.writeFileSync("./dist/.github/workflows/release.yaml", createCI(), {
    encoding: "utf-8",
  });
};

main();
