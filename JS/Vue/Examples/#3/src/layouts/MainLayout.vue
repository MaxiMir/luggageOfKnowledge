<template>
  <div>
    <Loader v-if="loading"/>
    <div class="app-main-layout" v-else>

      <Navbar @click-menu="isOpen = !isOpen"/>

      <Sidebar v-model="isOpen" :key="locale"/>

      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
          <router-view/>
        </div>
      </main>

      <div class="fixed-action-btn" :key="locale + '1'">
        <router-link class="btn-floating btn-large blue" to="/record" v-tooltip="'CreateNewRecord'">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
  import Navbar from '@/components/app/Navbar';
  import Sidebar from '@/components/app/Sidebar';

  export default {
    name: 'main-layout',
    data: () => ({
      isOpen: true, // по умолч. открытый sidebar
      loading: true,
    }),
    async mounted() {
      if (!Object.keys(this.$store.getters.info).length) { // дергаем getter info
        await this.$store.dispatch('fetchInfo');
      }

      this.loading = false;
    },
    components: {
      Navbar,
      Sidebar,
    },
  };
</script>
