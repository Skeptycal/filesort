# FileSort

![Sreenshot](/graphics/SCREENSHOT.png)

*Get your files sorted*

## Description
Just a basic program to sort files anywhere on your computer.
Please use with caution. I have only tested this on macOS.

Sorts files and folders and puts them into *\_Type* folders for easy access at the top of your directory.

## Prerequisites
This project requires you to install [Git](https://git-scm.com/), [Node](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/en/).

## Development
```shell
git clone https://github.com/yougotwill/filesort
cd filesort
yarn
yarn start
```

## File Classification
Files are classified as follows:

| *_Type* Folder | File Extension                           |
| :------------- | :--------------------------------------- |
| _Books         | ".epub", ".mobi"                         |
| _Documents     | ".pdf", ".txt", ".doc", ".docx", ".ppt", ".pptx", ".md", ".json", ".ods", ".log", ".xls", ".xlsx" |
| _Images        | ".png", ".jpg", ".jpeg", ".gif", ".xcf", ".stl", ".blend", "*.obj", "*.mtl", "*.3ds", "*.tga", ".icns" |
| _Music         | ".mp3", ".wav", ".flac", ".m4a", ".ogg", ".mid", ".asd", ".m3u", ".pls", ".alp", ".asx", ".bfxrsound", ".m3u8", ".als" |
| _Programs      | ".dmg", ".exe", ".sh", ".app", ".pkg", ".apk", ".ipa" |
| _Scripts       | ".py", ".java", ".class", ".sh", "*.cs", "*.r" |
| _Torrents      | ".torrent"                               |
| _Videos        | ".mkv", ".mp4", ".mov", ".mpeg", ".webm", ".srt" |
| _Web           | ".html", ".css", ".js", ".htm"           |
| _Zipped        | ".zip", ".rar", ".7z", ".tar.gz", ".tar", ".gz", "*.unitypackage", "*.prefab", ".fbx" |

## Folder Classification
Folders are classified based on the most prevalent *_Type* folder found one level down from the directory.

### Ignored Items List

".DS_Store", "Incomplete"

## Authors

* **William Grant** - *Current Work* - [yougotwill](https://github.com/yougotwill)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
