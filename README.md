# Wix 风格个人主页（纯静态，适合 GitHub Pages）

这是一个不需要后端的个人主页模板，结构与常见的 Wix 个人简历/作品集类似：横幅、关于、项目、服务、评价、联系。

## 在线预览方式
直接把整个目录上传到 GitHub 的仓库，然后打开 GitHub Pages：
1. 创建一个公开仓库：
   - **用户名.github.io**（用户页），或任意名（项目页）。
2. 把仓库的 **Settings → Pages** 打开，Source 选 **Deploy from a branch**，Branch 选 **main / 根目录**，保存。
3. 等待几分钟，访问 `https://用户名.github.io/`（或项目页 `https://用户名.github.io/仓库名/`）。

> 如果是项目页，请在 `Settings → Pages → Build and deployment → Branch` 选择 `main` 和 `/ (root)`。

## 自定义内容
- 修改 `index.html` 文案、链接、项目卡片、头像图片等。
- 把你的 `assets/cv.pdf` 放进去，主页“下载简历”按钮会自动工作。
- 联系表单默认用 Formspree：把 `action="https://formspree.io/f/your-id"` 里的 `your-id` 替换为你的表单 ID。

## 开发建议
- 这是纯 HTML/CSS/JS，可以直接用。不需要 Node、构建或后端。
- 若需要博客/多页路由/MD 内容，建议改用 Astro / Jekyll / Hugo 等静态站点工具。

## 目录结构
```
.
├─ index.html
├─ styles.css
├─ script.js
└─ assets/
   ├─ images/
   └─ cv.pdf  (可选)
```

## 许可证
MIT
