<template>
  <div>
    <!-- this v-if shows one of the two sidebars depending on what the user prefers. -->
    <Navigation v-if="!lessSideBar" />
    <Navigation2 v-else />
    <!-- The main content starts here -->
    <section class="content">
      <h1>INTRODUCTION</h1>
      <div>
        <p
          :class="[editable ? 'edit-border' : '']"
          id="intro-text"
          :v-model="text"
        >
          {{ text }}
        </p>
      </div>
    </section>
    <!-- content ends here -->

    <!-- Then we added a dashboard feature as a v-if statement. It checks whether the user logged in or not and if they are logged in, this feature shows. -->
    <div class="editDiv" v-if="loggedIn && !editable">
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

    <div class="save-changes" v-if="editable">
      <p>
        You can click on the text and start editing, when you finish click save.
      </p>
      <button @click="discardChanges">DISCARD CHANGES</button>
      <button @click="saveChanges">SAVE CHANGES</button>
    </div>
    <!-- save-changes2 for phone -->
    <div class="save-changes2" v-if="editable">
      <p>
        You can click on the text and start editing, when you finish click save.
      </p>
      <button @click="discardChanges">DISCARD CHANGES</button>
      <button @click="saveChanges">SAVE CHANGES</button>
    </div>
    <router-link to="/logo"
      ><button class="next-btn" v-if="!loggedIn">NEXT</button></router-link
    >
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import Navigation2 from '@/components/Navigation2.vue';
export default {
  components: {
    Navigation,
    Navigation2,
  },
  name: 'Home',
  data() {
    return {
      pencilHovered: false,
      editable: false,
      text: '',
    };
  },
  // getText function executes whenever the page refreshes
  mounted: function () {
    this.getText();
  },
  methods: {
    getText() {
      fetch(
        'https://s3-project-8f792-default-rtdb.europe-west1.firebasedatabase.app/introText.json'
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(data => {
          this.text = data;
          // document.getElementById('intro-text').innerHTML = data.introText
        });
    },
    editText() {
      this.editable = !this.editable;
      document.getElementById('intro-text').contentEditable = this.editable;
    },
    // saveChanges takes the input text and save it in a firebase database
    saveChanges() {
      let value = document.getElementById('intro-text').innerText;
      fetch(
        'https://s3-project-8f792-default-rtdb.europe-west1.firebasedatabase.app/introText.json',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(value),
        }
      );
      this.editable = false;
    },
    discardChanges() {
      this.pencilHovered = false;
      this.editable = false;
      this.getText();
    },
  },
  computed: {
    lessSideBar() {
      return this.$store.state.lessSideBar;
    },
    loggedIn() {
      return this.$store.state.loggedIn;
    },
  },
};
</script>

<style scoped>
.loading {
  font-size: 3rem;
  text-align: center;
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
  bottom: 3%;
  left: 33%;
  padding: 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  display: flex;
  width: 60%;
  margin: 5% 0;
}
.save-changes p {
  margin: auto;
}
.save-changes button {
  width: 12rem;
  margin: 0 0.5rem;
  padding: 0.3rem;
  font-size: 0.8rem;
}
.save-changes button:nth-child(2) {
  background: #e74c3c;
  color: var(--primary-color);
}
.save-changes2 {
  display: none;
}
@media (max-width: 1400px) {
  .content h1 {
    padding-top: 100px;
    font-size: 2rem;
  }
  .content {
    margin-left: 450px;
    width: 50vw;
  }
  .content div p {
    width: 50vw;
  }
}
@media (max-width: 900px) {
  .content {
    margin-left: 330px;
    width: 50vw;
  }
  .content div p {
    width: 45vw;
  }
}
@media (max-width: 600px) {
  .content {
    position: static;
    margin-left: 0;
    padding-right: 0;
    margin-top: 5rem;
    text-align: center;
    width: 100vw;
  }
  .content div p {
    font-size: 1rem;
    width: 90vw;
    padding: 1rem;
    text-align: center;
    line-height: 2rem;
    padding-top: 2rem;
  }
  .content h1 {
    margin: 0;
    text-align: center;
    text-transform: uppercase;
    font-size: 2rem;
  }
  .editBtn {
    position: absolute;
    top: 13%;
    right: 10%;
    width: 45px;
    height: 45px;
    border: 2px solid var(--secondary-color);
    border-radius: 50%;
    padding: 7px;
  }
  .editBtn img {
    width: 1.7rem;
  }
  .editOnHover {
    display: none;
  }
  .save-changes {
    border: 0.2rem solid var(--secondary-color);
    position: absolute;
    top: 10%;
    left: 1%;
    height: 5rem;
    padding: 0.3rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 800;
    text-transform: uppercase;
    display: flex;
    margin: 1rem;
    width: 90%;
    overflow: hidden;
  }
  .save-changes2 {
    border: 0.2rem solid var(--secondary-color);
    position: relative;
    bottom: 10%;
    left: 1%;
    height: 5rem;
    padding: 0.3rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 800;
    text-transform: uppercase;
    display: flex;
    margin: 1rem;
    width: 90%;
    overflow: hidden;
  }
  .save-changes p,
  .save-changes2 p {
    margin: auto;
    font-size: 0.6rem;
  }
  .save-changes button,
  .save-changes2 button {
    width: 8rem;
    margin: 1rem 0;
    font-size: 0.4rem;
    font-weight: bold;
  }
  .save-changes button:nth-child(2),
  .save-changes2 button:nth-child(2) {
    background: #e74c3c;
    color: var(--primary-color);
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
}
</style>
