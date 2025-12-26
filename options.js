const input = document.getElementById("url");
chrome.storage.sync.get(["redirectUrl"], r => r.redirectUrl && (input.value = r.redirectUrl));
document.getElementById("save").onclick = () => {
  chrome.storage.sync.set({ redirectUrl: input.value }, () => alert("저장됨"));
};
