<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { marked } from 'marked'
import { createPost } from '../api/posts.js'

const router = useRouter()
const title = ref('')
const summary = ref('')
const category = ref('技术')
const tags = ref('')
const content = ref('# 开始写作\n\n支持 **Markdown**')
const preview = ref(false)
const submitting = ref(false)

const categories = ['技术', '随笔']
const html = computed(() => marked.parse(content.value))

async function submit() {
  if (!title.value.trim()) { alert('标题不能为空'); return }
  submitting.value = true
  try {
    await createPost({
      title: title.value.trim(),
      summary: summary.value.trim(),
      content: content.value,
      category,
      tags: tags.value.split(/[,，\s]+/).filter(Boolean)
    })
    router.push('/')
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <form class="create-form" @submit.prevent="submit">
    <h2 class="h2">写新文章</h2>

    <input v-model="title" class="input title" placeholder="文章标题" />
    <input v-model="summary" class="input" placeholder="摘要（可选）" />

    <div class="row">
      <select v-model="category" class="select">
        <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
      </select>
      <input v-model="tags" class="input" placeholder="标签，逗号分隔" />
    </div>

    <div class="editor">
      <div class="toolbar">
        <span>Markdown 编辑器</span>
        <button type="button" class="btn-ghost" @click="preview = !preview">
          {{ preview ? '← 编辑' : '预览 →' }}
        </button>
      </div>
      <textarea v-if="!preview" v-model="content" class="textarea" rows="14" placeholder="# 标题" />
      <div v-else class="prose preview" v-html="html" />
    </div>

    <div class="foot">
      <button type="button" class="btn-ghost" @click="router.back()">取消</button>
      <button type="submit" class="btn" :disabled="submitting">{{ submitting ? '发布中...' : '发布文章' }}</button>
    </div>
  </form>
</template>

<style scoped>
.create-form { grid-column: 1 / -1; max-width: 720px; margin: 0 auto; width: 100%; display: flex; flex-direction: column; gap: 12px; }
.h2 { margin: 0 0 4px; font-size: 22px; color: #134e4a; }
.title { font-size: 20px; font-weight: 700; }
.row { display: grid; grid-template-columns: 160px 1fr; gap: 10px; }
.editor { border: 1px solid #ccfbf1; border-radius: 12px; overflow: hidden; }
.toolbar { display: flex; justify-content: space-between; padding: 8px 14px; background: #f0fdfa; font-size: 12px; color: #0f766e; border-bottom: 1px solid #ccfbf1; }
.editor .textarea { border: none; border-radius: 0; padding: 14px; }
.editor .textarea:focus { box-shadow: none; }
.preview { padding: 18px; min-height: 300px; }
.foot { display: flex; justify-content: flex-end; gap: 10px; margin-top: 4px; }
</style>
