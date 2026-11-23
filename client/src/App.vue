<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-shell">
    <header class="app-header">
      <RouterLink to="/" class="app-logo">🍋 青柠博客</RouterLink>
      <nav class="app-nav">
        <RouterLink to="/">首页</RouterLink>
        <RouterLink to="/create">写文章</RouterLink>
      </nav>
    </header>
    <main class="app-main">
      <RouterView />
    </main>
    <footer class="app-footer">© 2026 Lime Blog · Vue3 + Express + lowdb</footer>
  </div>
</template>
