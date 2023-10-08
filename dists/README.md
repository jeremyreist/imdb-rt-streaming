# How to make a dist ready for publishing

## Update `manifest.json`
Make sure to increment the version number following [semver](https://semver.org/) format.

## Make the `dist.zip` for upload
Follow these steps closely otherwise firefox may give you an *Invalid manifest.json* error.

### macOS 
1. Open the directory containing your extension's files.
2. Select files and directories needed to implement your extension, excludes those files that aren't needed to run the extension, such as `.git`, graphic sources, and similar files.
3. Open the shortcut menu and click **Compress** **_n_** **Items**.

![Creating package Mac image](https://extensionworkshop.com/assets/img/documentation/publish/creating_package_mac.a8521ebc.png)

  
###  Windows
1. Open the directory containing your extension's files.
2. Select files and directories needed to implement your extension, exclude those files that aren't needed to run the extension, such as `.git`, graphic sources, and similar files.
3. Open the shortcut menu and click **Send to** then **Compressed (zipped) folder**.

![Creating package windows image](https://extensionworkshop.com/assets/img/documentation/publish/creating_package_windows.5dce23cf.png)