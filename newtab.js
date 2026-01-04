function normalizeUrl(input) {
  if (!input) return "";
  const v = input.trim();
  if (/^https?:\/\//i.test(v)) return v;
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(v)) return "http://" + v;
  return "https://" + v;
}

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("url");
  const save = document.getElementById("save");
  const form = document.getElementById("formWrap");
  const status = document.getElementById("statusWrap");
  const guide = document.getElementById("guideCard");

  chrome.storage.sync.get(["redirectUrl"], (res) => {
    if (res.redirectUrl && location.pathname.includes("newtab")) {
      if (guide) guide.style.display = "none";
      form.style.display = "none";
      status.style.display = "block";
      status.textContent = "설정한 주소로 이동 중…";
      setTimeout(() => location.replace(res.redirectUrl), 500);
    }
  });

  
  input?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      save?.click();
    }
  });

  save?.addEventListener("click", () => {
    const url = normalizeUrl(input.value);
    if (!url) return;

    chrome.storage.sync.set({ redirectUrl: url }, () => {
      if (guide) guide.style.display = "none";
      form.style.display = "none";
      status.style.display = "block";
      status.textContent = "저장되었습니다. 이동 중…";

      if (location.pathname.includes("newtab")) {
        setTimeout(() => location.replace(url), 500);
      }
    });
  });
});
