<template><!-- шаблон данного компонента-->
    <div><!-- ! корневой элемент должен быть только 1-->
        <ul>
            <TodoItem
                v-for="(todo, i) of todos"
                :todo="todo"
                :index="i"
                @remove-todo="removeTodo"
            /><!--
            перебираем todos и в каждый элемент передаем todo и index
            removeTodo - обработчик события в дочернем элементе
            -->
        </ul>
    </div>
</template>

<script>
    import TodoItem from '@/components/TodoItem.vue'; // импортируем нужный компонент для регистрации

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

<style scoped>
    /*
    стили видны только внутри компонента. У <ul> будет сгенирирован атрибут с уникальным сгенерированным хэшем, напр. ul[data-v-3ву47834].
    */
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }
</style>