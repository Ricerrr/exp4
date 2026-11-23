<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="state-box">
    <p style="font-size:48px;margin:0;color:#0d9488;font-weight:900">404</p>
    <p>页面不存在</p>
    <RouterLink to="/" class="btn">返回首页</RouterLink>
  </div>
</template>
