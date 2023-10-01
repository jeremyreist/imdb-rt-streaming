<img align="right" src="https://github.com/jeremyreist/imdb-rt-streaming/blob/main/src/img/logo_small.png" alt="SVODEX Logo">
# SVODEX 
#### Formerly (IMDb & Rotten Tomatoes for Streaming)
Welcome to SVODEX, a Chrome extension that enhances your streaming experience by adding ratings to popular streaming sites.

## Installation
1. Run `npm i` to install the required dependencies.
2. Build the unpacked extension using `npm run build`.
3. To load the unpacked extension in Chrome:
    1. Go to `chrome://extensions/`
    2. Enable `Developer mode`.
    3. Click on `Load unpacked extension`.
    4. Select the `dist` folder.
4. For development purposes, use `npm run dev`.

## Supported Streaming Sites
- Currently supported platforms:
  - Netflix
  - Disney+
  - HBO MAX
- Coming soon: 
  - Prime Video
  - Hulu

## Filmtoro API
To interact with the Filmtoro API, you will need the following parameters:
- `id`: The title link, e.g., `https://www.netflix.com/title/[ID]` or `https://www.disneyplus.com/[series or movie]/[ID]`
- `episode`: The episode ID, e.g., 80011816 (suits s5, e6) or 7a6eeb4b-050a-40b0-9018-dc46a5259195 (family guy s1, e3)
- `click`: A boolean value that indicates if the user clicked on a title.
- `api`: The API key in use.
- `start`: An integer between 0 and 100, where 0% represents the first-time watching, and values between 0 - 99% indicate continuing from a previous session.
- `end`: An integer between 0 and 100, where 1% means the user left after a few seconds, and 98% means they finished the whole show.

## Contributions
We welcome contributions from the community! If you have ideas, bug reports, or want to contribute code, please create a PR.
