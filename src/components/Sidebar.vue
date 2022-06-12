<template>
  <nav class="sidebar">
    <img class="logo" id="logo" src="" alt="logo" />
    <ul>
      <!-- Looping through an array and display the content inside it -->
      <li v-for="page in pagesArray" :key="page.id">
        <router-link :to="`/dashboard/${page.name}`"
          ><a>{{ page.name }}</a></router-link
        >
        <img
          v-if="loggedIn"
          :id="page.id"
          @click="updatePageForm"
          class="bin update"
          src="../images/update.svg"
        />
        <img
          v-if="loggedIn"
          :id="page.id"
          @click="removePage"
          class="bin"
          src="../images/trash.svg"
        />
      </li>
      <li v-if="loggedIn" @click="addPageForm"><a>+</a></li>
    </ul>
    <div class="bottom-menu">
      <img src="../images/contrast.svg" @click="addColorsForm" />
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
  <!-- form for picking colors -->
  <form @submit.prevent="addColors" id="addColorsForm" v-if="colorsForm">
    <div @click="closeForm" class="close">&#x2718;</div>
    <h2>PICK 3 MAIN COLORS</h2>
    <div>
      <label for="color">Primary Color</label>
      <input
        type="color"
        name="logo"
        id="primary-color"
        placeholder="Hex Code"
        required
      />
      <label for="color">Secondary Color</label>
      <input
        type="color"
        name="logo"
        id="secondary-color"
        placeholder="Hex Code"
        required
      />
      <label for="color">Third Color</label>
      <input
        type="color"
        name="logo"
        id="third-color"
        placeholder="Hex Code"
        required
      />
      <button type="submit">APPLY COLORS</button>
    </div>
  </form>
  <!-- form for updating page -->
  <form
    @submit.prevent="updatePage"
    id="addlogoForm"
    v-if="updatePageFormPopUp"
  >
    <div @click="closeForm" class="close">&#x2718;</div>
    <h2>UPDATE PAGE</h2>
    <div>
      <label for="logo">New Page Name</label>
      <input
        v-model="namePage"
        class="nameInput"
        type="text"
        placeholder="Enter new page name"
        required
      />
      <button type="submit">+</button>
    </div>
  </form>
</template>

<script>
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
  setDoc,
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
      pagesArray: [],
      namePage: '',
      logo: null,
      fileError: false,
      tempDoc: '',
    };
  },
  computed: {
    popUp() {
      // this returns the state of "popUp". I used this for v-if to know when to show the form
      return this.$store.state.popUp;
    },
    logoForm() {
      // this returns the state of "logoForm". I used this for v-if to know when to show the form
      return this.$store.state.logoForm;
    },
    colorsForm() {
      // this returns the state of "colorsForm". I used this for v-if to know when to show the form
      return this.$store.state.colorsForm;
    },
    updatePageFormPopUp() {
      return this.$store.state.updatePageFormPopUp;
    },
    // logoIsUploaded() {
    //   // this returns the state of "logoIsUploaded". I used this for v-if to know when to show the form
    //   return this.$store.state.logoIsUploaded;
    // },
    loggedIn() {
      return this.$store.state.loggedIn;
    },
  },
  mounted: function () {
    this.getPages();
    this.getLogo();
    this.getColors();
  },
  methods: {
    addPage() {
      // getting page name from a form
      let newPage = this.namePage;
      if (newPage != '') {
        // making sure that the user entered some text else an alert is thrown
        addDoc(collection(db, 'pages'), {
          Name: newPage,
          text: 'Add Text',
          // id: key
        });
      } else {
        alert('you did not enter anything');
      }
      this.closeForm();
      this.namePage = '';
    },
    getPages() {
      // getting the pages from firebase and add them to local array
      onSnapshot(collection(db, 'pages'), snapshot => {
        this.pagesArray = [];
        snapshot.docs.forEach(doc => {
          let pages = {
            id: doc.id,
            name: doc.data().Name,
            text: doc.data().text,
          };
          this.pagesArray.push(pages);
          this.pagesArray.reverse();
        });
      });
    },
    removePage(e) {
      let clickedId = e.target.id;
      // Remove the clicked page's id from the document
      deleteDoc(doc(db, 'pages', clickedId));
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
    getColors() {
      // getting the colors from firebase and save them
      onSnapshot(doc(db, 'colors', 'hZ6Zz9eF3QSGmwbpXcA0'), doc => {
        const data = doc.data();
        console.log(data.primaryColor);
        console.log(data.secondaryColor);
        console.log(data.thirdColor);
        document.documentElement.style.setProperty(
          '--primaryColor',
          data.primaryColor
        );
        document.documentElement.style.setProperty(
          '--secondaryColor',
          data.secondaryColor
        );
        document.documentElement.style.setProperty(
          '--thirdColor',
          data.thirdColor
        );
      });
    },
    addColors() {
      let primaryColor = document.getElementById('primary-color').value;
      let secondaryColor = document.getElementById('secondary-color').value;
      let thirdColor = document.getElementById('third-color').value;
      setDoc(doc(db, 'colors', 'hZ6Zz9eF3QSGmwbpXcA0'), {
        primaryColor: primaryColor,
        secondaryColor: secondaryColor,
        thirdColor: thirdColor,
      });
      this.closeForm();
    },
    addPageForm() {
      this.$store.commit('addPageForm');
    },
    addColorsForm() {
      this.$store.commit('addColorsForm');
    },
    uploadLogoForm() {
      this.$store.commit('uploadLogoForm');
    },
    updatePageForm(e) {
      this.tempDoc = e.target.id;
      this.$store.commit('updatePageForm');
    },
    updatePage() {
      setDoc(doc(db, 'pages', this.tempDoc), {
        Name: this.namePage,
        text: 'add text',
      });
      this.closeForm();
      this.pagesArray = [];
      this.namePage = '';
    },
    closeForm() {
      this.tempDoc = '';
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
  --primaryColor: #fff;
  --secondaryColor: #0d161c;
  --thirdColor: #333333;
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
  background-color: var(--primaryColor);
  color: var(--secondaryColor);
}
#logo {
  width: 80%;
  height: 7rem;
  color: var(--primaryColor);
}
nav {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: var(--secondaryColor);
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
  height: 10vh;
  display: flex;
  align-content: center;
  justify-content: center;
  text-transform: uppercase;
  border-bottom: 0.1px solid var(--primaryColor);
}
nav ul li a {
  text-decoration: none;
  color: var(--primaryColor);
  font-size: 1.5rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20rem;
}

.logOut {
  cursor: pointer;
  margin-left: 35px;
}
.bottom-menu {
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
}
.bottom-menu img {
  width: 2rem;
  margin: 0 1rem;
  cursor: pointer;
}
#addForm,
#addlogoForm {
  position: fixed;
  width: 60vw;
  height: 40vh;
  background: var(--primaryColor);
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
#addColorsForm {
  position: fixed;
  width: 60vw;
  height: 60vh;
  background: var(--primaryColor);
  left: 20%;
  top: 25%;
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
#addColorsForm h2,
#addForm div,
#addColorsForm div,
#addlogoForm div {
  text-align: center;
  color: var(--secondaryColor);
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#addForm div input,
#addlogoForm div input {
  width: 40vw;
  height: 7vh;
  margin: 1rem;
  padding: 1rem;
  background-color: var(--primaryColor);
  border: 2px solid var(--secondaryColor);
  font-size: 1.5rem;
  color: var(--secondaryColor);
}
#addColorsForm div input {
  width: 10vw;
  height: 5vh;
  margin: 1rem;
  padding: 0.6rem;
  background-color: var(--primaryColor);
  border: 2px solid var(--secondaryColor);
  font-size: 1rem;
  color: var(--secondaryColor);
}
#addForm div input:focus,
#addlogoForm div input:focus {
  border: 5px solid var(--secondaryColor);
}
#addForm button,
#addlogoForm button {
  width: 10vw;
  height: 5vh;
  color: var(--primaryColor);
  font-size: 1.5rem;
  background-color: var(--secondaryColor);
  cursor: pointer;
}
#addForm .close,
#addlogoForm .close,
#addColorsForm .close {
  position: absolute;
  right: 2rem;
  top: 1rem;
  cursor: pointer;
}
.uploadLogoBtn {
  background-color: var(--secondaryColor);
  color: var(--primaryColor);
  position: absolute;
  top: 5%;
  left: 20%;
  width: 8rem;
}
.resetLogoBtn {
  background-color: var(--secondaryColor);
  color: var(--primaryColor);
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
.update {
  margin-left: 1rem;
}
nav ul li {
  display: flex;
  justify-content: space-between;
  width: 20rem;
}
nav ul li a {
  width: 100%;
}
nav ul li .router-link-active {
  background-color: var(--primaryColor);
  color: var(--secondaryColor);
}

nav ul li .router-link-active a {
  color: var(--secondaryColor);
}
</style>
