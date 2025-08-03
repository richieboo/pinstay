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

chrome.tabs.onRemoved.addListener((tabId) => {
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
