// Load tracked data
chrome.storage.local.get(null, (data) => {
  const list = document.getElementById('data-list');
  Object.keys(data).forEach(domain => {
    const li = document.createElement('li');
    li.textContent = `${domain}: ${(data[domain] / 1000 / 60).toFixed(2)} mins`;
    list.appendChild(li);
  });
});

// Add event to open the dashboard
document.getElementById('open-dashboard').addEventListener('click', () => {
  chrome.tabs.create({ url: 'http://localhost:5173' }); // Or deployed URL
});
