<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
    <!-- 
      component - динамический компонент
      преобразуется в Vue компонент исходя из :is -> layout будет браться из computed
    -->
  </div>
</template>

<script>
  import EmptyLayout from '@layouts/EmptyLayout';
  import MainLayout from '@layouts/MainLayout';

  export default {
    computed: {
      layout() {
        return (this.$route.meta.layout || 'empty') + '-layout'; // получаем из router/index.js
        // совпадает с name в export default компонента
      },
    },
    components: {
      EmptyLayout, MainLayout,
    },
  };
</script>

<style lang="scss">
  @import '~materialize-css/dist/css/materialize.min.css';
  // импортируем стили Materialize CSS
  @import 'assets/index.css'; // импорт локальных стилей

</style>
