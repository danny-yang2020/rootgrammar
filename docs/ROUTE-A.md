# 路线 A 操作手册（一个人 + AI + 有限预算）

你不需要会写代码。按顺序做完下面三步，网站就能面向全球用户；后面注册和词书交给 AI 在 Cursor 里改。

---

## 你需要准备的账号（全部有免费档）

| 账号 | 用途 | 注册地址 |
|------|------|----------|
| GitHub | 存代码，Vercel 从这儿拉代码 | https://github.com |
| Vercel | 托管网站（全球 CDN） | https://vercel.com |
| Cloudflare | 管 rootgrammar.com 的 DNS | 你已有 |
| Supabase | 注册登录、数据库、上传词书（第 2 步再用） | https://supabase.com |

---

## 第一步：让 rootgrammar.com 能打开（约 1 小时）

### 1.1 把代码放到 GitHub

在 Cursor 里打开终端，**整段复制**运行（把 `你的用户名` 改成你的 GitHub 用户名）：

```bash
cd /Users/danny/rootwebsite
git init
git add .
git commit -m "Root Grammar initial site"
```

然后在 GitHub 网页：**New repository** → 名字例如 `rootgrammar` → 不要勾选 README → 创建。

GitHub 会显示推送命令，类似：

```bash
git remote add origin git@github.com:你的用户名/rootgrammar.git
git branch -M main
git push -u origin main
```

> 若 push 失败，在 GitHub 用 HTTPS 地址，或用 GitHub Desktop 图形界面上传，也可以。

### 1.2 用 Vercel 部署

1. 打开 https://vercel.com → **Continue with GitHub** 登录  
2. **Add New → Project** → 选刚建的 `rootgrammar` 仓库  
3. 保持默认：  
   - Framework: **Vite**  
   - Build Command: `npm run build`  
   - Output Directory: `dist`  
4. 点 **Deploy**，等 1～2 分钟  
5. 打开 Vercel 给的地址（如 `https://rootgrammar-xxx.vercel.app`）  
   - 能打开首页  
   - 能打开 `/learn`  
   - 能打开 `/practice/beginner-01`  

### 1.3 绑定 rootgrammar.com（修掉 522）

**Vercel 里：**

1. 项目 → **Settings → Domains**  
2. 添加 `rootgrammar.com` 和 `www.rootgrammar.com`  
3. 记下 Vercel 提示的 DNS 记录（可能是 A 记录 IP 或 CNAME）

**Cloudflare 里：**

1. 打开 **DNS**  
2. **删除** 指向 `66.42.96.32` 的那条 **A 记录**（这是 522 的原因）  
3. **按 Vercel 面板要求新增** 记录，例如：  
   - 类型 `A`，名称 `@`，内容 = Vercel 给的 IP  
   - 类型 `CNAME`，名称 `www`，内容 = `cname.vercel-dns.com`  
4. 先可设为 **DNS only（灰云）** 测试，通了再开橙云  
5. **SSL/TLS** → 选 **Full (strict)**

等 5～30 分钟，访问 https://rootgrammar.com

### 第一步完成标准

- [ ] 朋友在国外/国内都能打开网站  
- [ ] 练习页能输入英文、按 Enter 判对错  

---

## 第二步：注册登录 + 进度存云端（约 1～2 天，用 AI 做）

### 2.1 创建 Supabase 项目

1. https://supabase.com → **Start your project**  
2. New project → 选区域 **West US** 或 **Singapore**（离目标用户近即可）  
3. 记下：**Project URL** 和 **anon public key**（Settings → API）

### 2.2 告诉 Cursor 要什么

在 Cursor 对话里 **复制粘贴** 下面这段话（把 key 换成你的，不要发到公开场合）：

```
请按路线 A 接入 Supabase：
1. 邮箱 + 密码注册登录
2. 登录后 Header 显示邮箱和退出
3. 练习完成记录存到数据库，换设备能同步
4. 使用 .env.local 里的 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY

我的 Supabase URL: https://xxxx.supabase.co
我的 anon key: eyJxxxx...
```

AI 会改代码。你本地创建 `.env.local`：

```env
VITE_SUPABASE_URL=https://你的项目.supabase.co
VITE_SUPABASE_ANON_KEY=你的anon_key
```

本地测试：

```bash
npm run dev
```

注册一个测试账号，练完一课，刷新页面看进度是否还在。

### 2.3 部署到 Vercel 时加环境变量

Vercel → 项目 → **Settings → Environment Variables**：

- `VITE_SUPABASE_URL` = 同上  
- `VITE_SUPABASE_ANON_KEY` = 同上  

保存后 **Redeploy** 一次。

### 第二步完成标准

- [ ] 能注册、登录、退出  
- [ ] 登录前后练习进度能保存  

---

## 第三步：上传单词书 CSV（约 1～2 天，用 AI 做）

### 3.1 准备 CSV 格式

第一版只支持这种（Excel 另存为 CSV UTF-8）：

```csv
english,chinese
apple,苹果
I like coffee.,我喜欢咖啡。
```

- 一行一个词或一句英文  
- 有逗号的句子用英文引号包起来也可以  

### 3.2 告诉 Cursor

```
请加「我的词书」页面：
- 登录后可上传 CSV（english,chinese 两列）
- 列表显示我的词书
- 点击词书生成练习，跳转 /practice/...
- 只能看到自己的词书（Supabase RLS）
```

### 第三步完成标准

- [ ] 上传自己的 CSV  
- [ ] 能练上传的内容  

---

## 日常：你怎么和 AI 协作

| 你想做什么 | 在 Cursor 里怎么说 |
|------------|-------------------|
| 改首页标题 | 「把首页标题改成 …」 |
| 加一种上传格式 | 「词书 CSV 增加三列：english,chinese,例句」 |
| 网站打不开了 | 「Vercel 部署失败，帮我看 build 日志」并粘贴报错 |
| 新功能 | 「先别做 App，只做网页版 XXX」 |

**习惯：** 改完让 AI 运行 `npm run build`，成功再 push GitHub，Vercel 会自动更新。

---

## 费用参考（一个人）

| 阶段 | 月费 |
|------|------|
| 只有网站、用户很少 | **$0**（Vercel + Supabase 免费档） |
| 用户变多 | 约 **$25/月** Supabase Pro（以后再说） |
| 域名 | 你已付 rootgrammar.com |

**不要买 Vultr**，除非 AI 和 Supabase 都不够用了。

---

## 出问题怎么办

| 现象 | 处理 |
|------|------|
| 522 | Cloudflare DNS 还指着旧 IP → 改 Vercel 的记录 |
| 页面空白 | 让 AI 看 `npm run build` 报错 |
| 注册没反应 | 检查 Vercel 环境变量、Supabase Auth 是否开启 Email |
| 不会 git push | 用 GitHub Desktop：https://desktop.github.com |

---

## 当前进度打勾

- [ ] 第一步：rootgrammar.com 能打开  
- [ ] 第二步：注册 + 云端进度  
- [ ] 第三步：上传词书 CSV  

做完第一步，把 Vercel 预览地址或 rootgrammar.com 发给 5 个人试玩，再开始第二步。
