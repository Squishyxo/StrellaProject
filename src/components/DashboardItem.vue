<template>
  <div id="content">
    <!-- h1 that gets the title as a prop from DashboardPage component -->
    <h1>{{ title }}</h1>
    <!-- Dynamic class to style the paragraph -->
    <p
      id="textInput"
      :class="[editable ? 'edit-border' : '']"
      :v-model="textInput"
    >
      {{ text }}
    </p>
    <!-- this div is for the pencil and is only visible when logged in -->
    <div class="editDiv" v-if="!editable && loggedIn">
      <div
        @click="editText"
        @mouseover="pencilHovered = true"
        @mouseleave="pencilHovered = false"
        class="editBtn"
      >
        <img src="../images/pen.svg" />
      </div>
      <div v-if="pencilHovered" class="editOnHover">edit text</div>
    </div>
    <div class="editDiv" v-if="!editable && loggedIn">
      <div
        @click="uploadImagesForm"
        @mouseover="pencilHovered2 = true"
        @mouseleave="pencilHovered2 = false"
        class="editBtn uploadImage"
      >
        <img src="../images/uploadImage.svg" />
      </div>
      <div v-if="pencilHovered2" class="editOnHover2">Upload Image</div>
    </div>
    <!-- form for uploading logo -->
    <form @submit.prevent="addImages" id="addImagesForm" v-if="imagesForm">
      <div @click="closeForm" class="close">&#x2718;</div>
      <h2>UPLOAD IMAGE</h2>
      <div>
        <label for="logo">Upload Image</label>
        <input
          @change="changeHandler"
          class="nameInput"
          type="file"
          name="image"
          id="image"
          ref="logo"
          accept="image/*"
          placeholder="Upload Image"
          required
        />
        <p v-if="fileError" class="errorFile">
          Please select an image file (png, jpeg, jpg, svg)
        </p>
        <button type="submit">+</button>
      </div>
    </form>
    <!-- This div is only visible when you are editing the text -->
    <div class="save-changes" v-if="editable">
      <p>
        You can click on the text and start editing, when you finish click save.
      </p>
      <button @click="discardChanges">DISCARD CHANGES</button>
      <button @click="saveChanges">SAVE CHANGES</button>
    </div>
    <div v-if="images">
      <div class="imagesContainer" v-for="image in imagesList" :key="image">
        <img class="image" :src="image" />
        <img
          v-if="loggedIn"
          :id="image"
          @click="removeImage"
          class="bin"
          src="../images/trash.svg"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from 'firebase/firestore';
import db from '../store/database';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from 'firebase/storage';
import { v4 } from 'uuid';
export default {
  name: 'DashboardItem',
  props: {
    title: String,
    text: String,
  },
  data() {
    return {
      text: '',
      textInput: '',
      tempDoc: '',
      pencilHovered: false,
      pencilHovered2: false,
      editable: false,
      fileError: false,
      imagesList: [],
      imageUpload: null,
      images: false,
    };
  },
  // this function runs immediately when the page is loaded.
  mounted: function () {
    this.getPagesText();
    this.updateDocId();
    this.getImages();
  },
  // watching the route, whenever it changes I want to get the text that is for that route.
  watch: {
    $route() {
      this.getPagesText();
      this.updateDocId();
      this.checkPage();
    },
  },
  // computed properties to get the states from the store.
  computed: {
    editTextPopUp() {
      // this returns the state of "editTextPopUp". I used this for v-if to know when to show the form
      return this.$store.state.editTextPopUp;
    },
    loggedIn() {
      return this.$store.state.loggedIn;
    },
    imagesForm() {
      // this returns the state of "logoForm". I used this for v-if to know when to show the form
      return this.$store.state.imagesForm;
    },
  },
  methods: {
    getPagesText() {
      // getting the pages from firebase and add them to local array
      onSnapshot(collection(db, 'pages'), snapshot => {
        console.log(this.$route.params.id);
        this.text = '';
        snapshot.docs.forEach(doc => {
          if (doc.data().Name === this.$route.params.id) {
            this.text = doc.data().text;
          }
        });
      });
    },
    editText() {
      this.editable = !this.editable;
      document.getElementById('textInput').contentEditable = this.editable;
      this.$store.commit('editText');
    },
    discardChanges() {
      this.pencilHovered = false;
      this.editable = false;
      this.getPagesText;
    },
    async updateDocId() {
      const q = query(
        collection(db, 'pages'),
        where('Name', '==', this.$route.params.id)
      );
      const s = await getDocs(q);
      s.forEach(doc => {
        this.tempDoc = doc.id;
        console.log(this.tempDoc);
      });
    },
    saveChanges() {
      this.textInput = document.getElementById('textInput').innerText;
      setDoc(doc(db, 'pages', this.tempDoc), {
        Name: this.$route.params.id,
        text: this.textInput,
      });
      this.pencilHovered = false;
      this.editable = false;
      this.pencilHovered = false;
    },
    uploadImagesForm() {
      this.$store.commit('uploadImagesForm');
    },
    addImages() {
      const storage = getStorage();
      let image = this.imageUpload;
      const imageRef = ref(storage, `images/${image.name + v4()}`);
      uploadBytes(imageRef, this.imageUpload).then(snapshot => {
        getDownloadURL(snapshot.ref).then(url => {
          this.imagesList.push(url);
        });
      });
      this.closeForm();
    },
    getImages() {
      const storage = getStorage();
      const imagesListRef = ref(storage, 'images/');
      listAll(imagesListRef).then(response => {
        response.items.forEach(item => {
          getDownloadURL(item).then(url => {
            this.imagesList.push(url);
            // console.log(this.imagesList);
          });
        });
      });
    },
    removeImage(e) {
      const storage = getStorage();
      // Create a reference to the file to delete
      const imageRef = ref(storage, e.target.id);
      // Delete the file
      deleteObject(imageRef)
        .then(() => {
          console.log('deleted');
        })
        .catch(error => {
          console.log(error);
        });
      console.log(e.target.id);
    },
    checkPage() {
      if (this.$route.params.id === 'images') {
        this.images = true;
      } else {
        this.images = false;
      }
    },
    changeHandler(e) {
      this.imageUpload = e.target.files[0];
    },
    closeForm() {
      // this goes to the store to call a function called closeForm
      this.$store.commit('closeForm');
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
  font-size: 1.3rem;
}
.editBtn {
  position: absolute;
  right: 10%;
  top: 17%;
  width: 100px;
  border: 2px solid var(--secondary-color);
  border-radius: 50%;
  padding: 15px;
  background-color: #0d161c;
  cursor: pointer;
  z-index: 1;
  overflow: hidden;
}
.editOnHover {
  position: absolute;
  right: 10%;
  top: 11%;
  border: 2px solid var(--secondary-color);
  padding: 10px;
  width: 10rem;
  height: 50px;
  text-align: center;
  background-color: var(--primary-color);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  text-transform: uppercase;
}
.editOnHover2 {
  position: absolute;
  right: 20%;
  top: 11%;
  border: 2px solid var(--secondary-color);
  padding: 10px;
  width: 10rem;
  height: 50px;
  text-align: center;
  background-color: var(--primary-color);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  text-transform: uppercase;
}
.edit-border {
  border: 0.3rem inset var(--secondary-color);
  padding: 2rem;
}
.save-changes {
  border: 0.2rem solid var(--secondary-color);
  position: relative;
  padding: 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 7rem;
  margin: 15% 0;
}
.save-changes p {
  margin-top: 0 !important;
}
.save-changes button {
  width: 12rem;
  margin: 0.3rem;
  padding: 0.3rem;
  font-size: 0.8rem;
}
.save-changes button:nth-child(2) {
  background: #e74c3c;
  color: var(--primary-color);
  padding-bottom: 0.3rem;
}
#editTextForm {
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
#editTextForm h2,
#editTextForm div {
  text-align: center;
  color: var(--secondaryColor);
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#editTextForm div input {
  width: 40vw;
  height: 7vh;
  margin: 1rem;
  padding: 1rem;
  background-color: var(--primaryColor);
  border: 2px solid var(--secondaryColor);
  font-size: 1.5rem;
  color: var(--secondaryColor);
}
#editTextForm div input:focus {
  border: 5px solid var(--secondaryColor);
}
#editTextForm button {
  width: 10vw;
  height: 5vh;
  color: var(--primaryColor);
  font-size: 1.5rem;
  background-color: var(--secondaryColor);
  cursor: pointer;
}
#editTextForm .close {
  position: absolute;
  right: 2rem;
  top: 1rem;
  cursor: pointer;
}
#addImagesForm {
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
#addImagesForm h2,
#addImagesForm div {
  text-align: center;
  color: var(--secondaryColor);
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#addImagesForm div input {
  width: 40vw;
  height: 7vh;
  margin: 1rem;
  padding: 1rem;
  background-color: var(--primaryColor);
  border: 2px solid var(--secondaryColor);
  font-size: 1.5rem;
  color: var(--secondaryColor);
}
#addImagesFormdiv input:focus {
  border: 5px solid var(--secondaryColor);
}
#addImagesForm button {
  width: 10vw;
  height: 5vh;
  color: var(--primaryColor);
  font-size: 1.5rem;
  background-color: var(--secondaryColor);
  cursor: pointer;
}
#addImagesForm .close {
  position: absolute;
  right: 2rem;
  top: 1rem;
  cursor: pointer;
}
.imagesContainer {
  margin-top: 10rem;
}
.image {
  width: 100%;
}
.bin {
  cursor: pointer;
}
.uploadImage {
  margin-right: 10rem;
}
</style>
