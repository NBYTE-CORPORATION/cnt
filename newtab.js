function normalizeUrl(input) {
  if (!input) return "";
  const value = input.trim();

  // keep full URL as-is
  if (/^https?:\/\//i.test(value)) return value;

  // IPv4 -> http
  const isIPv4 = /^\d{1,3}(\.\d{1,3}){3}$/.test(value);
  if (isIPv4) return "http://" + value;

  // domain -> https
  return "https://" + value;
}

function showForm() {
  const form = document.getElementById("formWrap");
  const status = document.getElementById("statusWrap");
  if (form) form.style.display = "block";
  if (status) status.style.display = "none";
}

function showStatus(text) {
  const form = document.getElementById("formWrap");
  const status = document.getElementById("statusWrap");
  if (form) form.style.display = "none";
  if (status) {
    status.style.display = "block";
    status.textContent = text || "이동 중…";
  }
}

function enterConfiguredMode() {
  document.documentElement.classList.add("has-redirect");
}

function go(url) {
  setTimeout(() => location.replace(url), 550);
}

chrome.storage.sync.get(["redirectUrl"], (res) => {
  const input = document.getElementById("url");
  const saveBtn = document.getElementById("save");

  if (res.redirectUrl) {
    // already configured: hide guide, center, show status, redirect
    enterConfiguredMode();
    showStatus("설정한 주소로 이동 중…");
    go(res.redirectUrl);
    return;
  }

  // first time
  showForm();

  saveBtn.addEventListener("click", () => {
    const url = normalizeUrl(input.value);
    if (!url) return;

    chrome.storage.sync.set({ redirectUrl: url }, () => {
      // after saving: hide guide + form, show status, redirect
      enterConfiguredMode();
      showStatus("저장 완료! 이동 중…");
      go(url);
    });
  });
});
