<template>
  <div>
    <!-- this v-if shows one of the two sidebars depending on what the user prefers. -->
    <Navigation v-if="!lessSideBar" />
    <Navigation2 v-else />
    <!-- The main content starts here -->
    <section class="content">
      <h1>Colors</h1>
      <main class="grid">
        <article
          v-for="color in colorsArray"
          :key="color.id"
          :style="{ borderRight: `30px solid ${color.hexCode}` }"
        >
          <p>{{ color.name }}</p>
          <hr :style="{ borderTop: `15px solid ${color.hexCode}` }" />
          <div class="hex-code">{{ color.hexCode }}</div>
          <img
            v-if="loggedIn && lightTheme"
            :id="color.id"
            @click="deletingColorConfirmationForm"
            class="bin"
            src="../images/trash.svg"
          />
          <img
            v-if="loggedIn && !lightTheme"
            :id="color.id"
            @click="deletingColorConfirmationForm"
            class="bin"
            src="../images/blackBin.svg"
          />
        </article>
      </main>
    </section>
    <div class="editDiv" v-if="loggedIn && !editable">
      <div
        @click="addBalenciagaColorsForm"
        @mouseover="pencilHovered = true"
        @mouseleave="pencilHovered = false"
        class="editBtn"
      >
        <img src="../images/pen.svg" />
      </div>
      <div v-if="pencilHovered" class="editOnHover">UPLOAD A COLOR</div>
    </div>
    <router-link to="/brand"
      ><button class="next-btn" v-if="!loggedIn">NEXT</button></router-link
    >
    <!-- form for picking colors -->
    <form
      @submit.prevent="addBalenciagaColors"
      id="addColorsForm"
      v-if="balenciagaColorsForm"
    >
      <div @click="closeForm" class="close">&#x2718;</div>
      <h2>UPLOAD A NEW COLOR</h2>
      <div>
        <label for="colorName">Give the color a name (optional)</label>
        <input
          v-model="newColorName"
          type="text"
          name="colorName"
          id="colorName"
        />
        <label for="color">Pick a color</label>
        <input
          v-model="newColorHexCode"
          type="color"
          name="logo"
          id="color"
          placeholder="Hex Code"
          required
        />
        <button type="submit">UPLOAD COLOR</button>
      </div>
    </form>
    <!-- confirmation for deleting color -->
    <div
      id="addForm"
      class="deleteConfirmation"
      v-if="deletingColorConfirmation"
    >
      <div @click="closeForm" class="close">&#x2718;</div>
      <h1>Remove Color</h1>
      <p>You will delete the color permanently</p>
      <div>
        <button @click="closeForm">Cancel</button>
        <button @click="removeColor">Confirm</button>
      </div>
    </div>
  </div>
  <!-- content ends here -->
</template>

<script>
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import db from '../store/database';
import { getStorage, ref } from 'firebase/storage';
import Navigation from '@/components/Navigation.vue';
import Navigation2 from '@/components/Navigation2.vue';
export default {
  components: {
    Navigation,
    Navigation2,
  },
  name: 'Colors',
  data() {
    return {
      colorsArray: [],
      newColorName: '',
      newColorHexCode: '',
      pencilHovered: false,
      editable: false,
      tempDocColor: '',
    };
  },
  mounted: function () {
    this.getBalenciagaColors();
    this.getPictures();
  },
  computed: {
    lessSideBar() {
      return this.$store.state.lessSideBar;
    },
    loggedIn() {
      return this.$store.state.loggedIn;
    },
    lightTheme() {
      return this.$store.state.lightTheme;
    },
    balenciagaColorsForm() {
      // this returns the state of "balenciagaColorsForm". I used this for v-if to know when to show the form
      return this.$store.state.balenciagaColorsForm;
    },
    deletingColorConfirmation() {
      // this returns the state of "deletingColorConfirmation".
      return this.$store.state.deletingColorConfirmation;
    },
  },
  methods: {
    addBalenciagaColors() {
      // getting page name from a form
      let newColorName = this.newColorName;
      let newColorHexCode = this.newColorHexCode;
      if (newColorHexCode != '') {
        // making sure that the user entered some text else an alert is thrown
        addDoc(collection(db, 'balenciagaColors'), {
          name: newColorName,
          hexCode: newColorHexCode,
        });
      } else {
        alert('you did not enter anything');
      }
      this.closeForm();
      this.newColorName = '';
      this.newColorHexCode = '';
    },
    getBalenciagaColors() {
      // getting the pages from firebase and add them to local array
      onSnapshot(collection(db, 'balenciagaColors'), snapshot => {
        this.colorsArray = [];
        snapshot.docs.forEach(doc => {
          let colors = {
            id: doc.id,
            name: doc.data().name,
            hexCode: doc.data().hexCode,
          };
          this.colorsArray.push(colors);
          this.colorsArray.reverse();
        });
      });
    },
    getPictures() {
      const storage = getStorage();
      const storageRef = ref(storage);
      const imagesRef = ref(storage, 'brandinuse/');
      console.log(storageRef);
      console.log(imagesRef);
    },
    removeColor() {
      // Remove the clicked page's id from the document
      deleteDoc(doc(db, 'balenciagaColors', this.tempDocColor));
      this.closeForm();
      this.tempDocColor = '';
    },
    addBalenciagaColorsForm() {
      this.editable = true;
      this.pencilHovered = false;
      this.$store.commit('addBalenciagaColorsForm');
    },
    deletingColorConfirmationForm(e) {
      this.tempDocColor = e.target.id;
      this.$store.commit('deletingColorConfirmation');
    },
    closeForm() {
      this.editable = false;
      // this goes to the store to call a function called closeForm
      this.$store.commit('closeForm');
    },
  },
};
</script>

<style scoped>
.grid {
  margin-top: 5%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px 90px;
  align-items: center;
  width: 80%;
  padding: 1rem;
}

.grid > article {
  box-shadow: 2px 2px 6px 1px var(--third-color);
  height: 220px;
  background-color: var(--secondary-color);
  position: relative;
}

.grid > article p {
  color: var(--primary-color);
  margin-top: 70px;
  margin-left: 20px;
  text-transform: uppercase;
}

.grid > article hr {
  width: 60%;
  margin-left: 10px;
  margin-top: 10px;
}

.grid > article div {
  width: 60%;
  margin-left: 18px;
  margin-top: 10px;
  color: var(--primary-color);
  text-transform: uppercase;
}
.uploadColorBtn {
  position: absolute;
  right: 5%;
  top: 20%;
  width: 14rem;
}
#addColorsForm {
  position: fixed;
  width: 60vw;
  height: 60vh;
  background: var(--primary-color);
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
#addColorsForm h2,
#addColorsForm div {
  text-align: center;
  color: var(--secondary-color);
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#addColorsForm div input {
  width: 10vw;
  height: 5vh;
  margin: 1rem;
  padding: 0.6rem;
  background-color: var(--primary-color);
  border: 2px solid var(--secondary-color);
  font-size: 1rem;
  color: var(--secondary-color);
}
#addColorsForm .close {
  position: absolute;
  right: 2rem;
  top: 1rem;
  cursor: pointer;
}
.bin {
  position: absolute;
  right: 1%;
  top: 0;
  width: 2rem;
  transition: 0.2s ease-in-out;
  cursor: pointer;
}
.bin:hover {
  transform: scaleX(1.1);
}
.editBtn {
  position: absolute;
  right: 10%;
  top: 20%;
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
  font-size: 0.8rem;
  position: absolute;
  right: 10%;
  top: 14%;
  border: 2px solid var(--secondary-color);
  padding: 10px;
  width: 10rem;
  height: 50px;
  text-align: center;
  background-color: var(--primary-color);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  text-transform: uppercase;
}
#addForm {
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
  z-index: 10;
}
#addForm h2,
#addForm div {
  text-align: center;
  color: var(--secondary-color);
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#addForm div input {
  width: 40vw;
  height: 7vh;
  margin: 1rem;
  padding: 1rem;
  background-color: var(--primary-color);
  border: 2px solid var(--secondary-color);
  font-size: 1.5rem;
  color: var(--secondary-color);
}
#addForm div input:focus {
  border: 5px solid var(--secondary-color);
}
#addForm button {
  width: 10vw;
  height: 5vh;
  color: var(--primary-color);
  font-size: 1.5rem;
  background-color: var(--secondary-color);
  cursor: pointer;
}
#addForm .close {
  position: absolute;
  right: 2rem;
  top: 1rem;
  cursor: pointer;
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
  .content h1 {
    font-size: 2rem;
  }
  .content {
    margin-left: 450px;
  }
}

@media (max-width: 900px) {
  .content h1 {
    font-size: 2rem;
    margin-bottom: 5%;
  }
  .content {
    margin-left: 40%;
  }
  .grid {
    overflow: hidden;
  }
}
@media (max-width: 600px) {
  .grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    padding: 0 1rem;
  }
  .content {
    position: static;
    margin-left: 0;
    margin-top: 5rem;
    width: 100%;
  }
  .content h1 {
    font-size: 2rem;
    text-align: center;
    margin-top: 5rem;
  }
  .grid {
    width: 100%;
    grid-gap: 2rem;
  }
  .content p {
    padding-top: 5rem;
    margin: auto;
    width: 80%;
    text-align: center;
    font-size: 1rem;
    line-height: 2rem;
  }
  .grid > article p {
    margin-top: 0;
    margin-left: 0;
  }
  .next-btn {
    display: inline;
    position: relative;
    left: 70%;
    bottom: 10px;
    width: 7rem;
    font-size: 0.7rem;
    margin-top: 2rem;
  }
  .editBtn {
    width: 4rem;
    top: 15%;
  }
  #addColorsForm h2,
  #addColorsForm div {
    font-size: 1rem;
  }
  #addColorsForm div input {
    width: 90%;
    height: 4vh;
    margin: 1rem;
    padding: 0.6rem;
  }
}
</style>
