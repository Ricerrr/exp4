<script setup>
import { ref, onMounted } from 'vue'
import { getComments, addComment } from '../api/posts.js'

const props = defineProps({ postId: { type: Number, required: true } })

const comments = ref([])
const input = ref('')
const username = ref('')
const loading = ref(false)

async function refresh() { comments.value = await getComments(props.postId) }

async function submit() {
  if (!input.value.trim()) return
  await addComment(props.postId, { username: username.value.trim() || '匿名读者', content: input.value.trim() })
  input.value = ''
  await refresh()
}

onMounted(refresh)
</script>

<template>
  <section class="comments">
    <h3 class="sec-title">评论 ({{ comments.length }})</h3>

    <div class="card comment-form">
      <div class="row">
        <input v-model="username" class="input" placeholder="昵称（可选）" style="max-width:160px" />
      </div>
      <textarea v-model="input" class="textarea" rows="2" placeholder="说点什么..." />
      <div class="foot">
        <span class="hint">支持换行</span>
        <button class="btn" @click="submit">发表</button>
      </div>
    </div>

    <ul v-if="comments.length" class="list">
      <li v-for="c in comments" :key="c.id" class="comment-item">
        <div class="meta">
          <strong>{{ c.username }}</strong>
          <span>{{ c.createdAt }}</span>
        </div>
        <p>{{ c.content }}</p>
      </li>
    </ul>
    <div v-else class="state-box">还没有评论，来说两句吧～</div>
  </section>
</template>

<style scoped>
.comments { margin-top: 28px; }
.sec-title { margin: 0 0 14px; font-size: 16px; color: #134e4a; }
.comment-form { display: flex; flex-direction: column; gap: 8px; margin-bottom: 18px; }
.row { display: flex; gap: 10px; }
.foot { display: flex; justify-content: space-between; align-items: center; }
.hint { font-size: 12px; color: #5eead4; }
.list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
.comment-item { padding: 12px 14px; background: #f0fdfa; border-radius: 10px; border-left: 3px solid #0d9488; }
.comment-item .meta { display: flex; gap: 10px; font-size: 12px; color: #0f766e; margin-bottom: 4px; }
.comment-item p { margin: 0; }
</style>
