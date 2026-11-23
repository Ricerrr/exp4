<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { marked } from 'marked'
import CommentSection from '../components/CommentSection.vue'
import { getPost, likePost, deletePost } from '../api/posts.js'

const route = useRoute()
const router = useRouter()
const id = computed(() => Number(route.params.id))

const post = ref(null)
const html = ref('')
const loading = ref(true)

async function load() {
  loading.value = true
  try {
    post.value = await getPost(id.value)
    html.value = marked.parse(post.value.content || '')
  } catch {
    post.value = null
  } finally {
    loading.value = false
  }
}

async function onLike() {
  await likePost(id.value, !(post.value.likes > 0 && post.value.likes === (post.value.likes) ))
  post.value.likes = (post.value.likes || 0) + 1
}

async function onDelete() {
  if (!confirm('确定删除？')) return
  await deletePost(id.value)
  router.push('/')
}

onMounted(load)
</script>

<template>
  <template v-if="loading">
    <div class="state-box"><span class="loading-dot" />正在载入...</div>
  </template>

  <template v-else-if="!post">
    <div class="state-box">文章不存在或已被删除<br /><RouterLink to="/" class="btn">返回首页</RouterLink></div>
  </template>

  <template v-else>
    <article class="detail">
      <h1 class="title">{{ post.title }}</h1>
      <div class="meta">
        <span class="tag">{{ post.category }}</span>
        <span>{{ post.createdAt }}</span>
        <span>👁 {{ post.views }}</span>
        <span>❤ {{ post.likes }}</span>
      </div>

      <div class="prose" v-html="html" />

      <div class="actions">
        <button class="btn" @click="onLike">❤ 点赞</button>
        <button class="btn btn-ghost" @click="onDelete" style="border-color:#f87171;color:#ef4444">🗑 删除</button>
      </div>

      <CommentSection :post-id="id" />
    </article>

    <RouterLink to="/" class="btn-ghost back">← 返回列表</RouterLink>
  </template>
</template>

<style scoped>
.detail { grid-column: 1 / -1; max-width: 720px; margin: 0 auto; width: 100%; }
.title { margin: 0 0 8px; font-size: 30px; color: #134e4a; line-height: 1.3; }
.meta { display: flex; gap: 12px; align-items: center; font-size: 13px; color: #0f766e; border-bottom: 1px solid #ccfbf1; padding-bottom: 10px; margin-bottom: 20px; }
.meta .tag { background: #0d9488; color: #fff; }
.actions { display: flex; gap: 10px; margin-top: 20px; }
.back { justify-self: start; }
</style>
