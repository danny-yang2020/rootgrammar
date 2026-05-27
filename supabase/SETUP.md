# Supabase 设置（第二步）

## 1. 开启邮箱登录

Supabase 项目 → **Authentication** → **Providers** → **Email** → 开启 **Enable Email provider**

（可选）**Authentication** → **URL Configuration**：

- Site URL: `https://www.rootgrammar.com`
- Redirect URLs: `https://www.rootgrammar.com/**` 和 `http://localhost:5173/**`

## 2. 运行数据库脚本

**SQL Editor** → New query → 粘贴 `schema.sql` 全部内容 → **Run**

## 3. 环境变量

在 Supabase **Project Settings → General** 复制 **Project URL**（形如 `https://xxxx.supabase.co`）

本地 `.env.local`：

```env
VITE_SUPABASE_URL=https://你的项目.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_你的key
```

Vercel → Settings → Environment Variables → 添加同名变量 → **Redeploy**

## 4. 手机号登录（中国大陆）

运行 `schema-phone.sql`，配置 `SUPABASE_SERVICE_ROLE_KEY` 与 `SMS_DEV_MODE`。  
详见 **[docs/SMS-CHINA.md](../docs/SMS-CHINA.md)**。

## 5. API Key 说明

| 在 Supabase 里叫什么 | 放在哪 | 用途 |
|---------------------|--------|------|
| **Publishable** `sb_publishable_...` | Vercel：`VITE_SUPABASE_PUBLISHABLE_KEY` | 网页前端 |
| **Secret** `sb_secret_...` 或 Legacy 的 **service_role** `eyJ...` | Vercel：`SUPABASE_SERVICE_ROLE_KEY` | 仅服务器（发短信、登录） |

找不到 service_role 时：点 **API Keys** 页第二个标签 **Legacy anon, service_role API keys**，或直接用 **Secret keys** 里的 `sb_secret_`。

## 6. 线上排错

部署后打开（应返回 JSON，不是网页）：

`https://www.rootgrammar.com/api/health`

应看到：`supabaseUrlValid: true`、`hasServiceKey: true`。

**Value 只填网址本身**，例如 `https://vrqugaxmximijkiuujpl.supabase.co`  
不要填成 `VITE_SUPABASE_URL=https://...` 整行，也不要加引号。

若登录页仍显示黄色 **Configure Supabase**：说明前端构建时没有 `VITE_*` 变量 → Vercel **Deployments → Redeploy**（改环境变量后必须重新部署）。

若 **Send code** 报错：先检查 `/api/health`；再确认已 push 最新代码（含 `api/` 目录）。
