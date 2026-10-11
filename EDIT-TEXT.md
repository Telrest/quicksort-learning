# 修改网页文字 / Start by editing webpage text

网页：https://telrest.github.io/quicksort-learning/
Website: https://telrest.github.io/quicksort-learning/

## 改标题 / Change the heading

1. 打开 https://github.com/Telrest/quicksort-learning/blob/gh-pages/index.html ，点击铅笔图标编辑。
   Open https://github.com/Telrest/quicksort-learning/blob/gh-pages/index.html and click the pencil icon to edit.
2. 搜索 `小伙的快乐排序`，可以找到入口标题和进入后的标题：
   Search for `小伙的快乐排序` to find the entry heading and the heading inside:

```html
<h1 id="invite-title">小伙的快乐排序</h1>
<h1 id="page-title">小伙的快乐排序</h1>
```

只改中间的文字，保留 `<h1>` 和 `</h1>`。例如：
Change only the text between the tags. Keep `<h1>` and `</h1>`. For example:

```html
<h1>我的 C 程序实验室</h1>
```

入口下面的英文标题也可以修改：
The English heading below the entry title can also be changed:

```html
<p class="english-title">You’re invited.</p>
```

3. 点击 `Commit changes`，选择直接提交到 `gh-pages` 分支，再确认提交。等待 GitHub 更新后，刷新网页。
   Click `Commit changes`, select committing directly to `gh-pages`, and confirm. Refresh the webpage after GitHub updates it.

## 改说明文字 / Change descriptions

下面这样的行也采用相同方法：
Use the same method for lines like this:

```html
<p>输入数字直接排序，或一步步观察快排怎样处理它们。</p>
```

只替换 `<p>` 与 `</p>` 之间的文字。
Replace only the text between `<p>` and `</p>`.

先修改标题和说明就够了。暂时不用修改 `script`、`class`、`id` 或其他文件。
Start with headings and descriptions. You do not need to edit `script`, `class`, `id`, or other files yet.

设置邀请码请看 `SET-INVITE.md`。发布文件在 `gh-pages`；只改 `main` 分支的源文件不会立即修改在线网页。
For the invite code, see SET-INVITE.md. Published files are on gh-pages; editing source files only on main does not immediately update the live webpage.

进入后的专属标题取自邀请码配置中的 `title`，设置方法见 `SET-INVITE.md`。上面的 HTML 标题是默认文字。
The personalized heading after entry comes from title in the invite configuration; see SET-INVITE.md. The HTML heading above is the default text.
