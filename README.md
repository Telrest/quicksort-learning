# 快速排序——learning / Quicksort learning

这是你的 C 快排程序的网页版本：完整排序使用 `test3.c` 的递归逻辑，排序过程使用 `test4.c` 每次分组后的数组状态。也保留一轮分组模式。
This web version uses the recursive quicksort logic from `test3.c` and the post-partition array states from `test4.c` for visualization. One-partition mode is also available.

选择“完整排序”直接得到升序结果；选择“排序过程”后点击运行，再播放、暂停、查看前后步骤或拖动进度条。中间步骤标出当前范围和基准，最后显示完整结果。
Choose Full sort for an ascending result. In Visualization mode, run first, then play, pause, step backward or forward, or drag the timeline. Intermediate steps highlight the current range and pivot; the last step shows the sorted result.

排序和一轮分组最多支持 1024 个 32 位有符号整数，可视化最多 64 个数。每个中间步骤对应一次分组结束，不记录每次比较或交换。柱高按输入范围缩放，负数与重复值也可以使用。
Sorting and one-partition mode support up to 1,024 signed 32-bit integers; visualization supports up to 64. Each intermediate step shows a completed partition rather than individual comparisons or swaps. Bar heights are scaled to the input range; negative numbers and duplicates are supported.

## 文件 / Files

- `src/algorithm.c`：你的分组逻辑，加上网页输入和结果接口。 / Your partition logic plus web input and result functions.
- `public/index.html`：输入框、按钮和结果区域。 / Input, buttons, and the result area.
- `public/style.css`：网页外观。 / Page appearance.
- `public/app.js`：把网页输入交给 C，再显示 C 返回的结果。 / Pass webpage input to C and display its result.
- `build.ps1`：生成可发布的网页文件。 / Build the publishable web files.

## 本地构建 / Local build

本机的专用工具放在工作区的 `work/web-c-tools` 中，没有改动系统 PATH。运行 `build-local.ps1` 可使用它们：
This machine's dedicated tools are in the workspace's `work/web-c-tools`, without changing the system PATH. Use them with:

```powershell
.\build-local.ps1
```

安装并激活官方 Emscripten 后，在这个文件夹运行：
After installing and activating official Emscripten, run in this folder:

```powershell
.\build.ps1
```

也可以使用 `-EmccPath` 指定 `emcc.bat` 的完整路径。项目不需要 npm 包。
You can also use `-EmccPath` to specify the full path to `emcc.bat`. No npm packages are required.

## 预览 / Preview

在 `dist` 文件夹启动 HTTP 服务，然后通过浏览器访问。不要直接双击 HTML 文件：浏览器需要通过 HTTP 加载 `.wasm`。
Start an HTTP server in `dist` and open it in a browser. Do not double-click the HTML: browsers need HTTP to load `.wasm` reliably.

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

打开 `http://127.0.0.1:8765`。输入 `3 1 5 2 6 4`，完整排序结果为 `1 2 3 4 5 6`；一轮分组结果为 `3 1 2 4 6 5`，基准 `4` 放到下标 `3`。
Open `http://127.0.0.1:8765`. Input `3 1 5 2 6 4`: Full sort gives `1 2 3 4 5 6`; One partition gives `3 1 2 4 6 5`, placing pivot `4` at index `3`.

## 发布到 GitHub Pages / Publish to GitHub Pages

网页地址：https://telrest.github.io/quicksort-learning/ 。独立仓库 `Telrest/quicksort-learning` 的 `main` 分支保存项目源码，`gh-pages` 分支根目录保存发布文件。
Website: https://telrest.github.io/quicksort-learning/. The separate repository `Telrest/quicksort-learning` stores project source on `main` and published files at the root of `gh-pages`.

发布文件为 `index.html`、`style.css`、`app.js`、`partition.js`、`partition.wasm` 和 `.nojekyll`。Pages 设置为 `Deploy from a branch` → `gh-pages` → `/ (root)`。
Published files are `index.html`, `style.css`, `app.js`, `partition.js`, `partition.wasm`, and `.nojekyll`. Pages uses `Deploy from a branch` → `gh-pages` → `/ (root)`.

网页里实际使用的 C 源码也保存在发布分支的 `source/algorithm.c` 中。
The C source used by the webpage is also saved as `source/algorithm.c` on the publication branch.

只修改文字请先看 `EDIT-TEXT.md`。在线修改文字后，本地 `public/index.html` 不会自动同步；以后重新构建发布前，需要把在线修改同步到本地，避免覆盖它们。
For text-only changes, see `EDIT-TEXT.md`. Online edits do not automatically update local `public/index.html`; sync those edits before rebuilding and publishing later so they are preserved.

发布后访问者只需要浏览器，不需要 GCC、Emscripten 或 VS Code。
After publication, visitors only need a browser, not GCC, Emscripten, or VS Code.

## 网页怎样调用 C / How the webpage calls C

```text
输入框 / Input field
    ↓ JavaScript 读取文字 / JavaScript reads the text
run_sort(text, trace) 或 run_partition(text) — C 函数 / C functions
    ↓ 排序或分组，按需记录步骤 / Sort or partition, optionally recording steps
get_result() / get_trace_frame(index) — C 函数 / C functions
    ↓ 返回结果或某一步的数组 / Return the result or an array snapshot
网页显示结果 / The webpage displays the result
```

网页按钮触发函数调用，C 不再通过 `scanf` 等待终端输入。你原来的练习文件保持不变。
The webpage button triggers the function call. C no longer waits for terminal input through `scanf`. Your original exercise file remains unchanged.
