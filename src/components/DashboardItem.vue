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
<!-- This div is only visible when you are editing the text -->
    <div class="save-changes" v-if="editable">
      <p>
        You can click on the text and start editing, when you finish click save.
      </p>
      <button @click="discardChanges">DISCARD CHANGES</button>
      <button @click="saveChanges">SAVE CHANGES</button>
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
      editable: false,
    };
  },
  // this function runs immediately when the page is loaded. 
  mounted: function () {
    this.getPagesText();
    this.updateDocId();
  },
  // watching the route, whenever it changes I want to get the text that is for that route.
  watch: {
    $route() {
      this.getPagesText();
      this.updateDocId();
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
      this.editable = false;
      this.pencilHovered = false;
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
</style>
