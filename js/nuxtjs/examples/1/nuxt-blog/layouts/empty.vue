<template>
  <div class="empty-layout">
    <nuxt/>
  </div>
</template>

<script>
  export default {
    computed: {
      error() {
        return this.$store.getters.error
      }
    },
    watch: {
      error(value) {
        const axiosError = value.response.data.message
        this.$message.error(axiosError)
      }
    }
  }
</script>


<style lang="scss" scoped>
  .empty-layout {
    display: flex;
    justify-content: center;
    width: 100%;
    padding-top: 4rem;
  }
</style>
