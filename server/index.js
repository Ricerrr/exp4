import express from 'express'
import cors from 'cors'
import postsRouter from './routes/posts.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.json({ ok: true, msg: 'Blog API v1', endpoints: ['GET /api/posts', 'POST /api/posts', 'GET /api/posts/:id', 'PATCH /api/posts/:id', 'DELETE /api/posts/:id'] }))
app.use('/api/posts', postsRouter)

app.listen(PORT, () => console.log(`[server] http://localhost:${PORT}`))
