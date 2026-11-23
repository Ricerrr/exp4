<script setup>
import { ref, computed, onMounted, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import PostItem from '../components/PostItem.vue'
import Sidebar from '../components/Sidebar.vue'
import { getPosts, likePost } from '../api/posts.js'

const router = useRouter()
const route = useRoute()

const category = ref('全部')
const keyword = ref('')
const page = ref(1)
const pageSize = 5

const loading = ref(true)
const error = ref('')
const data = ref({ items: [], total: 0 })

async function load() {
  loading.value = true
  error.value = ''
  try {
    const params = { page: page.value, pageSize }
    if (category.value !== '全部') params.category = category.value
    if (keyword.value) params.q = keyword.value
    data.value = await getPosts(params)
  } catch (e) {
    error.value = '载入失败，请重试'
  } finally {
    loading.value = false
  }
}

function onLike(id) {
  likePost(id).then(() => load())
}

const totalPages = computed(() => Math.max(1, Math.ceil(data.value.total / pageSize)))

watchEffect(() => {
  page.value = Number(route.query.page) || 1
  category.value = route.query.category || '全部'
  keyword.value = route.query.q || ''
})
onMounted(load)
</script>

<template>
  <template v-if="loading">
    <div class="state-box"><span class="loading-dot" />正在载入...</div>
  </template>

  <template v-else-if="error">
    <div class="state-box">
      <p>{{ error }}</p>
      <button class="btn" @click="load">重试</button>
    </div>
  </template>

  <template v-else>
    <section class="feed">
      <div class="feed-head">
        <h2>文章列表 <small class="count">共 {{ data.total }} 篇</small></h2>
        <RouterLink to="/create" class="btn">+ 写文章</RouterLink>
      </div>

      <div v-if="data.items.length === 0" class="state-box">没有找到匹配的文章。</div>

      <div v-else class="feed-list">
        <PostItem
          v-for="p in data.items"
          :key="p.id"
          :post="p"
          @like="onLike"
        />
      </div>

      <!-- 分页 -->
      <div v-if="totalPages > 1" class="pager">
        <button class="btn-ghost" :disabled="page <= 1" @click="page--; load()">← 上一页</button>
        <span>第 {{ page }} / {{ totalPages }} 页</span>
        <button class="btn-ghost" :disabled="page >= totalPages" @click="page++; load()">下一页 →</button>
      </div>
    </section>

    <Sidebar v-model:category="category" v-model:keyword="keyword" />
  </template>
</template>

<style scoped>
.feed { display: flex; flex-direction: column; gap: 16px; }
.feed-head { display: flex; justify-content: space-between; align-items: center; }
.feed-head h2 { margin: 0; font-size: 22px; color: #134e4a; }
.count { font-size: 13px; color: #5eead4; font-weight: normal; }
.feed-list { display: flex; flex-direction: column; gap: 14px; }
.pager { display: flex; justify-content: center; align-items: center; gap: 16px; padding: 10px 0; color: #0f766e; font-size: 13px; }
</style>
