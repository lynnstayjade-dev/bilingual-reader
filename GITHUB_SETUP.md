# GitHub 自动部署指南（每日同步 + 完全免费 + 免重部署更新）

本目录已是一个可直接推到 GitHub 的静态站点 + 自动采集管线。

## 一、把项目推到 GitHub

> 说明：当前沙箱环境无法直连 GitHub，以下步骤需在**你本机（有 GitHub 访问权的终端）**执行。
> 仓库设为 **Public**（Private 也能跑 Actions，但要走 jsDelivr 必须 Public）。

```bash
cd bilingual-reader
git init
git add -A
git commit -m "init: bilingual foreign-press reader"
gh repo create bilingual-reader --public --source=. --push   # 需要 gh 已登录
# 或用传统方式：先在 GitHub 新建空仓库，然后：
# git remote add origin https://github.com/<你的用户名>/bilingual-reader.git
# git branch -M main && git push -u origin main
```

## 二、配置百度翻译（中文注自动生成，可选但推荐）

仓库 → **Settings → Secrets and variables → Actions → New repository secret**，添加两条：

| Name | 值 |
|---|---|
| `BAIDU_APPID` | 百度翻译开放平台的应用 ID |
| `BAIDU_KEY`  | 百度翻译开放平台的应用密钥 |

注册地址：https://fanyi-api.baidu.com/ （免费额度对个人学习足够）。
不配也能跑——只是 `cn` 字段留空，阅读器只显示英文。

## 三、开启每日自动采集

- 仓库 → **Actions** 标签页，找到 `Daily Foreign-Press Ingest`，点 **Enable Workflow**。
- 默认每天 **UTC 22:00（北京时间 06:00）** 跑一次（见 `daily.yml` 的 cron）。
- 想立刻验证：点 **Run workflow** 手动触发一次。
- 跑完会把新生成的 `articles.json` 自动提交回仓库。

## 四、让已部署的 App 免重部署自动更新（关键）

App 不会"看到" GitHub 仓库，需要告诉它去哪拉最新数据。两种方式二选一：

### 方案 A（推荐，最稳）：jsDelivr CDN
仓库设为 Public 后，把 App「设置 → 数据源 URL」填：
```
https://cdn.jsdelivr.net/gh/<你的用户名>/bilingual-reader@main/articles.json
```
jsDelivr 带 CORS + 全球 CDN 缓存，每次 Actions 提交后几分钟内生效，**无需重部署 CloudStudio**。

### 方案 B：GitHub raw
```
https://raw.githubusercontent.com/<你的用户名>/bilingual-reader/main/articles.json
```

> 在 CloudStudio 已部署版本里：打开站点 → 右上角 ⚙ 设置 → 粘贴上面的 URL → 保存。下次打开即拉最新。

## 五、（完全免费替代托管）GitHub Pages 自托管

如果你想**完全不依赖 CloudStudio**、整站也免费托管：

- 仓库 → **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: main / (root)**。
- 站点地址：`https://<你的用户名>.github.io/bilingual-reader/`
- 因为 App 与 `articles.json` 同源，Actions 提交后 Pages 自动重建，**整站每日自更新、零成本**。
- 仍可在手机"添加到主屏幕"变成可离线 PWA（manifest + sw 已就绪）。

## 六、内容合规边界（务必遵守）

- 本工作台只聚合**合法 RSS / 开放授权源**（含 CC BY 的 The Conversation、依免费转载政策的 NPR）。
- **不**抓取《经济学人》《FT》《NYT》《纽约客》等付费整刊/全文再分发——那属明确侵权，会触发 DMCA 与托管平台封号。
- 这些付费刊物若你本人订阅，请走**个人 newsletter 转发 / 私有导入**自用（见 `ingest.js` 顶部 `DEFAULT_FEEDS` 中相关条目的 `note`）。

## 七、字段 schema（自动采集 vs 示例数据已兼容）

`ingest.js` 输出：`url / excerpt / min / titleCn:'' / bodyCn:[] / quotes:string[]`
示例数据：`sourceUrl / excerptCn / readingMin / quotes:{text,who}`
阅读器两种 schema 均兼容，无需手动转换。
