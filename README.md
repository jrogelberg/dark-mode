# Dark Mode Browser Extension

## 🌓 Transform Any Website into Dark Mode

Dark Mode is a simple browser extension that seamlessly converts any website into a comfortable dark mode, reducing eye strain and improving your browsing experience, especially in low-light environments.

## ✨ Features

- **Universal Compatibility**: Works on virtually any website, including complex web applications.
- **Smart Inversion**: Intelligently inverts colors while preserving images, videos, and other media.
- **Adaptive Algorithm**: Detects if a site is already in dark mode to avoid unnecessary inversion.
- **Performance Optimized**: Efficiently applies dark mode without impacting browsing speed.
- **Customizable**: Excludes specific elements (like charts and graphs) from inversion for better readability.
- **Shadow DOM Support**: Applies dark mode even to elements within Shadow DOMs for comprehensive coverage.

## 🚀 Installation

1. Clone this repository or download the source code.
2. Navigate to your extensions folder.
3. Enable "Developer mode."
4. Click "Load unpacked" and select the directory containing the extension files.
5. The Dark Mode extension icon should now appear in your Chrome toolbar!

## 🔧 Usage

1. Click the extension icon in the Chrome toolbar to toggle dark mode on/off.
2. The extension will automatically apply dark mode to the current website.

## 🛠️ Customization

To customize which elements should not be inverted:

1. Open the `content.js` file.
2. Locate the `applyInversion` function.
3. Modify the selector in the following line to target your desired elements:
   ```javascript
   document.querySelectorAll('.stock-chart, .crypto-chart, .price-graph').forEach(el => el.classList.add('no-invert'));
   ```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the need for a universal dark mode solution.
- Thanks to all the developers who have worked on similar projects and shared their knowledge.

---

If you find this extension helpful, consider giving it a star on GitHub and sharing it with others!
