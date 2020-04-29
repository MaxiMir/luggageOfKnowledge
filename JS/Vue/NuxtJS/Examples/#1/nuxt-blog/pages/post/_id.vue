<template>
  <article class="post">
    <header class="post-header">
      <div class="post-title">
        <h1>{{ post.title }}</h1>

        <nuxt-link to="/">
          <i class="el-icon-back"></i>
        </nuxt-link>
      </div>
      <div class="post-info">
        <small>
          <i class="el-icon-time">
            {{ post.date || date }}
          </i>
        </small>
        <small>
          <i class="el-icon-view">
            {{ post.views }}
          </i>
        </small>
      </div>
      <div class="post-img">
        <img
          :src="post.imageUrl"
          alt="post-img"
        >
      </div>
    </header>

    <main class="post-content">
      <vue-markdown>{{ post.text }}</vue-markdown>
    </main>

    <footer>
      <app-comment-form
        v-if="canAddComment"
        @created="createdCommentHandler"
        :postId="post._id"
      />

      <div class="comments" v-if="post.comments.length">
        <app-comment
          v-for="comment in post.comments"
          :key="comment._id"
          :comment="comment"
        />
      </div>
      <div class="text-center" v-else>Комментариев нет</div>
    </footer>
  </article>
</template>

<script>
  import AppCommentForm from '@/components/main/CommentForm'
  import AppComment from '@/components/main/Comment'

  export default {
    validate({ params }) { // nuxt method
      return Boolean(params.id)
    },
    data() {
      return {
        canAddComment: true
      }
    },
    head() {
      return {
        title: `${ this.post.title } | ${ proccess.env.appName }`,
        meta: [
          { hid: `post-${ this.post._id }d`, name: 'description', content: this.post.title },
          { hid: `post-${ this.post._id }k`, name: 'keywords', content: 'post, пост' }
        ]
      }
    },
    async asyncData({ store, params }) {
      const post = await store.dispatch('post/fetchById', params.id)
      await store.dispatch('post/addView', post)

      return { ...post, views: ++post.views }
    },
    methods: {
      createdCommentHandler(comment) {
        this.post.comments.unshift(comment)
        this.canAddComment = false
      }
    },
    components: {
      AppCommentForm,
      AppComment
    }
  }
</script>

<style lang="scss" scoped>
  .post {
    max-width: 600px;
    margin: 0 auto;

    &-header {
      margin-bottom: 1.5rem;
    }

    &-content {
      margin-bottom: 2rem;
    }

    &-title, &-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    &-info {
      margin-bottom: 0.5rem;
    }

    &-img img {
      width: 100%;
      height: auto;
    }
  }
</style>
