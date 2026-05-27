# Root Grammar · 游戏化英语学习网站

面向 **rootgrammar.com** 的主站代码：**营销落地页 + 课程列表 + 可玩的连词成句练习**（参考 [julebu.ai](https://julebu.ai) 玩法，独立品牌与内容）。

整合说明见 **[docs/ROOTGRAMMAR.md](docs/ROOTGRAMMAR.md)**（与你现有的 `Movies/rootgrammar`、`root-grammar-deck` 如何分工）。

**一个人、路线 A（AI + 少花钱）** → 按 **[docs/ROUTE-A.md](docs/ROUTE-A.md)** 三步操作即可。

## 功能一览

| 模块 | 说明 |
|------|------|
| **首页** | 落地页、深色模式、滚动动画、数字统计动效 |
| **学习资源** `/learn` | 课程包列表、本地进度（得分、连续天数、完成标记） |
| **练习** `/practice/:lessonId` | 连词成句：逐词输入、连击加分、进度条、完成结算 |

## 练习玩法

1. 看到中文句子提示
2. 按顺序用键盘输入每个英文单词，按 **Enter** 确认
3. 连对累积连击，得分更高；输错清零连击
4. 完成整课后查看得分、正确率、最高连击

## 快速开始

```bash
npm install
npm run dev
```

- 首页：http://localhost:5173/
- 课程列表：http://localhost:5173/learn
- 直接试玩：http://localhost:5173/practice/beginner-01

```bash
npm run build    # 生产构建
npm run preview  # 预览构建结果
```

## 项目结构

```
src/
  pages/           HomePage, LearnPage, PracticePage
  components/      落地页组件 + practice/PracticeGame
  engine/          练习逻辑（校验、得分、连击）
  data/
    courses.ts     课程元数据
    lessons/       句子与词性数据（可自行扩展）
  context/         主题、本地学习进度
```

## 扩展课程

在 `src/data/lessons/` 新增课程文件，并在 `src/data/courses.ts` 中注册：

```ts
// lessons/my-lesson.ts
export const myLesson: Lesson = {
  id: "my-lesson",
  courseId: "beginner",
  title: "我的第一课",
  sentences: [
    {
      id: "s1",
      chinese: "你好。",
      words: [{ en: "Hello", ipa: "/həˈloʊ/", pos: "叹", cn: "你好" }],
    },
  ],
}
```

## 面向全球用户

- 界面支持 **EN / 中文**（右上角切换；默认按浏览器语言，非中文环境默认英文）
- 练习页、课程列表、导航已双语；首页营销区块中文为主（可继续扩展）
- 全球部署详细步骤见 **[docs/GLOBAL-LAUNCH.md](docs/GLOBAL-LAUNCH.md)**

**推荐组合**：GitHub → **Vercel** 部署 → **Cloudflare** 管 DNS → 绑定 `.com` 域名 → 接入 **Plausible** 统计

## 面向用户上线（部署）

当前是纯前端静态站，构建产物在 `dist/`，适合托管在 Vercel、Netlify、Cloudflare Pages 等。项目已包含 SPA 路由回退配置（`vercel.json`、`netlify.toml`、`public/_redirects`）。

### 方式一：Vercel（推荐，最简单）

1. 把代码推到 GitHub / GitLab
2. 打开 [vercel.com](https://vercel.com) → **Add New Project** → 导入仓库
3. 保持默认：Framework **Vite**，Build `npm run build`，Output `dist`
4. 点 **Deploy**，几分钟内得到 `https://你的项目.vercel.app`
5. **Settings → Domains** 绑定自己的域名（如 `learn.example.com`）

本地也可一条命令部署（需先 `npm i -g vercel` 并登录）：

```bash
npm run build && vercel --prod
```

### 方式二：Netlify

1. [netlify.com](https://www.netlify.com) → **Add new site** → 连接 Git 仓库  
2. Build command: `npm run build`，Publish directory: `dist`  
3. 部署后可在 **Domain management** 绑定自定义域名  

### 方式三：Cloudflare Pages

1. [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → Create → Connect Git  
2. Build: `npm run build`，Output: `dist`  
3. 适合已有 Cloudflare 域名，CDN 与 HTTPS 自动开启  

### 方式四：自己的服务器（Nginx）

```bash
npm run build
# 将 dist/ 目录上传到服务器，例如 /var/www/julebu
```

Nginx 示例：

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/julebu;
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

再用 [Certbot](https://certbot.eff.org/) 配置 HTTPS。

### 上线前检查清单

| 项 | 说明 |
|----|------|
| 本地构建 | `npm run build && npm run preview` 确认无报错 |
| 路由 | 直接访问 `/learn`、`/practice/beginner-01` 不应 404 |
| 品牌与文案 | 修改「句乐部」为你自己的产品名（若对外商用） |
| 法律页 | 对外运营建议补充真实的隐私政策、用户协议 |
| 备案 | 使用**中国大陆服务器 + 绑定 .cn 域名**时通常需要 ICP 备案；用 Vercel/海外 CDN + .com 域名可暂不备案，但需遵守当地法规 |
| 统计 | 可接入 [Plausible](https://plausible.io)、Google Analytics 或国内友盟等了解访问量 |

### 有用户账号之后

练习进度目前在浏览器 `localStorage`。若要跨设备同步，需要再加后端（如 Supabase、自建 API），届时在托管平台配置环境变量即可，无需改部署方式。

---

## 后续可扩展

- [ ] 用户注册 / 登录（对接 Supabase、Firebase 等）
- [ ] 间隔复习（SRS）算法
- [ ] AI 语法讲解
- [ ] 自定义课程编辑器
- [ ] 听写模式、挑战模式

## 说明

- 落地页图片为演示用本地副本
- 练习内容为原创示例句子，可自行替换
- 原站 [earthworm](https://github.com/cuixueshe/earthworm) 为同源开源项目，可参考其课程数据格式
