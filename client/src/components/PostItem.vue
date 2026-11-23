<script setup>
defineProps({ post: { type: Object, required: true } })
defineEmits(['like'])
</script>

<template>
  <RouterLink :to="`/posts/${post.id}`" class="card post-item">
    <div class="post-meta">
      <span class="tag">{{ post.category }}</span>
      <span class="dot">·</span>
      <span>{{ post.createdAt }}</span>
      <span class="dot">·</span>
      <span>👁 {{ post.views || 0 }}</span>
    </div>
    <h3 class="post-title">{{ post.title }}</h3>
    <p class="post-summary" v-if="post.summary">{{ post.summary }}</p>
    <div class="post-foot">
      <div class="tags" v-if="post.tags?.length">
        <span v-for="t in post.tags" :key="t" class="tag">#{{ t }}</span>
      </div>
      <button class="btn-ghost btn-like" @click.stop="$emit('like', post.id)">
        ❤ {{ post.likes || 0 }}
      </button>
    </div>
  </RouterLink>
</template>

<style scoped>
.post-item { display: flex; flex-direction: column; gap: 8px; text-decoration: none; color: inherit; cursor: pointer; }
.post-meta { color: #0f766e; font-size: 12px; display: flex; gap: 6px; align-items: center; }
.tag { background: #ccfbf1; color: #0f766e; padding: 2px 8px; border-radius: 999px; font-size: 11px; font-weight: 500; }
.dot { color: #99f6e4; }
.post-title { margin: 4px 0; font-size: 18px; font-weight: 700; color: #134e4a; line-height: 1.35; }
.post-item:hover .post-title { color: #0d9488; }
.post-summary { margin: 0; color: #5eead4; font-size: 13px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.post-foot { display: flex; justify-content: space-between; align-items: center; margin-top: 4px; }
.tags { display: flex; gap: 4px; flex-wrap: wrap; }
.tags .tag { background: transparent; color: #5eead4; }
.btn-like { padding: 4px 12px; font-size: 12px; }
</style>
