<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'Create'|localize}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{invalid: $v.title.$dirty && !$v.title.required}"
          >

          <label for="name">{{'Title'|localize}}</label>

          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
          >{{'Message_CategoryTitle'|localize}}</span>

        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          ><!-- модификатор number - приводит к числу данную модель -->

          <label for="limit">{{'Limit'|localize}}</label>

          <span
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
          >{{'Message_MinLength'|localize}} {{$v.limit.$params.minValue.min}}</span>

        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{'Create'|localize}}
          <i class="material-icons right">send</i>
        </button>

      </form>
    </div>
  </div>
</template>

<script>
  import { minValue, required } from 'vuelidate/lib/validators';
  import localizeFilter from '@/filters/localize.filter';

  export default {
    data: () => ({
      title: '',
      limit: 100,
    }),
    validations: {
      title: { required },
      limit: { minValue: minValue(100) }, // валидатор минимальное значение
    },
    mounted() {
      M.updateTextFields(); // решает баг с наездом label на введенное значение
    },
    methods: {
      async submitHandler() {
        if (this.$v.$invalid) {
          this.$v.$touch();
          return;
        }

        try {
          const categoryFormData = {
            title: this.title,
            limit: this.limit,
          };

          const category = await this.$store.dispatch('createCategory', categoryFormData);

          this.title = ''; // сбрасываем значения полей
          this.limit = 100; // сбрасываем значения полей
          this.$v.$reset(); // сбрасываем state формы
          this.$message(localizeFilter('Category_HasBeenCreated')); // показываем сообщение

          this.$emit('created', category); // эммитим родителю событие с данными
        } catch (e) {
        }
      },
    },
  };
</script>
