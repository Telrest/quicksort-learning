# 设置邀请码和专属标题 / Set invite codes and personalized titles

你要求先留空，所以目前列表为 `[]`，正常入口关闭。设置一个或多个邀请码后就可以进入。
The list is currently [] as you requested, so normal entry is closed. Add one or more invite codes to enable entry.

1. 打开 https://github.com/Telrest/quicksort-learning/blob/gh-pages/invite-config.json ，点击铅笔图标。
   Open https://github.com/Telrest/quicksort-learning/blob/gh-pages/invite-config.json and click the pencil icon.
2. 按下面格式填写你自己的邀请码和对应标题：
   Enter your own codes and corresponding titles using this format:

```json
{
  "invites": [
    { "code": "436721", "title": "给小张的排序实验室" },
    { "code": "008899", "title": "小李，来排个序吧！" }
  ]
}
```

以上只是示例，没有作为真实配置发布。`code` 是邀请码，`title` 是输入这个邀请码后显示的标题，同时用于浏览器标签页标题。
These are examples only and are not published as real configuration. code is the invite code; title is the heading shown after entering that code, and is also used for the browser tab title.

邀请码必须不同。数字也保留在双引号中，所以 `008899` 的开头两个 `0` 不会丢失。大小写区分，空格也按原样比较。
Every code must be different. Keep numbers inside quotation marks, so the leading zeros in 008899 are preserved. Codes are case-sensitive and spaces are compared exactly.

保留双引号、方括号和花括号。两条记录之间需要逗号，最后一条后面不要加逗号。标题只填写文字，不需要 HTML 标签。
Keep the quotation marks and brackets. Put a comma between entries, but not after the last entry. Titles are plain text and do not need HTML tags.

3. 点击 Commit changes，提交到 gh-pages 分支。等待发布完成后，点击网页上的“刷新网页”。
   Click Commit changes and commit to gh-pages. After publication finishes, click Refresh page on the website.
4. 分别把网页链接和对应邀请码发给你的朋友。每次重新打开页面都需要输入邀请码。
   Share the website link and the matching code with each friend. Every new page load requires entering a code.

删除某条记录就取消那个邀请码；把列表设回 `[]` 则关闭正常入口。只修改 main/public/invite-config.json 不会直接更新在线网页。
Remove an entry to revoke that code; set the list back to [] to close normal entry. Editing only main/public/invite-config.json does not directly update the live webpage.

这是浏览器中的简单入口，配置文件公开可读，也可以绕过入口。它适合作为体验门槛，不能保护敏感信息。
This is a simple browser gate: the configuration is publicly readable and the gate can be bypassed. It is a casual entry barrier, not protection for sensitive information.

## 查看最新版本 / View the latest version

网页：https://telrest.github.io/quicksort-learning/ 。开发者访问也使用发布后的网页，而不是直接读取 main 中的源码。
Website: https://telrest.github.io/quicksort-learning/. Developers also receive the deployed page rather than source files on main.

GitHub Pages 构建和浏览器/CDN 缓存都可能让更新暂时不可见。先确认网址是 quicksort-learning，再点击“刷新网页”，或在 Windows 浏览器按 Ctrl + F5。
GitHub Pages deployment and browser/CDN caching can delay visible updates. First check that the URL is for quicksort-learning, then click Refresh page or press Ctrl + F5 in a Windows browser.

完整排序和排序过程是两个模式；进入后在“选择功能”中选择“排序过程”，再点击“运行”，就会出现可视化。
Full sorting and visualization are separate modes. After entry, choose Visualization under Choose a mode and click Run to see the process.
