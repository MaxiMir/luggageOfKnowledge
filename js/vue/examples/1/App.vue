<template> <!-- шаблон главного компонента -->
    <div id="app">
        <h1>Todo application</h1>
        <AddTodo
            @add-todo="addTodo"
        /><!--
        addTodo - обработчик для дочернего события в AddTodo
        -->

        <hr>

        <TodoList
            :todos="todos"
            @remove-todo="removeTodo"
        /><!--
        :todos="todos" <- передаем в компонент TodoList данные из data() - todos
        removeTodo - обработчик для дочернего события в TodoItem
        -->
    </div>
</template>


<script>
    import TodoList from '@/components/TodoList';
    import AddTodo from '@/components/AddTodo';
    // импортируем компоненты; @ - указывает на попку src

    export default { // экспортируем по дефолту функционал главного компонента
        name: 'app',
        data() { // данные приложения
            return {
                todos: [
                    {id: 1, title: 'Купить хлеб', completed: false},
                    {id: 2, title: 'Купить масло', completed: false},
                    {id: 3, title: 'Купить пиво', completed: false},
                ]
            };
        },
        mounted() { // событие - Vue подготовил HTML шаблон и разместил его в DOM дерево
            // асинхронное получение todos:
            fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
                .then(response => response.json())
                .then(json => {
                  this.todos = json
                });
        },
        components: {
            TodoList, // регистрируем компонент
            AddTodo // регистрируем компонент
            // ключ значение совпадают, если нет - OtherComponentName: ComponentName
        },
        methods: {
            removeTodo(id) {
                this.todos = this.todos.filter(t => t.id !== id); // todos - из данных приложения
            },
            addTodo(todo) {
                this.todos.push(todo);
            }
        }
    }
</script>

<style> /* стили для главного компонента */
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>