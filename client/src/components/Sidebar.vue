<script setup>
import { useBlogStore } from '../stores/blog.js'
const store = useBlogStore()

defineProps({
  category: { type: String, default: '全部' },
  keyword:  { type: String, default: '' }
})
const emit = defineEmits(['update:category', 'update:keyword'])
</script>

<template>
  <aside class="sidebar">
    <!-- 搜索 -->
    <div class="card">
      <h4 class="side-title">搜索</h4>
      <input
        :value="keyword"
        @input="emit('update:keyword', $event.target.value)"
        class="input"
        placeholder="输入关键词..."
      />
    </div>

    <!-- 分类 -->
    <div class="card">
      <h4 class="side-title">分类</h4>
      <div class="cat-list">
        <button
          v-for="c in store.categories"
          :key="c"
          :class="['cat-btn', { active: category === c }]"
          @click="emit('update:category', c)"
        >{{ c }}</button>
      </div>
    </div>

    <!-- 标签 -->
    <div class="card">
      <h4 class="side-title">标签</h4>
      <div class="tag-list">
        <span v-for="t in store.allTags" :key="t" class="tag-pill">#{{ t }}</span>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar { display: flex; flex-direction: column; gap: 16px; align-self: flex-start; position: sticky; top: 72px; }
.side-title { margin: 0 0 10px; font-size: 13px; font-weight: 700; color: #134e4a; letter-spacing: 0.04em; text-transform: uppercase; }
.cat-list { display: flex; flex-direction: column; gap: 6px; }
.cat-btn { text-align: left; padding: 6px 12px; border-radius: 8px; border: none; background: transparent; color: #134e4a; font-size: 13px; }
.cat-btn:hover { background: #f0fdfa; }
.cat-btn.active { background: #0d9488; color: #fff; }
.tag-list { display: flex; flex-wrap: wrap; gap: 6px; }
.tag-pill { background: #ccfbf1; color: #0f766e; padding: 2px 8px; border-radius: 999px; font-size: 11px; }
</style>
