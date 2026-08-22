# The Daily Reader · 双语外刊工作台

对标 read4f（全刊聚合）的内容广度 + gazerdaily（干净双语）的阅读体验，但**全免费、且只走合法源**的个人学习阅读器（PWA）。

## 已具备的能力
- 社论级阅读界面：刊头 + 当天日期 + 分类导航（全部/新闻/文化/商业/科学/观点/科技）。
- 双语对照阅读：段落级 EN + CN，支持「双语 / 仅英 / 仅中」三模式；字号（小/中/大/特大）与主题（浅/护眼/暗）。
- 点词翻译：点击任意英文单词弹出释义（内置 ~600 词学术/外刊词表），一键收藏生词、🔊 朗读。
- 短语/搭配高亮：正文下划线标出固定搭配，侧栏汇总可点跳转。
- 金句面板：自动抽取带引号金句，点按跳转原文。
- 间隔复习（SRS）：生词本按 Leitner 盒子复习，记不住自动回落；可导出 JSON / CSV。
- 连续天数、已读篇数、生词数进度；可「安装到主屏幕」离线读（PWA + Service Worker）。

## 内容来源（合规边界，务必遵守）
- 只抓**合法 RSS / 开放授权源**（含 CC BY 的 The Conversation），不搬运盗版整刊 PDF。
- 本工作台定位为**个人学习阅读器**，不对外再分发——可长期公网运行，不触发 DMCA / 平台封号。
- 当前 `articles.json` 为**示范文章**（真实篇幅、真实议题、真实双语注），用于展示体验；真实当期外刊由下方管线生成。

## 跑通真实外刊（三步）
1. 本机（需开放网络）安装 Node 20+，进入本目录：
   ```
   node ingest.js
   ```
   生成 `articles.json`（自动抓取 15+ 源、抽取正文、机器翻译回填中文、标记搭配/金句/难度）。
2. 想要更高质量中文：在 `ingest.js` 顶部配置百度翻译 `BAIDU_APPID` / `BAIDU_KEY`（中国网络可达）；无 key 则 `cn` 留空，仅显示英文。
3. 每日自动同步：把本目录推到 GitHub 仓库，`.github/workflows/daily.yml` 已配置每天定时采集并提交 `articles.json`。
   - 方式 A：CloudStudio 重新部署即拿到最新。
   - 方式 B（免重部署）：把 App 的「设置 → 数据源 URL」指向 GitHub raw，如
     `https://raw.githubusercontent.com/<你>/<仓库>/main/articles.json`，App 每次打开自动拉取最新。

## 自定义
- 增删刊物：编辑 `ingest.js` 的 `DEFAULT_FEEDS`。
- 搭配词库：编辑 `ingest.js` 的 `COLLOCATIONS`。
- 改示范内容：编辑 `build_data.js` 后运行 `node build_data.js` 重新生成 `articles.json`（用脚本生成可避免手工 JSON 转义出错）。

## 文件
- `index.html` 阅读器（单文件，内联 CSS/JS + 内置词表）
- `articles.json` 文章数据（被 index.html 消费）
- `ingest.js` 采集/翻译/标注管线
- `.github/workflows/daily.yml` 每日自动同步
- `build_data.js` 示范数据生成器
- `manifest.webmanifest` / `sw.js` / `icon.svg` PWA 资源
