<template>
  <form class="card auth-card" @submit.prevent="submitHandler"><!-- вышаем обработчик события на отправку формы -->
    <div class="card-content">
      <span class="card-title">{{'CRM_Title'|localize}}</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        ><!-- 
        trim - модификатор
        $v - системная переменная, отвечающая за валидацию; 
        $v.email.$dirty - что-то пытались вписывать в данный контрол;
        !$v.email.required - поле пустое
        !$v.email.email - не корректный эмейл
        -->

        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >{{'Message_EmailRequired'|localize}}</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
        >{{'Message_EmailValid'|localize}}</small>

      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        >

        <label for="password">{{'Password'|localize}}</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >{{'Message_EnterPassword'|localize}}</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
        >{{'Message_MinLength'|localize}} {{$v.password.$params.minLength.min}}</small>
        <!-- с ошибкой выводим минимальную необходимую длину пароля -->
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{'Login'|localize}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{'NoAccount'|localize}}
        <router-link to="/register">{{'Register'|localize}}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
  import { email, minLength, required } from 'vuelidate/lib/validators'; // импорт определенных валидаторов
  import messages from '@/utils/messages'; // коды сообщений
  import localizeFilter from '@/filters/localize.filter';

  export default {
    name: 'login',
    metaInfo() {
      return {
        title: this.$title('Login'),
      };
    },
    data: () => ({
      email: '',
      password: '',
    }),
    validations: { // использование плагина Vuelidate
      email: { email, required }, // задаем валидацию для email
      password: { required, minLength: minLength(6) },
    },
    mounted() {
      // показываем всплывашку с сообщением:
      const queryMessageValue = this.$route.query.message; // значение Query Param message
      const typeMessage = !queryMessageValue ? null : messages[queryMessageValue];

      if (typeMessage) {
        this.$message(localizeFilter(typeMessage));
      }
    },
    methods: {
      async submitHandler() {
        if (this.$v.$invalid) { // состояние невалидная форма
          this.$v.$touch(); // активизация валидации
          return;
        }

        const formData = {
          email: this.email,
          password: this.password,
        };

        try {
          await this.$store.dispatch('login', formData); // дергаем action login из store
          this.$router.push('/'); // редирект на главную
        } catch (e) {
        }
      },
    },
  };
</script>
