<template> <!-- шаблон компонента -->
    <div id="app">
        <h2>Todo application</h2>
        <hr>

        <router-view /> <!-- куда рендерить страницы -->
    </div>
</template>

<style>/* стили для компонента */
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>

<!--
# INIT:
$ npm install -g @vue/cli
$ vue create my-vue-project
> Features: Babel
> Where do you prefer placing config: In dedicated config files
> Save this as preset for future projects > n


$ npm run serve

$ npm i vue-router
-->