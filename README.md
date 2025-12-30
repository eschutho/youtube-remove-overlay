# youtube-remove-overlay

A Chrome extension that removes the overlay at the end of YouTube videos by hiding elements with the class `ytp-ce-element-show`.

## Features

- Automatically hides YouTube overlay elements (cards, end screens) with class `ytp-ce-element-show`
- Sets opacity to 0 and display to none for seamless removal
- Works on all YouTube pages
- Monitors for dynamically added elements

## Installation

### Load as an Unpacked Extension

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" using the toggle in the top right
4. Click "Load unpacked" button
5. Select the directory containing this extension
6. The extension is now active!

## Usage

Once installed, the extension automatically works on YouTube. Simply visit any YouTube video and the overlays at the end will be hidden.

## Files

- `manifest.json` - Chrome extension configuration
- `content.js` - JavaScript that hides the overlay elements
- `content.css` - CSS that sets opacity to 0 and hides the elements

## How it Works

The extension uses two approaches to hide the overlay:

1. **CSS**: Applies styles to set `opacity: 0` and `display: none` on elements with class `ytp-ce-element-show`
2. **JavaScript**: Uses a MutationObserver to detect and hide dynamically added overlay elements in real-time
