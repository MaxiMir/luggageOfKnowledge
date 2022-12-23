<template> <!-- шаблон главного компонента -->
    <div id="app">
        <h2>Todo application</h2>
        
        <hr>

        <router-view /> <!-- место куда Vue по умолчанию рендерит страницы, которые загружаются по роуту -->
    </div>
</template>

<style>/* стили для главного компонента */
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
