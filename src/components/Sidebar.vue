<template>
  <nav class="sidebar">
    <button @click="addLogo">Add Logo</button>
    <ul>
      <!-- Looping through an array and display the content inside it -->
     <li v-for="page in pagesArray" :key="page.name">
         <router-link :to="`${page}`"><a>{{ page }}</a></router-link>
      </li>
      <li @click="addPageForm"><a>+</a></li>
    </ul>
    <div class="bottom-menu">
      <img src="../images/contrast.svg" />
      <button class="logOut">
        <img src="../images/bx-log-in.svg" alt="" />
      </button>
    </div>
  </nav>
   <form @submit.prevent="addPage" id="addForm" v-if="popUp">
        <div @click="closeForm" class="close">&#x2718;</div>
        <h2>ADD A NEW PAGE</h2>
        <div>
        <label for="newPage">Page Name</label>
        <input v-model="namePage" class="nameInput" type="text" name="newPage" id="newPage" placeholder="Enter the new page name" required>
        <button type="submit">+</button>
        </div>
    </form>
  <img class="logo" alt="example logo" />
</template>

<script>
import {
  collection,
  addDoc,
  getDocs,
  doc,
  onSnapshot,
} from 'firebase/firestore';
import db from '../store/database';
export default {
  data() {
    return {
      pagesArray: [],
      namePage: ''
    };
  },
    computed: {
        popUp(){
            // this returns the stete of "popUp". I used this for v-if to know when to show the form
            return this.$store.state.popUp
        }
    },
  mounted: function () {
    this.getPages();
    this.getLogo();
  },
  methods: {
    addPage() {
      // getting page name from a form
      let newPage = this.namePage
      if (newPage != '') {
        // making sure that the user entered some text else an alert is thrown
        addDoc(collection(db, 'pages'), {
          Name: newPage,
        });
      } else {
        alert('you did not enter anything');
      }
      this.closeForm()
    },
    getPages() {
      // getting the pages from firebase and add them to local array
      onSnapshot(collection(db, 'pages'), snapshot => {
        snapshot.docs.forEach(doc => {
          const data = doc.data().Name;
          console.log(data);
          if (!this.pagesArray.includes(data)) {
            this.pagesArray.push(
              data
              // id: doc.id
            );
            this.pagesArray.reverse();
          }
        });
      });
    },
    addLogo() {
      let newLogo = prompt('type something');
      // making sure that the user entered some text else an alert is thrown
      addDoc(collection(db, 'logo'), {
        image: newLogo,
      });
    },
    getLogo() {
      // getting the pages from firebase and add them to local array
      onSnapshot(collection(db, 'logo'), snapshot => {
        const data = snapshot.doc.data().image;
        console.log(data);
        this.imageSrc(
          data
          // id: doc.id
        );
      });
    },
    addPageForm(){
      this.$store.commit('addPageForm')
    },
    closeForm(){
      // this goes to the store to call a function called closeForm
      this.$store.commit('closeForm')
    }
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap');
:root {
  --primary-color: #fff;
  --secondary-color: #0d161c;
  --third-color: #333333;
  --color-1: #0d161c;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  letter-spacing: 1.25px;
  scroll-behavior: smooth;
  overflow-x: hidden;
  text-decoration: none;
}

body {
  font-family: 'Roboto Slab', serif;
  background-color: var(--primary-color);
  color: var(--secondary-color);
}
nav {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--nav-color);
  width: 20rem;
  height: 100vh;
  position: fixed;
}
nav ul {
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
}
nav ul li {
  cursor: pointer;
  border-bottom: 1px solid var(--primary-color);
  height: 10vh;
  display: flex;
  align-content: center;
  justify-content: center;
  text-transform: uppercase;
}
nav ul li a {
  text-decoration: none;
  color: var(--primary-color);
  font-size: 1.5rem;
  height: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20rem;
}

.logOut {
  background-color: var(--primary-color);
  color: var(--secondary-color);
  width: 80px;
  height: 50px;
  margin-left: 35px;
}
.router-link-active {
    background-color: var(--primary-color);
    color: var(--secondary-color);
}

.sidebar .router-link-active a {
    color: var(--secondary-color);
}
.bottom-menu{
  display: flex;
  justify-content: space-around;
}
.bottom-menu img{
  width: 2rem;
}
#addForm{
  position: fixed;
  width: 60vw;
  height: 40vh;
  background: var(--primary-color);
  left: 20%;
  top: 30%;
  border-radius: 1rem;
  border: 2px solid #fff;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
 }
#addForm h2, #addForm div{
  text-align: center;
  color: var(--secondary-color);
  font-size: 2rem;
  }
#addForm div input{
  width: 40vw;
  height: 5vh;
  margin: 1rem;
  padding: 1rem;
  background-color: var(--primary-color);
  border: 2px solid var(--secondary-color);
  font-size: 1.5rem;
  color: var(--secondary-color);
  }
#addForm div input:focus{
  border: 5px solid var(--secondary-color);
  }
#addForm button{
  width: 10vw;
  height: 5vh;
  color: #fff;
  font-size: 1.5rem;
  background-color: var(--secondary-color);
  cursor: pointer;
}
#addForm .close{
  position: absolute;
  right: 2rem;
  top: 1rem;
  cursor: pointer;
}
</style>
