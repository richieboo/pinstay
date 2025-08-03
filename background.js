const pinnedDomains = {};

function getDomain(url) {
  try {
    return new URL(url).hostname;
  } catch (e) {
    return null;
  }
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!tab || !tab.pinned || !tab.url) return;

  const currentDomain = getDomain(tab.url);
  if (!(tabId in pinnedDomains)) {
    pinnedDomains[tabId] = currentDomain;
    console.log(`PinStay: Locked tab ${tabId} to domain ${currentDomain}`);
  }
});

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if (details.frameId !== 0) return;

  chrome.tabs.get(details.tabId, (tab) => {
    if (chrome.runtime.lastError || !tab || !tab.pinned) return;

    const allowedDomain = pinnedDomains[tab.id];
    const nextDomain = getDomain(details.url);

    if (allowedDomain && nextDomain && allowedDomain !== nextDomain) {
      console.warn(
        `PinStay: Preventing tab ${tab.id} from navigating to ${nextDomain}`
      );
      chrome.tabs.update(tab.id, { url: `https://${allowedDomain}` });

      // ✅ Inject alert into the page
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () =>
          alert("PinStay: you cannot navigate away from a pinned tab."),
      });
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

// 🧠 On startup, lock any currently pinned tabs
chrome.runtime.onStartup.addListener(() => {
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
});

// 🧠 Also do it when extension is first installed or reloaded
chrome.runtime.onInstalled.addListener(() => {
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
});
