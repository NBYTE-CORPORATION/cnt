chrome.storage.sync.get(["redirectUrl"], (res) => {
  const card = document.getElementById("card");

  if (!res.redirectUrl) {
    card.innerHTML += `
      <p class="desc">새탭을 열면 설정한 주소로 바로 이동합니다.</p>
      <input id="url" placeholder="https://linkhub.nbyte.xyz"/>
      <button class="primary" id="save">저장</button>
    `;

    document.getElementById("save").onclick = () => {
      const url = document.getElementById("url").value;
      if (!url.startsWith("http")) return alert("https:// 포함해서 입력하세요");
      chrome.storage.sync.set({ redirectUrl: url }, () => location.reload());
    };
  } else {
    const domain = res.redirectUrl.replace(/^https?:\/\//, "");
    card.innerHTML += `
      <p class="desc">${domain} 로 이동합니다</p>
      <button class="ghost" id="settings" style="display:none;">설정 변경</button>
    `;

    setTimeout(() => location.replace(res.redirectUrl), 100);
    document.getElementById("settings").onclick = () =>
      chrome.runtime.openOptionsPage();
  }
});
