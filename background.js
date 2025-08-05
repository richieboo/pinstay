const pinnedDomains = {};

function getDomain(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.toLowerCase();
  } catch (e) {
    return null;
  }
}

// Function to show custom popup notification
function showPopup(tabId, title, message, position = "bottom-right") {
  // First check if we can inject scripts into this tab
  chrome.tabs.get(tabId, (tab) => {
    if (chrome.runtime.lastError || !tab || !tab.url) {
      console.error("PinStay: Cannot get tab info for popup");
      return;
    }

    // Don't try to inject scripts into restricted pages
    if (
      tab.url.startsWith("chrome://") ||
      tab.url.startsWith("chrome-extension://") ||
      tab.url.startsWith("edge://") ||
      tab.url.startsWith("about:") ||
      tab.url.startsWith("moz-extension://")
    ) {
      console.log(`PinStay: Skipping popup for restricted page: ${tab.url}`);
      return;
    }

    chrome.scripting
      .executeScript({
        target: { tabId: tabId },
        func: (title, message, position) => {
          // Remove any existing popup first
          const existingPopup = document.getElementById("pinstay-popup");
          if (existingPopup) {
            existingPopup.remove();
          }

          // Remove any existing styles
          const existingStyle = document.querySelector("style[data-pinstay]");
          if (existingStyle) {
            existingStyle.remove();
          }

          // Create popup element
          const popup = document.createElement("div");
          popup.id = "pinstay-popup";
          popup.innerHTML = `
          <div class="pinstay-title">${title}</div>
          <div class="pinstay-message">${message}</div>
        `;

          // Set position immediately
          if (position === "top-center") {
            popup.style.top = "20px";
            popup.style.left = "50%";
            popup.style.transform = "translateX(-50%) translateZ(0)";
          } else {
            // bottom-right with 75px offset from both bottom and right
            popup.style.bottom = "75px";
            popup.style.right = "75px";
            popup.style.transform = "translateZ(0)";
          }

          // Add styles
          const style = document.createElement("style");
          style.setAttribute("data-pinstay", "true");
          style.textContent = `
          #pinstay-popup {
            position: fixed;
            z-index: 999999;
            background: #2c3e50;
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 14px;
            max-width: 300px;
            animation: pinstay-slide-in 0.3s ease-out;
            border-left: 4px solid #187D28;
            pointer-events: none;
            transform: translateZ(0);
          }
          
          .pinstay-title {
            font-weight: 600;
            margin-bottom: 4px;
            color: #187D28;
          }
          
          .pinstay-message {
            line-height: 1.4;
          }
          
          @keyframes pinstay-slide-in {
            from {
              opacity: 0;
              transform: translateY(20px) translateZ(0);
            }
            to {
              opacity: 1;
              transform: translateY(0) translateZ(0);
            }
          }
          
          @keyframes pinstay-fade-out {
            from {
              opacity: 1;
              transform: translateY(0) translateZ(0);
            }
            to {
              opacity: 0;
              transform: translateY(-10px) translateZ(0);
            }
          }
        `;

          // Add to page
          try {
            document.head.appendChild(style);
            document.body.appendChild(popup);
          } catch (e) {
            console.error("PinStay: Failed to add popup to page:", e);
            return;
          }

          // Auto-remove after 5 seconds
          setTimeout(() => {
            try {
              popup.style.animation = "pinstay-fade-out 0.3s ease-in";
              setTimeout(() => {
                if (popup.parentNode) {
                  popup.parentNode.removeChild(popup);
                }
                if (style.parentNode) {
                  style.parentNode.removeChild(style);
                }
              }, 300);
            } catch (e) {
              console.error("PinStay: Failed to remove popup:", e);
            }
          }, 5000);
        },
        args: [title, message, position],
      })
      .catch((error) => {
        console.error("PinStay: Failed to execute popup script:", error);
      });
  });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!tab || !tab.url) return;

  // If tab is pinned and not already tracked, add it to protection
  if (tab.pinned && !(tabId in pinnedDomains)) {
    const currentDomain = getDomain(tab.url);
    pinnedDomains[tabId] = currentDomain;
    console.log(`PinStay: Locked tab ${tabId} to domain ${currentDomain}`);
  }

  // If tab was unpinned, remove it from protection
  if (!tab.pinned && tabId in pinnedDomains) {
    delete pinnedDomains[tabId];
    console.log(`PinStay: Unlocked tab ${tabId} (unpinned)`);
  }
});

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if (details.frameId !== 0) return;

  chrome.tabs.get(details.tabId, (tab) => {
    if (chrome.runtime.lastError || !tab || !tab.pinned) return;

    const allowedDomain = pinnedDomains[tab.id];
    const nextDomain = getDomain(details.url);

    console.log(
      `PinStay Debug: Tab ${tab.id} navigating from ${allowedDomain} to ${nextDomain}`
    );

    if (allowedDomain && nextDomain && allowedDomain !== nextDomain) {
      console.warn(
        `PinStay: Preventing tab ${tab.id} from navigating to ${nextDomain}`
      );

      // Prevent navigation by redirecting back to the allowed domain
      chrome.tabs.update(tab.id, { url: `https://${allowedDomain}` });

      // Show popup after a short delay to ensure the page is stable
      setTimeout(() => {
        showPopup(
          tab.id,
          "PinStay",
          "Your pinned tabs are locked to the domain they were pinned.",
          "bottom-right"
        );
      }, 500);
    }
  });
});

// 🚫 Prevent pinned tabs from being closed - improved version
let isBrowserShuttingDown = false;

// Listen for window removal to detect browser shutdown
chrome.windows.onRemoved.addListener((windowId) => {
  isBrowserShuttingDown = true;
  console.log(
    `PinStay: Browser window ${windowId} closing, allowing all tabs to close`
  );
});

// Note: Chrome's extension API doesn't allow preventing the right-click "Close tab" action
// We can only recreate the tab after it's closed, which is what the onRemoved listener does

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  // Check if this tab was pinned before removal
  if (tabId in pinnedDomains) {
    // Allow browser to close - don't prevent tab removal if browser is shutting down
    if (removeInfo.isWindowClosing || isBrowserShuttingDown) {
      console.log(
        `PinStay: Allowing pinned tab ${tabId} to close (browser shutting down)`
      );
      delete pinnedDomains[tabId];
      return;
    }

    console.warn(`PinStay: Preventing pinned tab ${tabId} from being closed`);

    // Show popup notification before recreating the tab
    // We need to show this on the active tab since the closed tab is gone
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].id) {
        showPopup(
          tabs[0].id,
          "PinStay",
          "You must unpin a tab to close it. You can unpin a tab by clicking the pin icon in the top right corner of the tab, or right clicking the tab and selecting 'Unpin'.",
          "bottom-right"
        );
      }
    });

    // Recreate the tab with the same URL
    chrome.tabs.create(
      {
        url: `https://${pinnedDomains[tabId]}`,
        pinned: true,
        active: false,
      },
      (newTab) => {
        if (newTab && newTab.id) {
          // Transfer the domain lock to the new tab
          pinnedDomains[newTab.id] = pinnedDomains[tabId];
          console.log(
            `PinStay: Recreated pinned tab ${newTab.id} for domain ${pinnedDomains[tabId]}`
          );
        }
      }
    );

    // Don't delete from pinnedDomains yet, as we're recreating the tab
    return;
  }

  // Only delete from pinnedDomains if it wasn't a pinned tab we prevented from closing
  delete pinnedDomains[tabId];
});

// 🧠 On startup, lock any currently pinned tabs and set uninstall URL
chrome.runtime.onStartup.addListener(() => {
  // Initialize existing pinned tabs
  chrome.tabs.query({ pinned: true }, (tabs) => {
    for (const tab of tabs) {
      if (tab.url && tab.id != null) {
        const domain = getDomain(tab.url);
        pinnedDomains[tab.id] = domain;
        console.log(
          `PinStay: Initialized pinned tab ${tab.id} to domain ${domain}`
        );
      }
    }
  });

  // Set uninstall URL on startup - direct to Google Form
  const uninstallURL =
    "https://docs.google.com/forms/d/e/1FAIpQLSd5tLRhiwxR3LLYWB00dXW2xv55aXEKDwOjvDNnrgZqQjjTVQ/viewform?usp=header";
  chrome.runtime.setUninstallURL(uninstallURL);
  console.log("PinStay: Uninstall URL set on startup:", uninstallURL);
});

// 🧠 Also do it when extension is first installed or reloaded
chrome.runtime.onInstalled.addListener((details) => {
  // Show install page for new installations
  if (details.reason === "install") {
    chrome.tabs.create({
      url: chrome.runtime.getURL("install.html"),
      active: true,
    });
  }

  // Initialize existing pinned tabs
  chrome.tabs.query({ pinned: true }, (tabs) => {
    for (const tab of tabs) {
      if (tab.url && tab.id != null) {
        const domain = getDomain(tab.url);
        pinnedDomains[tab.id] = domain;
        console.log(
          `PinStay: Initialized pinned tab ${tab.id} to domain ${domain}`
        );
      }
    }
  });

  // Set uninstall URL - direct to Google Form
  const uninstallURL =
    "https://docs.google.com/forms/d/e/1FAIpQLSd5tLRhiwxR3LLYWB00dXW2xv55aXEKDwOjvDNnrgZqQjjTVQ/viewform?usp=header";
  chrome.runtime.setUninstallURL(uninstallURL);
  console.log("PinStay: Uninstall URL set:", uninstallURL);
});
