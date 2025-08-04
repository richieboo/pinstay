# PinStay 📌

A Chrome extension that prevents pinned tabs from accidentally navigating away from their original domain and being closed.

## Features ✨

- **🔒 Domain Locking**: Prevents pinned tabs from leaving their original domain
- **🚫 Tab Closure Protection**: Stops accidental closure of pinned tabs
- **💡 Smart Notifications**: Shows helpful popup messages when actions are blocked
- **🔄 Browser Shutdown Support**: Automatically allows browser closure during shutdown
- **📱 User-Friendly**: Clean, non-intrusive notifications with custom styling
- **⚡ Lightweight**: Minimal performance impact on your browsing experience

## Installation 🚀

### From Chrome Web Store (Recommended)

[Coming Soon - Link to Chrome Web Store]

### Manual Installation (Developer Mode)

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the folder containing the extension files
5. PinStay will be installed and ready to use!

## How to Use 📖

### Basic Usage

1. **Pin a tab** by clicking the pin icon in the tab bar, or right-click the tab and select "Pin tab"
2. PinStay automatically locks the tab to its current domain
3. Try to navigate away or close the tab - PinStay will prevent it and show a notification
4. **Unpin the tab** to remove protection (click the pin icon again or right-click → "Unpin")

### What Happens When Actions Are Blocked

- **Navigation Blocked**: A popup appears saying "Your pinned tabs are locked to the domain they were pinned at"
- **Tab Closure Blocked**: A popup appears with instructions on how to unpin the tab
- **Browser Shutdown**: PinStay allows the browser to close normally

### Popup Notifications

- Appear in the bottom-right corner of the screen
- Auto-dismiss after 5 seconds
- Non-intrusive and don't block page interaction
- Styled with a modern, clean design

## Files Structure 📁

```
pinstay/
├── background.js          # Main extension logic
├── manifest.json          # Extension configuration
├── install.html           # Installation welcome page
├── uninstall.html         # Uninstallation feedback form
├── icon128.png           # Extension icon
└── README.md             # This file
```

## Technical Details 🔧

### Permissions Used

- `tabs`: To monitor and control tab behavior
- `webNavigation`: To intercept navigation attempts
- `scripting`: To inject popup notifications into pages

### Browser Compatibility

- Chrome 88+ (Manifest V3)
- Chromium-based browsers (Edge, Brave, etc.)

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support ☕

If PinStay helps you stay organized, consider buying me a coffee!

[Buy me a coffee](https://www.buymeacoffee.com/richieboo)

## Changelog 📝

### Version 1.0.0

- Initial release
- Domain locking for pinned tabs
- Tab closure prevention
- Custom popup notifications
- Browser shutdown support
- Install/uninstall pages

## Roadmap 🗺️

- [ ] Chrome Web Store submission
- [ ] Firefox extension version
- [ ] Settings page for customization
- [ ] Keyboard shortcuts
- [ ] Export/import settings

---

**Made with ❤️ by [richieboo](https://github.com/richieboo)**
