<template>
    <li>
        <span :class="{done: todo.completed}">
            <input type="checkbox" @change="todo.completed = !todo.completed"><!-- обработчик события change-->
            <strong>{{ index + 1 }}</strong>
            {{ todo.title | uppercase }}
        </span>

        <button class="rm"
                @click="$emit('remove-todo', todo.id)"
        >&times;</button>
    </li>
</template>

<script>
    export default {
        props: {
            todo: {
                type: Object,
                required: true
            },
            index: Number
        },
        filters: {
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
