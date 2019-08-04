<template>
    <li>
        <span :class="{done: todo.completed}"><!-- после : условие добавления класса -->
            <input type="checkbox"
                @change="todo.completed = !todo.completed"
            ><!-- обработчик события change-->
            <strong>{{ index + 1 }}</strong>
            {{ todo.title | uppercase }} <!-- применяем фильтр uppercase -->
        </span>
        <button class="rm"
            @click="$emit('remove-todo', todo.id)"
        >&times;</button><!-- $emit - сообщаем родительскому элементу, что у нас что-то случилось (название события, данные) -->
    </li>
</template>

<script>
    export default {
        props: { // регистрируем + валидируем принимаемые данные
            todo: {
                type: Object, // задаем тип
                required: true // делаем обязательным
            },
            index: Number // просто задаем тип
        },
        filters: { // фильтры по принимаемым данным
            uppercase(value) {
                return value.toUpperCase();
            }
        }
    }
</script>

<style scoped>
    li {
        border: 1px solid #ccc;
        display: flex;
        justify-content: space-around;
        padding: .5rem 2rem;
        margin-bottom: 1rem;
    }

    .rm {
        background: red;
        color: #fff;
        border-radius: 50%;
        font-weight: bold;
    }

    input {
        margin-right: 1rem;
    }

    .done {
        text-decoration: line-through;
    }
</style>