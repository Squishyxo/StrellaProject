<template>
  <nav class="sidebar">
    <button @click="addLogo">Add Logo</button>
    <ul>
      <!-- Looping through an array and display the content inside it -->
      <li v-for="page in pagesArray">
        <a>{{ page }}</a>
      </li>
      <li @click="addData"><a>+</a></li>
    </ul>
    <div class="bottom-menu">
      <img src="../images/contrast.svg" />
      <button class="logOut">
        <img src="../images/bx-log-in.svg" alt="" />
      </button>
    </div>
  </nav>
  <img class="logo" :src="imageSrc" alt="example logo" />
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
      imageSrc: '../images/bx-log-in.svg',
    };
  },
  mounted: function () {
    this.getPages();
    this.getLogo();
  },
  methods: {
    addData() {
      // getting page name from a prompt
      let newPage = prompt('type something');
      if (newPage != '') {
        // making sure that the user entered some text else an alert is thrown
        addDoc(collection(db, 'pages'), {
          Name: newPage,
        });
      } else {
        alert('you did not enter anything');
      }
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
}
.logo {
  text-align: center;
  position: absolute;
  top: 20%;
  right: 20%;
}
.logo img {
  width: 18rem;
  padding: 1rem;
}
.bottom-menu {
  display: flex;
  justify-content: space-around;
}
.bottom-menu img {
  width: 2rem;
}

.side-menu ul li {
  cursor: pointer;
  border-bottom: 1px solid var(--primary-color);
}

.router-link-active {
  background-color: var(--primary-color);
  color: var(--secondary-color);
}

.side-menu .router-link-active a {
  color: var(--secondary-color);
}
.logOut {
  background-color: var(--primary-color);
  color: var(--secondary-color);
  width: 80px;
  height: 50px;
  margin-left: 35px;
}
button {
  margin-left: 40% !important;
}
</style>
