<template>
  <el-card
    shadow="always"
    :style="{width: '500px'}"
  >
    <el-form
      :model="controls"
      :rules="rules"
      ref="form"
      @submit.native.prevent="onSubmit"
    >
      <h2>Войти в панель администратора</h2>

      <el-form-item label="Логин" prop="login">
        <el-input v-model.trim="controls.login" />
      </el-form-item>

      <div class="mb">
        <el-form-item label="Пароль" prop="password">
        <el-input type="password" v-model.trim="controls.password" />
      </el-form-item>
      </div>

      <el-form-item>
        <el-button
          type="primary"
          native-type="submit"
          round
          :loading="loading"
        ><!-- loading - дизейблит кнопку и добавляет анимацию загрузки-->
          Войти
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  export default {
   layout: 'empty', // nuxt - указываем layout
   data() {
      return {
        loading: false,
        controls: { // контроллы модели формы
          login: '',
          password: ''
        },
        rules: { // правила валидации формы
          loading: [
            { required: true, message: 'Введите логин', trigger: 'blur'},
          ],
          password: [
            { required: true, message: 'Введите пароль', trigger: 'blur'},
            { min: 6, message: 'Пароль должен быть не менее 6 символов', trigger: 'blur'}
          ],
        }
      }
   },
   mounted() {
    const {message} = this.$route.query

    switch(message) {
      case 'login':
        this.$message.info('Для начала войдите в систему')
        break
      case 'logout':
        this.$message.success('Вы успешно вышли из системы')
    }
   },
   methods: {
     async onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true

          try {
            const formData = {
              login: this.controls.login,
              password: this.controls.password
            }

            await this.$store.dispatch('auth/login', formData) // название модуля/action
            this.$router.push('/admin')
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
