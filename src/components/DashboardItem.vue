<template>
  <div id="content">
    <h1>{{ title }}</h1>
    <p>{{ text }}</p>
  </div>
</template>

<script>
import { collection, onSnapshot } from 'firebase/firestore';
import db from '../store/database';
export default {
  name: 'DashboardItem',
  props: {
    title: String,
    text: String,
  },
  data() {
    return {
      text: '',
    };
  },
  mounted: function () {
    this.getPagesText();
  },
  watch: {
    $route() {
      this.getPagesText();
    },
  },
  methods: {
    getPagesText() {
      // getting the pages from firebase and add them to local array
      onSnapshot(collection(db, 'pages'), snapshot => {
        this.text = '';
        snapshot.docs.forEach(doc => {
          if (doc.data().Name === this.$route.params.id) {
            this.text = doc.data().text;
          }
        });
      });
    },
  },
};
</script>

<style scoped>
#content h1 {
  text-transform: uppercase;
  font-size: 3rem;
}
#content p {
  margin-top: 5rem;
  font-size: 1rem;
}
</style>
