<template>
  <el-row type="flex" justify="center">
    <el-col :xs="24" :sm="18" :md="12" :lg="10">
      <app-post
        v-for="post in posts"
        :key="post._id"
        :post="post"
      />
    </el-col>
  </el-row>
</template>

<script>
  import AppPost from '@components/main/Post';

  export default {
    head: { // меты
      title: `Главная | ${proccess.env.appName}`, // env переменная из nuxt.config.js
      meta: [
        {hid: 'homepaged', name: 'description', content: 'Самый лучший js блог'},
        {hid: 'homepagek', name: 'keywords', content: 'блог, js, nuxt'}
      ]
    },
    async asyncData({ store }) {
      const posts = await store.dispatch('post/fetch')
      return { posts }
    },
    components: {
      AppPost
    }
  }
</script>
