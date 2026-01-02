function normalizeUrl(input) {
  if (!input) return "";
  const value = input.trim();

  // If protocol is provided, keep it
  if (/^https?:\/\//i.test(value)) return value;

  // If it's an IPv4, default to http
  const isIPv4 = /^\d{1,3}(\.\d{1,3}){3}$/.test(value);
  if (isIPv4) return "http://" + value;

  // Otherwise treat as domain and default to https
  return "https://" + value;
}

const input = document.getElementById("url");
chrome.storage.sync.get(["redirectUrl"], r => r.redirectUrl && (input.value = r.redirectUrl));
document.getElementById("save").onclick = () => {
  chrome.storage.sync.set({ redirectUrl: normalizeUrl(input.value) }, () => alert("저장됨"));
};
