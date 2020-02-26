<template>
    <div>
        <h2>Todo header</h2>

        <router-link to="/">Home</router-link>

        <AddTodo
            @add-todo="addTodo"
        />

        <select v-model="filter">
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="not-completed">Not completed</option>
        </select>

        <hr>

        <Loader v-if="loading"/> <!-- условие if -->

        <!-- условие else if -->
        <TodoList
            v-else-if="filteredTodos.length"
            :todos="filteredTodos"
            @remove-todo="removeTodo"
        /><!-- паредаем в компонент данные из вычисляемых свойств filteredTodos-->

        <p v-else>No todos!</p><!-- условие else -->

    </div>
</template>

<script>
    import TodoList from '@/components/TodoList'; // импортируем компонент; @ - указывает на попку src
    import AddTodo from '@/components/AddTodo';
    import Loader from '@/components/Loader';

    export default { // экспортируем по дефолту функционал данного компонента
        name: 'app',
        data() { // данные приложения
            return {
                todos: [],
                loading: true,
                filter: 'all'
            }
        },
        watch: {
            filter(value) { // название фунции должно совпадать той с моделью/переменной, за которой мы следим
                console.log(value) // -> all | completed | not-completed
            }
        },
        mounted() { // Vue - подготовил HTML шаблон и разместил его в DOM дерево
            setTimeout(() => {
              fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
                  .then(response => response.json())
                  .then(json => {
                    this.todos = json;
                    this.loading = false;
                  });
            }, 1000)
        },
        components: {
            TodoList, // регистрируем компонент
            AddTodo, // регистрируем компонент
            Loader // регистрируем компонент
        },
        computed: { // вычисляемые свойства (логика, которая записит от моделей или изменяемых переменных)
            filteredTodos() {
                switch (this.filter) {
                    case 'all':
                        return this.todos;
                    case 'completed':
                        return this.todos.filter(t => t.completed)
                    case 'not-completed':
                        return this.todos.filter(t => !t.completed)
                }
            }
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