import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.PROD
    ? 'https://exp4-production.up.railway.app/api'
    : '/api'
})

export async function getPosts(params = {}) {
  const { data } = await api.get('/posts', { params })
  return data
}

export async function getPost(id) {
  const { data } = await api.get(`/posts/${id}`)
  return data
}

export async function createPost(payload) {
  const { data } = await api.post('/posts', payload)
  return data
}

export async function likePost(id, like = true) {
  const { data } = await api.patch(`/posts/${id}`, { like })
  return data
}

export async function deletePost(id) {
  const { data } = await api.delete(`/posts/${id}`)
  return data
}

export async function getComments(id) {
  const { data } = await api.get(`/posts/${id}/comments`)
  return data
}

export async function addComment(id, payload) {
  const { data } = await api.post(`/posts/${id}/comments`, payload)
  return data
}
