# Security Policy

## Our Commitment to Security

PinStay is committed to maintaining the security and privacy of our users. We take security vulnerabilities seriously and appreciate responsible disclosure from the security community.

## Security Guarantees

✅ **Zero Data Collection**: PinStay does not collect, transmit, or store any user data externally  
✅ **Local Processing Only**: All functionality runs entirely within your browser  
✅ **No External Connections**: The extension makes no network requests  
✅ **Open Source**: 100% of our code is publicly auditable in this repository  
✅ **Minimal Permissions**: We only request permissions absolutely necessary for core functionality  

## What We Monitor

PinStay only monitors:
- Whether a tab is pinned (via Chrome's tabs API)
- Navigation attempts on pinned tabs (to redirect back to original domain)
- Tab IDs and their original domains (stored locally)

**What we DON'T access:**
- ❌ Page content
- ❌ Passwords or form data
- ❌ Browsing history
- ❌ Cookies or authentication tokens
- ❌ Personal information

## Understanding Chrome's "Not Trusted" Warning

Chrome may display a warning that PinStay is "not trusted by Enhanced Safe Browsing." This is important to understand:

### Why This Warning Appears (Technical Reasons)

The warning is **automatically triggered** by:
- ✅ **Broad Permissions**: Using `<all_urls>` host permissions (which PinStay requires to monitor navigation on any domain you pin)
- ✅ **New Extension**: Being relatively new without millions of established users yet
- ✅ **Automated System**: Google's algorithms flagging extensions with wide-reaching permissions

### What Does NOT Affect This Warning

The warning is **NOT based on**:
- ❌ Code quality or security practices
- ❌ Having proper documentation or privacy policies
- ❌ Being open source or auditable
- ❌ Actual malicious behavior or security issues

### What This Means for You

- **It's a precautionary notice**, not evidence of malicious behavior
- Many **legitimate extensions** with necessary broad permissions show this warning
- You can **verify PinStay's safety** by auditing the open source code in this repository
- The warning **may fade over time** as the extension gains users and maintains good behavior

### How We Address This

While we cannot remove Google's automated warning, we provide:
- ✅ Complete source code transparency (audit `background.js`)
- ✅ Detailed documentation of what we do (and don't do)
- ✅ Clear explanation of why permissions are needed
- ✅ Zero external data transmission (verifiable in code)
- ✅ Active security policy with vulnerability reporting

**Bottom line**: The warning reflects PinStay's technical requirements, not its trustworthiness. We encourage technical users to review our code and judge for themselves.

## Reporting a Vulnerability

If you discover a security vulnerability in PinStay, please help us by following responsible disclosure:

### How to Report

**Preferred Method**: Open a security advisory (private)
1. Go to the [Security tab](https://github.com/richieboo/pinstay/security) on this repository
2. Click "Report a vulnerability"
3. Provide details about the vulnerability

**Alternative Method**: Email (if GitHub advisory is not available)
- Contact: Open an issue at https://github.com/richieboo/pinstay/issues
- Mark it as "Security" in the title
- We'll move the discussion to a private channel if needed

### What to Include

Please include the following in your report:
- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact
- Any suggested fixes (if you have them)
- Your preferred method of contact for follow-up

### What to Expect

- **Acknowledgment**: Within 48 hours of report submission
- **Initial Assessment**: Within 5 business days
- **Status Updates**: Regular updates as we investigate and develop a fix
- **Resolution**: We aim to release patches for critical vulnerabilities within 7 days
- **Credit**: We'll acknowledge your contribution in release notes (if you wish)

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.7   | ✅ Current         |
| 1.0.x   | ✅ Yes             |
| < 1.0   | ❌ No              |

We recommend always using the latest version from the Chrome Web Store.

## Security Best Practices for Users

To ensure maximum security when using PinStay:

1. **Install from Official Sources Only**
   - Chrome Web Store: https://chromewebstore.google.com/detail/pinstay/hmaopbijmlmcpcjfmpihiofkkjocnbne
   - Or build from this official GitHub repository

2. **Review the Code**
   - All source code is available in this repository
   - Main logic is in `background.js` - feel free to audit it

3. **Check Permissions**
   - Review what permissions the extension requests during installation
   - See [PRIVACY.md](PRIVACY.md) for detailed explanations

4. **Keep Updated**
   - Enable automatic updates in Chrome
   - Check for updates regularly if auto-update is disabled

5. **Report Suspicious Behavior**
   - If you notice unexpected behavior, please report it immediately

## Known Limitations

These are intentional design constraints, not vulnerabilities:

1. **Chrome API Limitations**: PinStay cannot prevent all forms of tab closure (e.g., browser crash, force quit)
2. **Restricted Pages**: Cannot function on `chrome://`, `edge://`, or other browser internal pages
3. **Session Storage**: Uses Chrome's session storage API which clears on browser uninstall

## Code Audit

PinStay's code is intentionally simple and auditable:

- **Main Logic**: `background.js` (~400 lines)
- **Configuration**: `manifest.json`
- **UI**: `install.html` (welcome page only)
- **No External Dependencies**: No third-party libraries or frameworks
- **No Minification**: Source code is readable and unobfuscated

### Quick Audit Checklist

Want to verify PinStay is safe? Check these key points:

```javascript
// In background.js:
✅ No fetch(), XMLHttpRequest, or other network calls
✅ No eval() or Function() constructor (no dynamic code execution)
✅ Only Chrome extension APIs used: tabs, webNavigation, scripting, storage
✅ Storage only uses chrome.storage (local to your browser)
✅ No external script imports
```

## Updates and Patches

Security updates will be released as soon as possible:
- **Critical**: Immediate patch (same day)
- **High**: Within 7 days
- **Medium**: Next regular release
- **Low**: Scheduled release

All security updates will be documented in the [CHANGELOG](README.md#changelog-) with appropriate severity indicators.

## Contact

- **Issues**: https://github.com/richieboo/pinstay/issues
- **Website**: https://workingdogworx.com/
- **Privacy Policy**: [PRIVACY.md](PRIVACY.md)

---

**Last Updated**: 2025-01-12  
**Version**: 1.0.7

