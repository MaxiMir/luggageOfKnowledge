<template>
  <el-form
    :model="controls"
    :rules="rules"
    ref="form"
    @submit.native.prevent="onSubmit"
  >
    <h2>Добавить комментарий</h2>

    <el-form-item label="Ваше имя" prop="name">
      <el-input v-model.trim="controls.name"/>
    </el-form-item>

    <el-form-item label="Текст комментария" prop="text">
      <el-input
        type="textarea"
        v-model.trim="controls.text"
        resize="none"
        :rows="2"
      />
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        native-type="submit"
        round
        :loading="loading"
      ><!-- loading - дизейблит кнопки и добавляет анимацию загрузки-->
        Добавить комментарий
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        controls: {
          name: '',
          text: ''
        },
        rules: {
          name: [
            { required: true, message: 'Имя не должно быть пустым', trigger: 'blur' },
          ],
          text: [
            { required: true, message: 'Введите Ваш комментарий', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      onSubmit() {
        this.$refs.form.validate(async valid => {
          if (valid) {
            this.loading = true
            const formData = {
              name: this.controls.name,
              text: this.controls.text,
              postId: '',
            }

            try {
              this.$message.success('Комментарий добавлен') // elements UI - показ всплывашки с сообщением
              this.$emit('created')
            } catch (e) {
              this.loading = false
            }
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
