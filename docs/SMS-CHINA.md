# 手机号验证码登录 — 配置说明

## 你需要完成的步骤

### 1. 运行 SQL（若还没跑）

Supabase → **SQL Editor** → 运行 `supabase/schema-phone.sql`

### 2. 获取服务器密钥（二选一，仅放 Vercel，不要放进网页）

Supabase 左侧 **Project Settings**（齿轮）→ **API Keys**：

**方式 A（新版界面，你当前这种）**

1. 停留在 **Publishable and secret API keys** 标签
2. 往下找到 **Secret keys** → **default** → 点眼睛图标 **Reveal**
3. 复制以 `sb_secret_` 开头的整串
4. 在 Vercel 里变量名填：`SUPABASE_SERVICE_ROLE_KEY`（值就贴这个 secret）

**方式 B（旧版名称 service_role）**

1. 点上方第二个标签：**Legacy anon, service_role API keys**
2. 找到 **service_role** → **Reveal**
3. 复制以 `eyJ` 开头的长 JWT
4. 同样放进 Vercel 的 `SUPABASE_SERVICE_ROLE_KEY`

⚠️ 不管是 `sb_secret_` 还是 `service_role`，权限都很高，**只能**放在 Vercel / 本地 `vercel dev`，不要写进前端 `.env` 里给 Vite 用。

### 3. Vercel 环境变量

在现有变量基础上增加：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` service_role | 仅服务端 |
| `SMS_DEV_MODE` | `true` | 测试阶段：验证码显示在页面上 |
| `OTP_SECRET` | 随机长字符串 | 可选，用于加密验证码 |

上线前把 `SMS_DEV_MODE` 改为 `false`，并接入真实短信（见下文）。

### 4. 本地测试（两个终端）

终端 1：

```bash
cd /Users/danny/rootwebsite
npx vercel dev --listen 3000
```

终端 2：

```bash
npm run dev
```

打开 http://localhost:5173/auth → **手机号** → 获取验证码 → 页面上会显示开发模式验证码 → 登录

`.env.local` 里也要有 `SUPABASE_SERVICE_ROLE_KEY`（本地 vercel dev 会读）。

---

## 正式上线：接入阿里云短信（推荐）

1. 注册 [阿里云](https://www.aliyun.com/) → 开通 **短信服务**
2. 申请 **签名**（如「RootGrammar」）和 **模板**（验证码模板，含 `{code}` 变量）
3. 创建 AccessKey，在 Vercel 添加：

| 变量 | 说明 |
|------|------|
| `ALIYUN_ACCESS_KEY_ID` | AccessKey ID |
| `ALIYUN_ACCESS_KEY_SECRET` | Secret |
| `ALIYUN_SMS_SIGN_NAME` | 已审核签名 |
| `ALIYUN_SMS_TEMPLATE_CODE` | 模板 CODE |
| `SMS_DEV_MODE` | `false` |

4. 在 `api/send-otp.ts` 的 `if (!devMode)` 分支接入阿里云 SDK（可让 Cursor 按你的模板代码生成）

费用：约 **0.03–0.05 元/条**，按量计费。

腾讯云短信流程类似。

---

## 流程说明

```
用户输入手机号 → /api/send-otp → 存验证码哈希 → 发短信
用户输入 6 位码 → /api/verify-otp → 校验 → 创建/查找 Supabase 用户 → 返回 session
网页 setSession → 已登录，进度同步云端
```

---

## 常见问题

| 问题 | 处理 |
|------|------|
| 获取验证码没反应 | 本地是否同时运行了 `vercel dev` |
| 保存验证码失败 | 是否运行了 `schema-phone.sql` |
| 登录失败 create session | 检查 `SUPABASE_SERVICE_ROLE_KEY` 是否正确 |
| 真机收不到短信 | `SMS_DEV_MODE` 须为 `false` 且阿里云模板已审核通过 |
