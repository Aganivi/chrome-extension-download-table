# <img src="public/icons/icon_48.png" width="45" align="left"> My Extension

A chrome extension to download HTML table in any website, and export to `.xlsx` file.

## Features

- [x] Download HTMl table
- [x] Export to `.xlsx` file

## Install

```shell
npm install
```

## Usage

```shell
npm run watch
```
Then, upload the extension to your Chrome and choose folder chrome-extension-download-table/build

## Public
1. Execute the following command
```shell
  npm run repack
```

2. Open [Extensions](chrome://extensions/), then add the extension.  

3. Choose the folder `build`, such as `<your-path>/download-html-table/build`
![Add extension](/assets/add.png)

4. Pin the extension in the toolbar.
![Pin extension](/assets/pin.png)

5. Click the extension icon, and choose the table you want to download.
![Choose Table](/assets/choose.png)

6. Then, you can see the table is downloaded.

## Contribution

Suggestions and pull requests are welcomed!

---

This project was bootstrapped with [Chrome Extension CLI](https://github.com/dutiyesh/chrome-extension-cli)

