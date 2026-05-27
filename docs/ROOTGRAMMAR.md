# Root Grammar 项目整合说明

你目前和 Root Grammar 相关的代码大致有三块：

| 项目 | 路径 | 作用 | 建议 |
|------|------|------|------|
| **主站（推荐上线）** | `rootwebsite/` | 营销站 `/` + 产品区 `/app` + 练习 `/app/practice` | 部署到 **rootgrammar.com** |
| 早期静态站 | `Movies/rootgrammar/` | 单页 HTML + 内嵌造句 demo | 可归档，功能已被主站覆盖 |
| 语法地图 | `root-grammar-deck/` | Next.js 语法宇宙可视化 | 可作子产品：`map.rootgrammar.com` 或日后合并路由 |

## 部署 rootgrammar.com

当前域名若显示 **Cloudflare 522**，通常是：DNS 已指向 Cloudflare，但**源站未配置**或源站宕机。

### 推荐做法（全球用户）

1. 将 **`rootwebsite`** 推到 GitHub 仓库（例如 `rootgrammar`）
2. [Vercel](https://vercel.com) Import 该仓库 → Deploy
3. Vercel → **Settings → Domains** → 添加 `rootgrammar.com` 和 `www.rootgrammar.com`
4. Cloudflare DNS（若域名在 CF）：
   - `www` → CNAME → `cname.vercel-dns.com`（以 Vercel 面板为准）
   - 根域名 `@` → Vercel 提供的 A 记录或 CNAME flattening
5. Cloudflare SSL：**Full (strict)**，等待 522 消失

构建命令：`npm run build`  
输出目录：`dist`

### 本地验证

```bash
cd rootwebsite
npm run dev
# 产品区: http://localhost:5173/app
# 练习: http://localhost:5173/app/practice/beginner-01
```

## 品牌与存储 key

- 界面品牌：**Root Grammar**（中英文一致）
- 学习进度存在 `localStorage` 键 `julebu-progress`（历史命名，可后续改为 `rootgrammar-progress`）

## 与语法地图 (root-grammar-deck) 联动（可选）

未来可在主站导航增加「语法地图」，链接到：

- 独立部署：`https://map.rootgrammar.com`（再部署一个 Vercel 项目指向 `root-grammar-deck`）
- 或把 Next 应用迁到 monorepo，路由 `/map`

## 弃用 Movies/rootgrammar 时

若主站已上线，静态站仅作备份；勿同时部署两个不同版本到同一域名，避免用户困惑。
