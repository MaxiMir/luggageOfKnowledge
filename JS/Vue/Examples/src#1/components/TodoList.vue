<template><!-- шаблон данного компонента-->
    <div><!-- корневой элемент должен быть только 1-->
        <ul>
            <TodoItem
                v-for="(todo, i) of todos"
                :todo="todo"
                :index="i"
                @remove-todo="removeTodo"
            /><!-- removeTodo - обработчик события в дочернем элементе -->
        </ul> <!-- перебираем todos и в каждый элемент передаем todo и index -->
    </div>
</template>

<script>
    import TodoItem from '@/components/TodoItem.vue' // импортируем нужный компонент для регистрации

    export default { // необходимо для регистрации в родительском компоненте
        props: [ // регистрируем принимаемые данные
            'todos', // совпадает с todos="" в родительском компоненте (здесь App.vue)
        ],
        components: {
            TodoItem // регистрируем компонент
        },
        methods: {
            removeTodo(id) {
                this.$emit('remove-todo', id) // здесь так же передаем событие с данными родительскому компоненту
            }
        }
    }
</script>

<style scoped>/* стили видны только внутри компонента */
    ul { /* у этого элемента будет сгенирирован атрибут со уникальным сгенерированным хэшем, напр. [data-v-3ву47834]*/
        list-style-type: none;
        margin: 0;
        padding: 0;
    }
</style>