# 先学修改网页文字 / Start by editing webpage text

网页：https://telrest.github.io/quicksort-learning/
Website: https://telrest.github.io/quicksort-learning/

## 改标题 / Change the heading

1. 打开 https://github.com/Telrest/quicksort-learning/blob/gh-pages/index.html ，点击铅笔图标编辑。
   Open https://github.com/Telrest/quicksort-learning/blob/gh-pages/index.html and click the pencil icon to edit.
2. 搜索 `让代码走出终端。`，找到这一行：
   Search for `让代码走出终端。` to find this line:

```html
<h1>让代码走出终端。</h1>
```

只改中间的文字，保留 `<h1>` 和 `</h1>`。例如：
Change only the text between the tags. Keep `<h1>` and `</h1>`. For example:

```html
<h1>我的 C 程序实验室</h1>
```

下面的英文标题在这一行，也可以修改：
The English heading below it is on this line and can also be changed:

```html
<p class="english-title">My C programming lab.</p>
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
