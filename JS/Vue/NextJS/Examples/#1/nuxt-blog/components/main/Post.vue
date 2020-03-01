<template>
  <el-card
    shadow="hover"
    :body-style="{padding: 0}"
    class="post"
  >
   <header slot="header" class="post-header">
      <h3>Post title</h3>

      <small>
        <i class="el-icon-time">
          {{ new Date().toLocaleString() }}
        </i>
      </small>
    </header>
    <div class="post-body">
      <img
        src="https://cdn.tr.com/files/1.jpg"
        alt="post-img"
        class="post-img"
      >
    </div>
    <footer class="post-footer">
      <el-button round @click="openPost">
        Открыть пост
      </el-button>

      <span>
        <i class="el-icon-message">
          12
        </i>
      </span>
    </footer>
  </el-card>
</template>

<script>
  export default {
    methods: {
      openPost() {
        this.$router.push(`/post${this.post.id}`)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .post {
    margin-bottom: 1rem;

    &-header {
      display: flex;
      justify-content: space-between;
      align-items:center;
    }

    &-img {
      width: 100%;
      height: auto;
    }

    &-footer {
      display: flex;
      justify-content: space-between;
      padding: 1rem;
    }
  }
</style>
