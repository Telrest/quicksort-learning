"use strict";

const form = document.getElementById("partition-form");
const input = document.getElementById("numbers");
const runButton = document.getElementById("run");
const statusLabel = document.getElementById("status");
const errorLabel = document.getElementById("error");
const result = document.getElementById("result");
const pivotLabel = document.getElementById("pivot-label");
const positionLabel = document.getElementById("position");
let runtime;

// JavaScript 负责界面，C 负责分组 / JavaScript handles the UI; C partitions.
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!runtime) return;
  errorLabel.hidden = true;
  pivotLabel.hidden = true;
  positionLabel.hidden = true;
  result.replaceChildren();

  const text = input.value.replace(/[,，]/g, " ").replace(/\s+/g, " ");
  if (!/^[0-9+\- ]*$/.test(text)) {
    showError("请输入整数，用空格、换行或逗号分隔。 / Enter integers separated by spaces, newlines, or commas.");
    return;
  }
  try {
    const pos = runtime.ccall("run_partition", "number", ["string"], [text]);
    const errors = {
      "-1": "请至少输入一个整数。 / Enter at least one integer.",
      "-2": "请输入整数，用空格、换行或逗号分隔。 / Enter integers separated by spaces, newlines, or commas.",
      "-3": "最多输入 1024 个整数。 / Enter no more than 1,024 integers.",
      "-4": "每个整数需要在 -2147483648 到 2147483647 之间。 / Each integer must be between -2147483648 and 2147483647.",
      "-5": "暂时无法显示结果，请减少数字数量。 / Unable to display the result; try fewer numbers."
    };
    if (pos < 0) {
      showError(errors[pos] || "运行失败，请重新尝试。 / The run failed. Please try again.");
      return;
    }
    const values = runtime.ccall("get_result", "string", [], []).split(" ");
    const pivot = runtime.ccall("get_pivot", "number", [], []);
    for (let index = 0; index < values.length; index++) {
      const chip = document.createElement("span");
      chip.className = "number " + (index < pos ? "left" : index === pos ? "pivot" : "right");
      chip.textContent = values[index];
      chip.title = `下标 / Index: ${index}${index === pos ? " · 基准 / Pivot" : ""}`;
      result.appendChild(chip);
    }
    pivotLabel.textContent = `基准 / Pivot: ${pivot}`;
    positionLabel.textContent = `基准最终下标：${pos}（从 0 开始） / Final pivot index: ${pos} (starting at 0)`;
    pivotLabel.hidden = false;
    positionLabel.hidden = false;
  } catch (error) {
    showError("程序运行失败，请刷新页面后重试。 / The program failed. Refresh the page and try again.");
    console.error(error);
  }
});

document.getElementById("example").addEventListener("click", () => {
  input.value = "3 1 5 2 6 4";
  errorLabel.hidden = true;
  pivotLabel.hidden = true;
  positionLabel.hidden = true;
  const message = document.createElement("p");
  message.className = "placeholder";
  message.textContent = "点击“运行分组”查看结果。 / Click “Run partition” to see the result.";
  result.replaceChildren(message);
  input.focus();
});

function showError(message) {
  errorLabel.textContent = message;
  errorLabel.hidden = false;
}

async function initialize() {
  try {
    runtime = await createPartitionModule();
    runButton.disabled = false;
    statusLabel.textContent = "就绪 / Ready";
  } catch (error) {
    statusLabel.textContent = "加载失败 / Load failed";
    showError("程序未能加载，请刷新页面后重试。 / The program could not load. Refresh the page and try again.");
    console.error(error);
  }
}

initialize();
