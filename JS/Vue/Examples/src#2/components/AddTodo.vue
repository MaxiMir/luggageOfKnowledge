<template>
    <form @submit.prevent="onSubmit"> <!-- prevent - отменяет действия события по умолчанию -->
        <input type="text" v-model="title"> <!-- свойство title из data() - превращаем в модель -->
        <button type="submit">Create</button>
    </form>
</template>

<script>
    export default {
        data() {
            return {
                title: ''
            }
        },
        methods: {
            onSubmit() {
                if (!this.title.trim()) {
                    return;
                }

                const newTodo = {
                    id: Date.now(),
                    title: this.title, // введенное в input значение, тк это модель
                    completed: false
                }

                this.$emit('add-todo', newTodo) // передаем событие с данными родительскому компоненту
                this.title= '' // очищаем поле input
            }
        }
    }
</script>

<style>
    form {
        display: flex;
        justify-content: center;
    }

    input {
        width: 150px;
    }
</style>