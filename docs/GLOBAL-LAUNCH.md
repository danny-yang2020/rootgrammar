# 面向全球用户上线指南

## 推荐技术栈

| 层级 | 推荐 | 原因 |
|------|------|------|
| 托管 | **Vercel** 或 **Cloudflare Pages** | 全球边缘节点、自动 HTTPS、免费额度够用 |
| DNS / CDN | **Cloudflare** | 任意注册商买的域名都可接入，DDoS 防护 |
| 域名 | **.com** / **.app** / **.co** | 国际用户认知度高，无需中国 ICP 备案 |
| 分析 | **Plausible** 或 **Cloudflare Web Analytics** | 轻量、欧盟 GDPR 友好 |
| 邮件（以后） | Resend / SendGrid | 全球送达率好 |

## 5 步上线

### 1. 构建自检

```bash
npm run build && npm run preview
```

确认 `/`、`/learn`、`/practice/beginner-01` 在预览环境均正常。

### 2. 推送到 GitHub

```bash
git init
git add .
git commit -m "Initial release"
git remote add origin git@github.com:YOUR_USER/YOUR_REPO.git
git push -u origin main
```

### 3. 部署到 Vercel

1. [vercel.com](https://vercel.com) → Import Git Repository  
2. Framework: **Vite**，Build: `npm run build`，Output: `dist`  
3. Deploy → 获得 `*.vercel.app` 预览地址  

### 4. 绑定域名（Cloudflare 示例）

1. 在 [Cloudflare](https://dash.cloudflare.com) 添加站点 `yourdomain.com`  
2. 按提示把域名的 NS 记录改为 Cloudflare  
3. DNS 添加 CNAME：`www` → `cname.vercel-dns.com`（以 Vercel 面板显示为准）  
4. Vercel → Project → Domains → 添加 `yourdomain.com` 和 `www.yourdomain.com`  

### 5. 面向全球的产品与合规

- **界面语言**：站点已支持 EN / 中文切换（默认按浏览器语言，可手动切换）  
- **隐私**：在 `/privacy` 提供英文 Privacy Policy（欧盟用户需要）  
- **Cookie**：已有同意横幅；若接入 Google Analytics，需在拒绝时不加载脚本  
- **条款**：Terms of Service 英文版  
- **支付（以后）**：Stripe 覆盖大多数国家；中国大陆用户可单独接微信支付  

## 性能与 SEO

- 静态资源已由 Vercel / Cloudflare 自动 CDN 缓存  
- `index.html` 含基础 meta；可按语言扩展 `hreflang`  
- 可选：在 Vercel 项目设置 **Function Region** 为离用户最近的区域（默认已全球分布）  

## 不建议（全球场景）

- 仅部署在中国大陆机房且无备案的 .cn 域名  
- 仅中文 UI、无英文（海外用户流失高）  
- 把用户学习数据只放 localStorage 却宣传「云同步」（需后端后再说）  

## 环境变量（未来扩展）

在 Vercel → Settings → Environment Variables 添加，例如：

```
VITE_API_URL=https://api.yourdomain.com
VITE_PLAUSIBLE_DOMAIN=yourdomain.com
```

代码中用 `import.meta.env.VITE_API_URL` 读取。
