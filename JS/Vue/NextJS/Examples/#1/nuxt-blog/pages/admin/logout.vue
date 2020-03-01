<template>
  <div>Очищаем данные</div>
</template>

<script>
  export default {
   layout: 'admin', // nuxt - указываем layout
   middleware: ['admin-auth'],
   beforeCreate() { // самый 1 хук
    this.$store.dispatch('auth/logout')
    this.$route.push('/admin/login?message=logout')
   }
  }
</script>

<style lang="scss" scoped>

</style>
