<template>
  <div class="error">
    <div class="error-content">
      <h1 class="error-title">Ошибка 404</h1>
      <nuxt-link to="/">Вернуться на главную</nuxt-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .error {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    &-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 4rem;
    }

    &-title {
      color: rgb(145, 6, 6);
      margin-bottom: 1rem;
    }
  }
</style>
