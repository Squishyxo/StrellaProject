<template>
<div>
  <Sidebar />
  <router-view :title="$route.params.id" :text="text"></router-view>
</div>
</template>

<script>
import {
  collection,
  onSnapshot,
} from 'firebase/firestore';
import db from '../store/database';
import Sidebar from './Sidebar.vue'
export default {
    components: {Sidebar},
    name: 'DashboardPage',
    data() {
        return {
            text: ''
        }
    },
      mounted: function () {
    this.getPagesText();
  },
    methods:{
    getPagesText() {
      // getting the pages from firebase and add them to local array
      onSnapshot(collection(db, 'pages'), snapshot => {
      this.text = '';
        snapshot.docs.forEach(doc => {
        //   let pages = {
        //     id: doc.id,
        //     name: doc.data().Name,
        //     text: doc.data().text
        //   };
        if(doc.data().Name === this.$route.params.id){
            this.text = doc.data().text
        }
        });
      });
    },
    }
}
</script>

<style scoped>
div{
    background-color: var(--primaryColor);
    min-height: 100vh;
}
#content{
    border: 1px solid red;
    height: auto;
    width: 60%;
    margin-left: 30%;
    margin-top: 5%;
    color: var(--secondaryColor);
}
#content h1{
font-size: 2.7rem;
}
#content p{
font-size: 1.5rem;
}
#content > *{
    margin: 3rem 0;
}

</style>