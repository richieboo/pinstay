# Privacy Policy for PinStay

Effective date: 2025-01-01

PinStay does not collect, store, or transmit any personal data.

## What PinStay does on your device

- Prevents pinned tabs from navigating away from their original domain
- Prevents accidental closure of pinned tabs by recreating them when closed
- Shows on-page notifications explaining blocked actions

All logic runs locally in your browser. PinStay does not send any data to external servers.

## Permissions and why they are needed

- `tabs`: Determine whether a tab is pinned and recreate tabs when needed
- `webNavigation`: Detect when a pinned tab tries to navigate to a different domain
- `scripting`: Inject a small, local-only notification into the current page
- `storage`: Keep a temporary, local map of pinned tabs so functionality continues after the background worker sleeps
- `host_permissions` (`<all_urls>`): Required to listen to navigation events across sites for pinned tabs. PinStay does not read or transmit page content.

## Data handling

- No personal information is collected.
- No data leaves your device.
- Temporary state is stored locally using Chrome storage and cleared when not needed.

## Contact

If you have questions or concerns, please open an issue on the GitHub repository: https://github.com/richieboo/pinstay/issues
