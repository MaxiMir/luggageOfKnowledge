import _ from 'lodash';

export default {
  data() {
    return {
      page: + this.$route.query.page || 1,   // v-model="page"
      pageSize: 5,
      pageCount: 0,
      allItems: [],
      items: [],
    };
  },
  methods: {
    pageChangeHandler(page) { // обработчик клика
      this.$router.push(`${this.$route.path}?page=${page}`); // this.$route.path - текущий путь
      this.items = this.allItems[page - 1] || this.allItems[0];
    },
    setupPagination(allItems) {
      this.allItems = _.chunk(allItems, this.pageSize);
      this.pageCount = _.size(this.allItems); // _.size - длина массива
      this.items = this.allItems[this.page - 1] || this.allItems[0];
    },
  },
};
