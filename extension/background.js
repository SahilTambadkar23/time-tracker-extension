let currentDomain = '';
let startTime = Date.now();

chrome.tabs.onActivated.addListener(async (info) => {
  try {
    const tab = await chrome.tabs.get(info.tabId);
    if (tab.url) {
      trackTime(tab.url);
    }
  } catch (err) {
    console.warn('Tab activation error:', err);
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === 'complete' && tab.url) {
    trackTime(tab.url);
  }
});

function trackTime(url) {
  try {
    // Skip invalid or internal browser URLs
    if (!url.startsWith('http')) return;

    const domain = new URL(url).hostname;
    const now = Date.now();
    const duration = now - startTime;

    if (currentDomain) {
      chrome.storage.local.get([currentDomain], (result) => {
        const total = result[currentDomain] || 0;
        chrome.storage.local.set({ [currentDomain]: total + duration });

        // Send to backend
        fetch('http://localhost:5000/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ domain: currentDomain, duration })
        }).catch(console.error);
      });
    }

    currentDomain = domain;
    startTime = now;
  } catch (error) {
    console.warn('trackTime error:', error, 'URL was:', url);
  }
}
