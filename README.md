# youtube-remove-overlay

A Chrome extension that removes the overlay at the end of YouTube videos by hiding elements with the class `ytp-ce-element-show`.

## Features

- Automatically hides YouTube overlay elements (cards, end screens) with class `ytp-ce-element-show`
- Sets opacity to 0 and display to none for seamless removal
- Works on all YouTube pages
- Monitors for dynamically added elements

## Installation

### Load as an Unpacked Extension (For Development)

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" using the toggle in the top right
4. Click "Load unpacked" button
5. Select the directory containing this extension
6. The extension is now active!

### Pack Extension (For Distribution)

To create a packaged `.crx` file that can be shared with others:

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" using the toggle in the top right
3. Click "Pack extension" button
4. In the dialog:
   - **Extension root directory**: Browse and select the directory containing this extension
   - **Private key file**: Leave empty for first-time packing (Chrome will generate one for you)
5. Click "Pack Extension"
6. Chrome will create two files in the parent directory:
   - `youtube-remove-overlay.crx` - The packed extension file
   - `youtube-remove-overlay.pem` - The private key file (keep this secure!)

**Important Notes:**
- **Keep your `.pem` file secure and private** - You'll need it to create updates to your extension
- For subsequent updates, use the same `.pem` file to maintain the same extension ID
- Users can install the `.crx` file by dragging it onto the `chrome://extensions/` page
- For wider distribution, consider publishing to the Chrome Web Store

**What does packing do?**
- Creates a signed, compressed `.crx` (Chrome Extension) file
- Generates a unique extension ID based on the private key
- Makes the extension easy to share and distribute
- Allows for offline installation without Developer Mode (in some cases)

## Usage

Once installed, the extension automatically works on YouTube. Simply visit any YouTube video and the overlays at the end will be hidden.

## Files

- `manifest.json` - Chrome extension configuration
- `content.js` - JavaScript that hides the overlay elements
- `content.css` - CSS that sets opacity to 0 and hides the elements

## How it Works

The extension uses multiple approaches to hide the overlay:

1. **CSS**: Applies styles to set `opacity: 0` and `display: none` on elements with class `ytp-ce-element-show`
2. **Parent Class**: Adds a custom class (`yt-overlay-hidden`) to the `html5-video-player` parent element, allowing CSS to target child overlay elements
3. **JavaScript**: Uses a MutationObserver to:
   - Detect when the `html5-video-player` element is added and immediately add the custom class
   - Watch for dynamically added overlay elements in real-time
   - Monitor class attribute changes to catch overlays that are shown by adding the `ytp-ce-element-show` class
