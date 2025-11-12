# Privacy Policy for PinStay

Effective date: 2025-01-12

PinStay does not collect, store, or transmit any personal data.

## What PinStay does on your device

- Prevents pinned tabs from navigating away from their original domain
- Shows on-page notifications when navigation is blocked
- Redirects you back to the original pinned URL (preserving ports and paths)

All logic runs locally in your browser. PinStay does not send any data to external servers.

## About Enhanced Safe Browsing Warning

Chrome may show a warning that PinStay is "not trusted by Enhanced Safe Browsing." This appears because PinStay requires broad permissions (`<all_urls>`) to monitor navigation on ANY website you might pin. This is necessary for core functionality - we can't predict which sites you'll pin (Gmail, GitHub, localhost:3000, etc.). 

**PinStay's code is open source and auditable** at https://github.com/richieboo/pinstay - you can verify that no data is collected or transmitted.

## Permissions and why they are needed

- `tabs`: Determine whether a tab is pinned and track their original domains
- `webNavigation`: Detect when a pinned tab tries to navigate to a different domain and redirect it back
- `scripting`: Inject local-only notifications into pages to inform you when navigation is blocked
- `storage`: Keep a temporary, local map of pinned tabs so protection persists even after the service worker sleeps
- `host_permissions` (`<all_urls>`): Required to monitor navigation across ALL websites since users can pin any domain (Gmail, GitHub, localhost:3000, etc.). **PinStay does not read, collect, or transmit page content.**

## Data handling

- No personal information is collected.
- No data leaves your device.
- Temporary state is stored locally using Chrome storage and cleared when not needed.

## Contact

If you have questions or concerns, please open an issue on the GitHub repository: https://github.com/richieboo/pinstay/issues
