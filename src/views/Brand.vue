<template>
  <div>
    <!-- this v-if shows one of the two sidebars depending on what the user prefers. -->
    <Navigation v-if="!lessSideBar" />
    <Navigation2 v-else />
    <!-- The main content starts here -->
    <section class="content">
      <h1>BRAND IN USE</h1>
      <div>
        <p>
          We want our brand to be expressed throughout the entire world. We want
          to visualize our vision with the use of concepts and art-like
          expressions. Take a look at some of our ideas:
        </p>
      </div>
      <div v-for="image in images" :key="image" class="artboards">
        <img :src="image" />
        <img
          v-if="loggedIn"
          :id="image"
          @click="removeImage"
          class="bin"
          src="../images/trash.svg"
        />
      </div>
    </section>
    <div class="editDiv" v-if="!editable && loggedIn">
      <div
        @click="uploadbrandImagesForm"
        @mouseover="pencilHovered2 = true"
        @mouseleave="pencilHovered2 = false"
        class="editBtn uploadImage"
      >
        <img src="../images/uploadImage.svg" />
      </div>
      <div v-if="pencilHovered2" class="editOnHover2">Upload Image</div>
    </div>
    <!-- form for uploading logo -->
    <form @submit.prevent="addImages" id="addImagesForm" v-if="brandImagesForm">
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
  </div>
  <!-- content ends here -->
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import Navigation2 from '@/components/Navigation2.vue';
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
  components: {
    Navigation,
    Navigation2,
  },
  name: 'Brand',
  data() {
    return {
      images: [],
      pencilHovered2: false,
      editable: false,
      imageUpload: null,
      fileError: false,
    };
  },
  computed: {
    lessSideBar() {
      return this.$store.state.lessSideBar;
    },
    brandImagesForm() {
      // this returns the state of "logoForm". I used this for v-if to know when to show the form
      return this.$store.state.brandImagesForm;
    },
    loggedIn() {
      return this.$store.state.loggedIn;
    },
  },
  mounted: function () {
    this.getImages();
  },
  methods: {
    addImages() {
      const storage = getStorage();
      let image = this.imageUpload;
      const imageRef = ref(storage, `brandinuse/${image.name + v4()}`);
      this.uploading = true;
      uploadBytes(imageRef, this.imageUpload).then(snapshot => {
        getDownloadURL(snapshot.ref).then(url => {
          this.images.push(url);
        });
        this.uploading = false;
      });
      this.closeForm();
    },
    getImages() {
      const storage = getStorage();
      const imagesListRef = ref(storage, 'brandinuse/');
      listAll(imagesListRef).then(response => {
        response.items.forEach(item => {
          getDownloadURL(item).then(url => {
            this.images.push(url);
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
          this.images = [];
          const storage = getStorage();
          const imagesListRef = ref(storage, 'brandinuse/');
          listAll(imagesListRef).then(response => {
            response.items.forEach(item => {
              getDownloadURL(item).then(url => {
                this.images.push(url);
              });
            });
          });
        })
        .catch(error => {
          console.log(error);
        });
      console.log(e.target.id);
    },
    uploadbrandImagesForm() {
      this.$store.commit('uploadbrandImagesForm');
    },
    closeForm() {
      // this goes to the store to call a function called closeForm
      this.$store.commit('closeForm');
    },
    changeHandler(e) {
      this.imageUpload = e.target.files[0];
    },
  },
};
</script>

<style scoped>
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
  z-index: 10;
  background-color: var(--primary-color);
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
#addImagesForm div input:focus {
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
.errorFile {
  color: red;
  font-size: 1rem;
  margin: 1rem 0;
}
.uploadImage {
  margin-right: 10rem;
}
.bin {
  cursor: pointer;
  width: 20% !important;
  background-color: #0d161c;
  height: 4rem;
  padding: 1rem;
  margin-bottom: 5rem;
  border-radius: 10px;
}
.content img {
  padding-top: 10px;
  width: 100%;
}
@media (max-width: 1400px) {
  .content h1 {
    font-size: 2rem;
  }
  .content {
    margin-left: 450px;
    width: 50vw;
  }
  .content p {
    width: 50vw;
  }
}

@media (max-width: 900px) {
  .content h1 {
    font-size: 2rem;
  }
  .content {
    margin-left: 350px;
    width: 40vw;
  }
  .content p {
    width: 40vw;
  }
}
@media (max-width: 600px) {
  .content h1 {
    font-size: 2rem;
    text-align: center;
    margin-top: 5rem;
  }
  .content {
    margin: auto;
    width: 100%;
    margin-top: 5rem;
  }
  .content p {
    padding-top: 5rem;
    margin: auto;
    width: 80%;
    text-align: center;
    font-size: 1rem;
    line-height: 2rem;
  }
  .artboards {
    width: 80%;
    margin: auto;
  }
}
</style>
