import { defineStore } from 'pinia'

export const useBlogStore = defineStore('blog', () => {
  const categories = ['全部', '技术', '随笔']
  const allTags = ['Vue', 'Vite', 'React', '状态管理', 'Node', 'Express', '数据库', 'UI']
  return { categories, allTags }
})
