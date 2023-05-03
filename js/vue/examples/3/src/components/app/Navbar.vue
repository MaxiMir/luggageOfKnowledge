<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('click-menu')"><!-- передача события в родительский компонент -->

          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">
          {{date | date('datetime')}}<!-- применение фильтра date -->
        </span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a class="dropdown-trigger black-text" href="#" data-target="dropdown" ref="dropdown">
            <!-- добавляем элементу ref для использования в mounted() #refs  -->
            {{name}}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>
                {{'ProfileTitle'|localize}}
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>
                {{'Exit'|localize}}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>


<script>
  export default {
    data: () => ({
      date: new Date(),
      interval: null,
      dropdown: null,
    }),
    methods: {
      async logout() {
        await this.$store.dispatch('logout'); // дергаем action из store
        this.$router.push('/login?message=logout'); // редирект
      },
    },
    computed: {
      name() {
        return this.$store.getters.info.name; // дергаем getter info
      },
    },
    mounted() {
      // обновление данных о времени:
      this.interval = setInterval(() => {
        this.date = new Date();
      }, 1000);

      // выпадающий список инициализация #refs:
      this.dropdown = M.Dropdown.init(this.$refs.dropdown);
    },
    beforeDestroy() {
      // layout может меняться и чтобы исключить утечку памяти:

      // очищаем интервал:
      clearInterval(this.interval);

      // удаляем плагин:
      if (this.dropdown && this.dropdown.destroy) {
        this.dropdown.destroy();
      }
    },
  };
</script>
