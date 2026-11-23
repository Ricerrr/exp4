import { Router } from 'express'
import db from '../db.js'

const router = Router()
function write() { return db.write() }

// GET /api/posts
router.get('/', (req, res) => {
  const { category, tag, q, page = 1, pageSize = 10 } = req.query
  let list = [...db.data.posts]
  if (category && category !== '全部') list = list.filter(p => p.category === category)
  if (tag) list = list.filter(p => (p.tags || []).includes(tag))
  if (q) list = list.filter(p => p.title.includes(q) || (p.summary || '').includes(q))
  list.sort((a, b) => b.id - a.id)
  const total = list.length
  const p = Math.max(1, Number(page))
  const ps = Math.max(1, Number(pageSize))
  const start = (p - 1) * ps
  res.json({ items: list.slice(start, start + ps), total, page: p, pageSize: ps })
})

// GET /api/posts/:id
router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  const post = db.data.posts.find(p => p.id === id)
  if (!post) return res.status(404).json({ msg: 'not found' })
  post.views = (post.views || 0) + 1
  write()
  res.json(post)
})

// POST /api/posts
router.post('/', (req, res) => {
  const { title, content = '', summary = '', category = '随笔', tags = [] } = req.body || {}
  if (!title?.trim()) return res.status(400).json({ msg: 'title required' })
  const id = db.data.posts.length ? Math.max(...db.data.posts.map(p => p.id)) + 1 : 1
  const post = { id, title: title.trim(), content, summary: summary.trim(), category, tags, likes: 0, views: 0, createdAt: new Date().toISOString().slice(0, 10) }
  db.data.posts.push(post)
  write()
  res.status(201).json(post)
})

// PATCH /api/posts/:id
router.patch('/:id', (req, res) => {
  const id = Number(req.params.id)
  const post = db.data.posts.find(p => p.id === id)
  if (!post) return res.status(404).json({ msg: 'not found' })
  const { like } = req.body || {}
  if (like === true) post.likes = (post.likes || 0) + 1
  if (like === false && post.likes > 0) post.likes -= 1
  write()
  res.json(post)
})

// DELETE /api/posts/:id
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  const idx = db.data.posts.findIndex(p => p.id === id)
  if (idx === -1) return res.status(404).json({ msg: 'not found' })
  db.data.posts.splice(idx, 1)
  delete db.data.comments[id]
  write()
  res.json({ ok: true })
})

// GET /api/posts/:id/comments
router.get('/:id/comments', (req, res) => res.json(db.data.comments[Number(req.params.id)] || []))

// POST /api/posts/:id/comments
router.post('/:id/comments', (req, res) => {
  const id = Number(req.params.id)
  const post = db.data.posts.find(p => p.id === id)
  if (!post) return res.status(404).json({ msg: 'not found' })
  const { username = '匿名', content = '' } = req.body || {}
  if (!content.trim()) return res.status(400).json({ msg: 'content required' })
  const list = db.data.comments[id] ||= []
  const c = { id: list.length ? Math.max(...list.map(x => x.id)) + 1 : 1, username, content: content.trim(), createdAt: new Date().toISOString().slice(0, 16).replace('T', ' ') }
  list.push(c)
  write()
  res.status(201).json(c)
})

export default router
