<template> <!-- шаблон компонента -->
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
        <Loader v-if="loading"/> <!-- условие -->
        <TodoList
            v-else-if="filteredTodos.length"
            :todos="filteredTodos"
            @remove-todo="removeTodo"
        /><!-- паредаем в компонент данные из вычисляемых свойств filteredTodos-->
        <p v-else>No todos!</p><!-- условие иначе-->
    </div>
</template>

<script>
    import TodoList from '@/components/TodoList' // импортируем компонент; @ - указывает на попку src
    import AddTodo from '@/components/AddTodo'
    import Loader from '@/components/Loader'

    export default { // экспортируем по дефолту функционал данного компонента
        name: 'app',
        data() { // данные приложения
            return {
                loading: true,
                filter: 'all',
                todos: [
                    {id: 1, title: 'Купить хлеб', completed: false},
                    {id: 2, title: 'Купить масло', completed: false},
                    {id: 3, title: 'Купить пиво', completed: false},
                ],
            }
        },
        watch: { // название фунции должно совпадать той с моделью/переменной, за которой мы следим
            filter(value) {
                console.log(value) // all | completed | not-completed
            }
        },
        mounted() { // Vue - подготовил HTML шаблон и разместил его в DOM дерево
            setTimeout(() => {
                this.loading = false
            }, 1000)
        },
        components: {
            TodoList, // регистрируем компонент
            AddTodo,
            Loader
        },
        computed: { // вычисляемые свойства (логика, которая записит от моделей или изменяемых переменных)
            filteredTodos() {
                switch (this.filter) {
                    case 'all':
                        return this.todos
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