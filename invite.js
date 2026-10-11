"use strict";

// 简单的浏览器入口，不提供服务端权限控制。
// A simple browser gate, not server-side access control.
(() => {
  const form = document.getElementById("invite-form");
  const field = document.getElementById("invite-code");
  const button = document.getElementById("invite-submit");
  const error = document.getElementById("invite-error");
  const status = document.getElementById("invite-status");
  let ready = false;
  let busy = false;

  for (const control of document.querySelectorAll("[data-refresh]")) {
    control.addEventListener("click", () => {
      const next = new URL(window.location.href);
      next.searchParams.set("reload", Date.now().toString());
      window.location.replace(next.href);
    });
  }

  async function readConfig() {
    const response = await fetch(`./invite-config.json?reload=${Date.now()}`, {cache: "no-store"});
    if (!response.ok) throw new Error("Config unavailable");
    const config = await response.json();
    if (!Array.isArray(config.invites)) throw new Error("Invalid configuration");
    const codes = new Set();
    for (const entry of config.invites) {
      if (!entry || typeof entry.code !== "string" || !entry.code.trim() || entry.code.length > 128 ||
          typeof entry.title !== "string" || !entry.title.trim() || codes.has(entry.code)) {
        throw new Error("Invalid invite entry");
      }
      codes.add(entry.code);
    }
    return config.invites;
  }

  function showUnset() {
    ready = false;
    field.disabled = true;
    status.textContent = "作者尚未设置邀请码，请稍后再来。 / The author has not set an invite code yet. Please check back later.";
  }

  async function loadScript(path) {
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = path;
      script.onload = resolve;
      script.onerror = () => { script.remove(); reject(new Error("Program unavailable")); };
      document.head.appendChild(script);
    });
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!ready || busy) return;
    busy = true;
    button.disabled = true;
    button.textContent = "验证中 / Checking…";
    error.hidden = true;
    try {
      const invites = await readConfig();
      if (!invites.length) { showUnset(); return; }
      const matched = invites.find((entry) => entry.code === field.value);
      if (!matched) {
        error.textContent = "邀请码不正确，请检查后重试。 / Incorrect invite code. Please check and try again.";
        error.hidden = false;
        field.select();
        return;
      }
      await loadScript("./partition.js?v=invite4");
      await loadScript("./app.js?v=clean-label");
      // 只显示文字，邀请码对应的标题不作为 HTML 执行。
      // Display the matched title as text, never as executable HTML.
      document.getElementById("page-title").textContent = matched.title;
      document.title = matched.title + " · Quicksort";
      field.value = "";
      document.getElementById("playground").hidden = false;
      document.getElementById("invite-gate").hidden = true;
      document.getElementById("numbers").focus();
    } catch {
      error.textContent = "暂时无法加载，请点击“刷新网页”后重试。 / Unable to load right now. Click Refresh page and try again.";
      error.hidden = false;
    } finally {
      busy = false;
      button.disabled = !ready;
      button.textContent = "进入网页 / Enter";
    }
  });

  (async () => {
    try {
      const invites = await readConfig();
      if (!invites.length) { showUnset(); return; }
      ready = true;
      field.disabled = false;
      button.disabled = false;
      status.textContent = "请输入邀请码。 / Please enter your invite code.";
    } catch {
      status.textContent = "入口加载失败，请点击“刷新网页”。 / Entry failed to load. Click Refresh page.";
    }
  })();
})();
