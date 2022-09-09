<img align="right" src="https://github.com/jeremyreist/imdb-rt-streaming/blob/main/listing/64.png" alt="IMDb & Rotten Tomaotes for Streaming">

# IMDb & Rotten Tomaotes for Streaming
A chrome extension that adds ratings to streaming sites.

## Installation
1. Run `npm i` to install the dependencies
2. Run `npm run build` to build the unpacked extension
3. Load the unpacked extension on Chrome by:
    1. Going to `chrome://extensions/`
    2. Check `Developer mode`
    3. Click on `Load unpacked extension`
    4. Select the `dist` folder
4. For development use `npm run dev`

## Supported Streaming Sites
- Supported:
  - Netflix
  - Disney+
- Coming soon: 
  - Prime Video
  - HBO MAX
  - Hulu

## Filmtoro API
id: the title link - e.g https://www.netflix.com/title/[ID] or https://www.disneyplus.com/[series or movie]/[ID]
episode: the episode id - e.g.  80011816 (suits s5, e6) or 7a6eeb4b-050a-40b0-9018-dc46a5259195 (family guy s1, e3)
api: the api key we use
start: an integer between 0 and 100 (0% means first time watching, between 0 - 99% means continuing from before)
end: an integer between 0 and 100 (1% means left after a few seconds, 98% means finished whole show)