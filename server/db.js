import { Low, JSONFile } from 'lowdb'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const seedPosts = [
  { id: 1, title: 'Vue3 + Vite 8 博客实验', content: '# 你好 Vue3\n\n迁移到 Vue3 真的爽。', summary: '从选项式到组合式的第一篇笔记。', category: '技术', tags: ['Vue', 'Vite'], likes: 3, views: 17, createdAt: '2026-11-01' },
  { id: 2, title: 'lowdb — 一行 JSON 当数据库', content: '# lowdb\n\n```js\nconst db = new Low(new JSONFile("db.json"), { posts: [] })\n```', summary: '零配置 JSON 文件数据库速记。', category: '技术', tags: ['Node', '数据库'], likes: 7, views: 32, createdAt: '2026-11-03' },
  { id: 3, title: '青绿配色从哪来', content: '# 配色\n\n参考 Tailwind **teal-600** `#0d9488`。', summary: '为什么这次选青绿色。', category: '随笔', tags: ['UI'], likes: 2, views: 9, createdAt: '2026-11-05' },
  { id: 4, title: '状态管理三足鼎立', content: '# Pinia / Zustand / RTK\n\n- Pinia：Vue 内建\n- Zustand：React 最小\n- RTK：Redux 官方', summary: '三种对比，选哪个不后悔。', category: '技术', tags: ['状态管理'], likes: 11, views: 45, createdAt: '2026-11-08' },
  { id: 5, title: 'Express 五分钟开 API', content: '# Express\n\n```js\napp.get("/", (req, res) => res.json({ ok: true }))\n```', summary: '零框架感后端入门。', category: '技术', tags: ['Node', 'Express'], likes: 5, views: 22, createdAt: '2026-11-10' }
]

const defaultData = { posts: seedPosts, comments: { 1: [{ id: 1, username: '路人甲', content: '好文章', createdAt: '2026-11-01 12:00' }] } }

const db = new Low(new JSONFile(path.join(__dirname, 'db.json')), defaultData)
await db.read()
// read 后如果文件不存在，data 为 null，用 defaultData 兜底
if (!db.data || !Array.isArray(db.data.posts)) {
  db.data = JSON.parse(JSON.stringify(defaultData))
  await db.write()
}
export default db
