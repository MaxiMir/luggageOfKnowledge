<template> <!-- шаблон главного компонента -->
    <div id="app">
        <h1>Todo application</h1>
        <AddTodo
            @add-todo="addTodo"
        />
        <hr>
        <TodoList
            :todos="todos"
            @remove-todo="removeTodo"
        /><!-- паредаем в компонент TodoList данные из data() - todos -->
    </div>
</template>

<script>
    import TodoList from '@/components/TodoList' // импортируем компонент; @ - указывает на попку src
    import AddTodo from '@/components/AddTodo'

    export default { // экспортируем по дефолту функционал главного компонента
        name: 'app',
        data() { // данные приложения
            return {
                todos: [
                    {id: 1, title: 'Купить хлеб', completed: false},
                    {id: 2, title: 'Купить масло', completed: false},
                    {id: 3, title: 'Купить пиво', completed: false},
                ]
            }
        },
        mounted() { // событие - Vue подготовил HTML шаблон и разместил его в DOM дерево
            // fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
            //     .then(response => response.json())
            //     .then(json => this.todos = json)
        },
        components: {
            TodoList, // регистрируем компонент
            AddTodo // ключ значение совпадают, если нет - OtherComponentName: ComponentName
        },
        methods: {
            removeTodo(id) {
                this.todos = this.todos.filter(t => t.id !== id)
            },
            addTodo(todo) {
                this.todos.push(todo)
            }
        }
    }
</script>

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

<!--
# INIT:
$ npm install -g @vue/cli
$ vue create my-vue-project
> Features: Babel
> Where do you prefer placing config: In dedicated config files
> Save this as preset for future projects > n


$ npm run serve
-->
