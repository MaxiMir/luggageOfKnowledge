<template>
  <el-card class="comment">
    <div class="comment-header">
      <span>Person name</span>
      <span>
          <i class="el-icon-time">
            {{ new Date().toLocaleString() }}
          </i>
      </span>
    </div>

    <div class="comment-text">

    </div>
  </el-card>
</template>

<script>
  export default {
      props: ['comment']
  }
</script>

<style lang="scss" scoped>
  .comment {
    margin-bottom: 5rem;

    &-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      font-size: 0.8rem;
    }

    &-text {
      white-space: pre-line; /* сохраняем переносы строк */
    }
  }
</style>
