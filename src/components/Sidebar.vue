<template>
  <nav class="sidebar">
    <img class="logo" id="logo" src="" alt="logo" />
    <p v-if="waiting" class="waiting">Uploading....</p>
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
          @click="deletingPageConfirmationForm"
          class="bin"
          src="../images/trash.svg"
        />
      </li>
      <li v-if="loggedIn" @click="addPageForm"><a>+</a></li>
    </ul>
    <div class="bottom-menu">
      <img src="../images/colorpicker.svg" @click="addColorsForm" />
      <router-link v-if="loggedIn" to="/dashboard/selector">
        <img src="../images/dashboard.svg" />
      </router-link>
      <div class="login">
        <router-link to="/Login">
          <img v-if="!loggedIn" src="../images/login.svg" />
        </router-link>
        <img
          @click="logOut"
          class="logOut"
          v-if="loggedIn"
          src="../images/logout.svg"
        />
      </div>
    </div>
  </nav>
  <button class="uploadLogoBtn" v-if="loggedIn" @click="uploadLogoForm">
    Upload Logo
  </button>
  <button class="resetLogoBtn" v-if="loggedIn" @click="logoResetWarningForm">
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
      <button class="pickRandomColors" @click="pickRandomColors">
        GENERATE RANDOM COLORS
      </button>
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
  <!-- confirmation for removing logo -->
  <div id="addForm" class="deleteConfirmation" v-if="logoResetWarning">
    <div @click="closeForm" class="close">&#x2718;</div>
    <h1>Reset Logo</h1>
    <p>This will reset the logo</p>
    <div>
      <button @click="closeForm">Cancel</button>
      <button @click="resetLogo">Confirm</button>
    </div>
  </div>
  <!-- confirmation for deleting page -->
  <div id="addForm" class="deleteConfirmation" v-if="deletingPageConfirmation">
    <div @click="closeForm" class="close">&#x2718;</div>
    <h1>Remove Page</h1>
    <p>You will lose the page and all its data</p>
    <div>
      <button @click="closeForm">Cancel</button>
      <button @click="removePage">Confirm</button>
    </div>
  </div>
  <DashboardPhoneNav />
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
import DashboardPhoneNav from '../components/DashboardPhoneNav.vue';

export default {
  components: { DashboardPhoneNav },
  data() {
    return {
      pagesArray: [],
      namePage: '',
      logo: null,
      fileError: false,
      tempDoc: '',
      waiting: false,
      tempDocPage: '',
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
      // this returns the state of "updatePageFormPopUp". I used this for v-if to know when to show the form
      return this.$store.state.updatePageFormPopUp;
    },
    loggedIn() {
      // this returns the state of "loggedIn".
      return this.$store.state.loggedIn;
    },
    logoResetWarning() {
      // this returns the state of "logoResetWarning".
      return this.$store.state.logoResetWarning;
    },
    deletingPageConfirmation() {
      // this returns the state of "deletingPageConfirmation".
      return this.$store.state.deletingPageConfirmation;
    },
  },
  // this function runs immediately when the page is loaded.
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
    removePage() {
      // Remove the clicked page's id from the document
      deleteDoc(doc(db, 'pages', this.tempDocPage));
      this.tempDocPage = '';
      this.closeForm();
    },
    addLogo() {
      const storage = getStorage();
      // Create a child reference
      const imagesRef = ref(storage, 'logo/');
      // imagesRef now points to 'logo'
      let value = this.logo;
      console.log(value);
      this.waiting = true;
      uploadBytes(imagesRef, value)
        .then(snapshot => {
          console.log('Uploaded a blob or file!');
        })
        .then(() => {
          getDownloadURL(ref(storage, 'logo'))
            .then(url => {
              const img = document.getElementById('logo');
              img.setAttribute('src', url);
              this.getLogo();
              this.waiting = false;
            })
            .catch(error => {
              console.log(error);
            });
        });
      this.closeForm();
      this.getLogo();
    },
    resetLogo() {
      const storage = getStorage();
      // Create a child reference
      const imagesRef = ref(storage, 'logo');
      // imagesRef now points to 'logo'
      // Delete the file
      deleteObject(imagesRef)
        .then(() => {
          const img = document.getElementById('logo');
          img.setAttribute('src', '');
        })
        .catch(error => {
          console.log(error);
        });
      this.closeForm();
    },
    // this function will check whether there is already a logo in the backend or not. if yes, it will replace it, if not, it will upload a new logo file.
    getLogo() {
      const storage = getStorage();
      getDownloadURL(ref(storage, 'logo'))
        .then(url => {
          const img = document.getElementById('logo');
          img.setAttribute('src', url);
          this.getLogo();
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
    // taking the user input then using setDoc to change data from backend. once the data is changed, the user should get new theme colors immediately.
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
    // generating random colors if the user does not want to enter colors by themselves. Then using setDoc again to send it to the backend.
    pickRandomColors() {
      let randomNumber = Math.floor(Math.random() * 12);
      let themeColors = [
        { 1: '#ffb703', 2: '#023047', 3: '#219ebc' },
        { 1: '#ffb703', 2: '#023047', 3: '#219ebc' },
        { 1: '#ffb703', 2: '#023047', 3: '#219ebc' },
        { 1: '#faedcd', 2: '#d4a373', 3: '#e9edc9' },
        { 1: '#ffc300', 2: '#000814', 3: '#003566' },
        { 1: '#9a8c98', 2: '#22223b', 3: '#f2e9e4' },
        { 1: '#9a8c98', 2: '#22223b', 3: '#f2e9e4' },
        { 1: '#9a8c98', 2: '#22223b', 3: '#f2e9e4' },
        { 1: '#f9dbbd', 2: '#450920', 3: '#a53860' },
        { 1: '#778da9', 2: '#1b263b', 3: '#0d1b2a' },
        { 1: '#8fb996', 2: '#111d13', 3: '#415d43' },
        { 1: '#c9b1bd', 2: '#567568', 3: '#d5dfe5' },
      ];
      setDoc(doc(db, 'colors', 'hZ6Zz9eF3QSGmwbpXcA0'), {
        primaryColor: themeColors[randomNumber][1],
        secondaryColor: themeColors[randomNumber][2],
        thirdColor: themeColors[randomNumber][3],
      });
      this.closeForm();
    },
    // goes to the store to call function addPageForm
    addPageForm() {
      this.$store.commit('addPageForm');
    },
    // goes to the store to call function addColorsForm
    addColorsForm() {
      this.$store.commit('addColorsForm');
    },
    logoResetWarningForm() {
      this.$store.commit('logoResetWarning');
    },
    deletingPageConfirmationForm(e) {
      this.tempDocPage = e.target.id;
      this.$store.commit('deletingPageConfirmation');
    },
    // goes to the store to call function uploadLogoForm
    uploadLogoForm() {
      this.$store.commit('uploadLogoForm');
    },
    // goes to the store to call function updatePageForm, and passing e to get the id of the clicked page, and store it to a local variable.
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
  margin-top: 2rem;
  width: 70%;
  height: 15%;
  color: var(--primaryColor);
}
nav {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: var(--secondaryColor);
  width: 16.6vw;
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
  width: 16.6vw;
}
nav ul li a {
  text-decoration: none;
  color: var(--primaryColor);
  font-size: 1.5rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16.6vw;
}
.bottom-menu {
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
  width: 100%;
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
  z-index: 10;
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
  z-index: 10;
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
  margin-top: 1rem;
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

nav ul li .router-link-active {
  background-color: var(--primaryColor);
  color: var(--secondaryColor);
}

nav ul li .router-link-active a {
  color: var(--secondaryColor);
}
.pickRandomColors {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  width: 10rem;
  font-size: 0.6rem;
}
.waiting {
  position: absolute;
  top: 3vh;
  left: 4vw;
  font-size: 2rem;
  color: var(--primaryColor);
}
.deleteConfirmation {
  padding: 1rem;
}
.deleteConfirmation p {
  width: 50%;
  background-color: #edd1d3;
  color: #ff0000;
  padding: 1rem 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  border-radius: 5px;
}
.deleteConfirmation div {
  width: 100%;
  display: flex;
  flex-direction: row !important;
  justify-content: end !important;
}
.deleteConfirmation div button {
  margin: 0 1rem;
}
.deleteConfirmation div button:nth-child(2) {
  background-color: #ff0000 !important;
  color: #fff !important;
}
@media (max-width: 1400px) {
  #logo {
    width: 60%;
    height: 10%;
  }
  .uploadLogoBtn,
  .resetLogoBtn {
    width: 5rem;
    line-height: 1rem;
    height: 3rem;
  }
}
@media (max-width: 1300px) {
  #logo {
    width: 80%;
    height: 10%;
  }
  nav ul li a {
    font-size: 1.2rem;
  }
}
@media (max-width: 900px) {
  #logo {
    width: 80%;
    height: 10%;
  }
  nav ul li a {
    font-size: 1rem;
  }
}
</style>
