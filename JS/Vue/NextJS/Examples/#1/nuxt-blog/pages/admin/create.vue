<template>
  <el-form
    :model="controls"
    :rules="rules"
    ref="form"
    @submit.native.prevent="onSubmit"
  >
    <h1 class="mb">Создать новый пост</h1>

    <el-form-item label="Введите название поста" prop="title">
      <el-input
        v-model="controls.title"
      />
    </el-form-item>

    <el-form-item label="Текст в формате .md или .html" prop="text">
      <el-input
        type="textarea"
        v-model="controls.text"
        resize="none"
        :rows="10"
      />
    </el-form-item>

    <el-button class="mb" type="success" plain @click="previewDialog = true"><!-- previewDialog - для показа modal-->
      Предпросмотр
    </el-button>

    <el-dialog title="Предпросмотр" :visible.sync="previewDialog"><!-- modal (Element UI)-->
      <div :key="controls.text"><!-- :key - для перерендеринга с новым контентом из controls.text -->
        <vue-markdown>{{controls.text}}</vue-markdown> <!-- используем vue-markdown -->
      </div>
    </el-dialog>

    <el-upload
      class="mb"
      drag
      ref="upload"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-change="handleImageChange"
      :auto-upload="false"
    ><!-- добавляем upload для использования с clearFiles() -->
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">Перетащите картинку <em>или нажмите</em></div>
      <div class="el-upload__tip" slot="tip">файлы с расширением jpg/png</div>
    </el-upload><!-- Элемент для загрузки файлов (Element UI)-->

    <el-form-item>
      <el-button
        type="primary"
        native-type="submit"
        round
        :loading="loading"
      >
        Создать пост
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    layout: 'admin',
    middleware: ['admin-auth'],
    head: {
      title: `Новый пост | ${proccess.env.appName}`
    },
    data() {
      return {
        image: null,
        previewDialog: false, // отвечает за показ модального окна
        loading: false,
        controls: {
          title: '',
          text: ''
        },
        rules: {
          text: [
            { required: true, message: 'Текст не должен быть пустым', trigger: 'blur' }
          ],
          title: [
            { required: true, message: 'Название поста не может быть пустым', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleImageChange(file, fileList) {
        this.image = file.raw // в raw хранится объект файла который мы загрузили
      },
      onSubmit() {
        this.$refs.form.validate(async valid => {
          if (valid && this.image) { // this.image - будет не пустой если картинка загружена
            this.loading = true

            const formData = {
              title: this.controls.title,
              text: this.controls.text,
              image: this.image
            }

            try {
              await this.$store.dispatch('post/create', formData)
              this.controls.text = ''
              this.controls.title = ''
              this.image = null
              this.$refs.upload.clearFiles() // очистка загруженных файлов метод (Element UI)
              this.$message.success('Пост создан')
            } catch (e) {
            } finally {
              this.loading = false
            }
          } else {
            this.$message.warning('Форма не валидна')
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  form {
    width: 600px;
  }
</style>
