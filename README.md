# PinStay 📌

A Chrome extension that prevents pinned tabs from accidentally navigating away from their original domain.

## Features ✨

- **🔒 Domain Locking**: Prevents pinned tabs from leaving their original domain
- **💡 Smart Notifications**: Shows helpful popup messages when navigation is blocked
- **📱 User-Friendly**: Clean, non-intrusive notifications with custom styling
- **⚡ Lightweight**: Minimal performance impact on your browsing experience
- **🛡️ Persistent Protection**: Works reliably even after browser sits idle overnight

## Installation 🚀

### From Chrome Web Store (Recommended)

[Install PinStay](https://chromewebstore.google.com/detail/pinstay/hmaopbijmlmcpcjfmpihiofkkjocnbne)

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
3. Try to navigate away - PinStay will prevent it and show a notification
4. **Unpin the tab** to remove protection (click the pin icon again or right-click → "Unpin")

### What Happens When Navigation Is Blocked

- **Navigation Blocked**: A popup appears saying "Your pinned tabs are locked to the domain they were pinned at"
- The tab will be redirected back to the original domain

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
- `scripting`: To inject popup notifications and beforeunload overrides into pages
- `storage`: To persist pinned tab state across service worker sleeps

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

### Version 1.0.7

- **Removed tab closure protection**: Simplified extension to focus solely on navigation protection since Chrome already prevents closing pinned tabs natively
- **Streamlined codebase**: Removed redundant tab recreation and browser shutdown detection logic
- **Updated description**: Clarified that PinStay now only prevents navigation away from the original domain

### Version 1.0.3

- **Fixed MV3 idle/wake state loss**: Added session storage persistence so protection works after browser sits idle overnight
- **Eliminated "Leave site?" warnings**: Added beforeunload override to prevent Google apps and other sites from showing unsaved changes warnings
- **Improved tab recreation**: Recreates closed pinned tabs in the same window and activates them for better UX
- **Enhanced reliability**: Added storage permission and fallback mechanisms for better state management
- **Store compliance**: Updated icon sizes (16/48/128) for Chrome Web Store requirements

### Version 1.0.2

- Fixed MV3 service worker state persistence
- Added storage permission for session data
- Updated manifest with proper icon sizes

### Version 1.0.1

- Initial Chrome Web Store release

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
