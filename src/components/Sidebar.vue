<template>
  <nav class="sidebar">
    <img id="logo" src="" alt="logo" />
    <ul>
      <!-- Looping through an array and display the content inside it -->
      <li v-for="page in pagesArray" :key="page.name">
        <router-link :to="`${page}`"
          ><a>{{ page.name }}</a></router-link
        ><img @click="removePage" class="bin" src="../images/trash.svg" />
      </li>
      <li v-if="loggedIn" @click="addPageForm"><a>+</a></li>
    </ul>
    <div class="bottom-menu">
      <img src="../images/contrast.svg" />
      <router-link to="/Login">
        <div v-if="!loggedIn && $store.state.lightTheme">
          <img src="../images/login.svg" />
        </div>
        <div v-if="!loggedIn && !$store.state.lightTheme">
          <img src="../images/login-dark.svg" />
        </div>
      </router-link>
      <div
        @click="logOut"
        class="logOut"
        v-if="loggedIn && $store.state.lightTheme"
      >
        <img src="../images/logout.svg" />
      </div>
      <div
        @click="logOut"
        class="logOut"
        v-if="loggedIn && !$store.state.lightTheme"
      >
        <img src="../images/logout-dark.svg" />
      </div>
    </div>
  </nav>
  <button class="uploadLogoBtn" v-if="loggedIn" @click="uploadLogoForm">
    Add Logo
  </button>
  <button class="resetLogoBtn" v-if="loggedIn" @click="resetLogo">
    Reset Logo
  </button>
  <!-- form for adding new pages -->
  <form @submit.prevent="addPage" id="addForm" v-if="popUp">
    <div @click="closeForm" class="close">&#x2718;</div>
    <h2>ADD A NEW PAGE</h2>
    <div>
      <label for="newPage">Page Name</label>
      <input
        v-model="namePage"
        class="nameInput"
        type="text"
        name="newPage"
        id="newPage"
        placeholder="Enter the new page name"
        required
      />
      <button type="submit">+</button>
    </div>
  </form>
  <!-- form for uploading logo -->
  <form @submit.prevent="addLogo" id="addlogoForm" v-if="logoForm">
    <div @click="closeForm" class="close">&#x2718;</div>
    <h2>UPLOAD LOGO</h2>
    <div>
      <label for="logo">Upload logo</label>
      <input
        @change="changeHandler"
        class="nameInput"
        type="file"
        name="logo"
        id="logo"
        ref="logo"
        accept="image/*"
        placeholder="Upload logo"
        required
      />
      <p v-if="fileError" class="errorFile">
        Please select an image file (png, jpeg, jpg, svg)
      </p>
      <button type="submit">+</button>
    </div>
  </form>
  <img class="logo" alt="example logo" />
</template>

<script>
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import db from '../store/database';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

export default {
  data() {
    return {
      pagesArray: [
        {
          name: 'INTRODUCTION',
          id: 'aaaaa',
        },
      ],
      namePage: '',
      logo: null,
      fileError: false,
    };
  },
  computed: {
    popUp() {
      // this returns the stete of "popUp". I used this for v-if to know when to show the form
      return this.$store.state.popUp;
    },
    logoForm() {
      // this returns the stete of "popUp". I used this for v-if to know when to show the form
      return this.$store.state.logoForm;
    },
    // logoIsUploaded() {
    //   // this returns the stete of "popUp". I used this for v-if to know when to show the form
    //   return this.$store.state.logoIsUploaded;
    // },
    loggedIn() {
      return this.$store.state.loggedIn;
    },
  },
  mounted: function () {
    this.getPages();
    this.getLogo();
  },
  methods: {
    addPage() {
      // getting page name from a form
      let newPage = this.namePage;
      if (newPage != '') {
        // making sure that the user entered some text else an alert is thrown
        addDoc(collection(db, 'pages'), {
          Name: newPage,
        });
      } else {
        alert('you did not enter anything');
      }
      this.closeForm();
    },
    getPages() {
      // getting the pages from firebase and add them to local array
      onSnapshot(collection(db, 'pages'), snapshot => {
        console.log(this.pagesArray);
        snapshot.docs.forEach(doc => {
          let pages = {
            id: doc.id,
            name: doc.data().Name,
          };
          if (!this.pagesArray.includes(pages.name)) {
            this.pagesArray.push(pages);
            this.pagesArray.reverse();
          }
        });
      });
    },
    async removePage(doc) {
      // Remove the 'capital' field from the document
      await deleteDoc(doc(db, 'pages', doc.id));
      console.log('deleted');
    },
    addLogo() {
      const storage = getStorage();
      // Create a child reference
      const imagesRef = ref(storage, 'logo/');
      // imagesRef now points to 'logo'
      let value = this.logo;
      console.log(value);
      uploadBytes(imagesRef, value).then(snapshot => {
        console.log('Uploaded a blob or file!');
      });
      this.closeForm();
    },
    resetLogo() {
      const storage = getStorage();
      // Create a child reference
      const imagesRef = ref(storage, 'logo');
      // imagesRef now points to 'logo'
      // Delete the file
      deleteObject(imagesRef)
        .then(() => {
          console.log('logo reset');
        })
        .catch(error => {
          console.log(error);
        });
    },
    getLogo() {
      const storage = getStorage();
      getDownloadURL(ref(storage, 'logo'))
        .then(url => {
          const img = document.getElementById('logo');
          img.setAttribute('src', url);
          // this.logoIsUploaded;
        })
        .catch(error => {
          console.log(error);
        });
    },
    addPageForm() {
      this.$store.commit('addPageForm');
    },
    uploadLogoForm() {
      this.$store.commit('uploadLogoForm');
    },
    // logoIsUploaded() {
    //   this.$store.commit('logoIsUploaded');
    // },
    closeForm() {
      // this goes to the store to call a function called closeForm
      this.$store.commit('closeForm');
    },
    logOut() {
      // this goes to the store to call a function called closeForm
      this.$store.commit('logOut');
    },
    changeHandler(e) {
      const types = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg'];
      let selected = e.target.files[0];
      console.log(selected);

      if (selected && types.includes(selected.type)) {
        this.logo = selected;
        this.fileError = false;
      } else {
        this.fileError = true;
      }
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
#logo {
  width: 80%;
  height: 7rem;
}
nav {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
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
  cursor: pointer;
  margin-left: 35px;
}
.router-link-active {
  background-color: var(--primary-color);
  color: var(--secondary-color);
}

.sidebar .router-link-active a {
  color: var(--secondary-color);
}
.bottom-menu {
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
}
.bottom-menu img {
  width: 2rem;
  margin: 0 1rem;
}
#addForm,
#addlogoForm {
  position: fixed;
  width: 60vw;
  height: 40vh;
  background: var(--primary-color);
  left: 20%;
  top: 30%;
  border-radius: 1rem;
  border: 2px solid #fff;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
#addForm h2,
#addlogoForm h2,
#addForm div,
#addlogoForm div {
  text-align: center;
  color: var(--secondary-color);
  font-size: 2rem;
}
#addForm div input,
#addlogoForm div input {
  width: 40vw;
  height: 7vh;
  margin: 1rem;
  padding: 1rem;
  background-color: var(--primary-color);
  border: 2px solid var(--secondary-color);
  font-size: 1.5rem;
  color: var(--secondary-color);
}
#addForm div input:focus,
#addlogoForm div input:focus {
  border: 5px solid var(--secondary-color);
}
#addForm button,
#addlogoForm button {
  width: 10vw;
  height: 5vh;
  color: #0d161c;
  font-size: 1.5rem;
  background-color: var(--secondary-color);
  cursor: pointer;
}
#addForm .close,
#addlogoForm .close {
  position: absolute;
  right: 2rem;
  top: 1rem;
  cursor: pointer;
}
.uploadLogoBtn {
  position: absolute;
  top: 5%;
  left: 20%;
  width: 8rem;
}
.resetLogoBtn {
  position: absolute;
  top: 10%;
  left: 20%;
  width: 8rem;
}
.errorFile {
  color: red;
  font-size: 1rem;
  margin: 1rem 0;
}
.bin {
  position: relative;
  right: 5%;
  top: 0;
  width: 1.5rem;
  transition: 0.2s ease-in-out;
}
.bin:hover {
  transform: scaleX(1.1);
}
</style>
