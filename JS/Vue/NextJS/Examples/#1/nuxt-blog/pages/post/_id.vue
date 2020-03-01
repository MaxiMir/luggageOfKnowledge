<template>
  <article class="post">
    <header class="post-header">
      <div class="post-title">
        <h1>Post title</h1>

        <nuxt-link to="/">
          <i class="el-icon-back"></i>
        </nuxt-link>
      </div>
      <div class="post-info">
        <small>
          <i class="el-icon-time">
            {{ new Date().toLocaleString() }}
          </i>
        </small>
        <small>
          <i class="el-icon-view">
            42
          </i>
        </small>
      </div>
      <div class="post-img">
        <img
          src="https://cdn.tr.com/files/1.jpg"
          alt="post-img"
        >
      </div>
    </header>

    <main class="post-content">
      <p></p>
    </main>

    <footer>
      <app-comment-form
        v-if="canAddComment"
        @created="createdCommentHandler"
      />

      <div class="comments" v-if="comments.length">
        <app-comment
          v-for="comment in comments"
          :key="comment.id"
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
    validate({params}) { // nuxt method
      return Boolean(params.id)
    },
    data() {
      return {
        canAddComment: true
      }
    },
    methods: {
      createdCommentHandler() {
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
