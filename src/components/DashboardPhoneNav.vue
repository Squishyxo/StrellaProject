<template>
  <section id="phoneNavigation2">
    <img id="logoPhone2" class="phoneLogo2" src="" />
    <button @click="openNav2" class="btn2 close-icon2">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </section>
  <div class="overlay1"></div>
  <div class="overlay22">
    <ul class="phoneNav2">
      <!-- Looping through an array and display the content inside it -->
      <li v-for="page in pagesArray" :key="page.id">
        <router-link :to="`/dashboard/${page.name}`"
          ><a>{{ page.name }}</a></router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { collection, onSnapshot } from 'firebase/firestore';
import db from '../store/database';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
export default {
  name: 'DashboardPhoneNav',
  data() {
    return {
      pagesArray: [],
    };
  },
  mounted: function () {
    this.getLogo();
    this.getPages();
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    },
  },
  methods: {
    openNav2() {
      let btn2 = document.querySelector('.btn2');
      let overlay1 = document.querySelector('.overlay1');
      let overlay22 = document.querySelector('.overlay22');
      let nav2 = document.querySelector('.phoneNav2');
      btn2.classList.toggle('active');
      overlay1.classList.toggle('active');
      overlay22.classList.toggle('active');
      nav2.classList.toggle('active');
    },
    changeTheme() {
      this.$store.commit('changeTheme');
    },
    logOut() {
      this.$store.commit('logOut');
    },
    // this function will check whether there is already a logo in the backend or not. if yes, it will replace it, if not, it will upload a new logo file.
    getLogo() {
      const storage = getStorage();
      getDownloadURL(ref(storage, 'logo'))
        .then(url => {
          const img = document.getElementById('logoPhone2');
          img.setAttribute('src', url);
          this.getLogo();
        })
        .catch(error => {
          console.log(error);
        });
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
  },
};
</script>

<style>
#phoneNavigation2 {
  display: none;
  overflow: hidden;
  border-bottom: 4px solid var(--primaryColor);
}
@media (max-width: 700px) {
  .sidebar {
    display: none !important;
  }
  #phoneNavigation2 {
    position: fixed;
    width: 100vw;
    height: 10vh;
    background-color: var(--secondaryColor);
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 10;
  }
  #logoPhone2 {
    width: 8rem !important;
    height: 5rem !important;
    overflow: hidden;
  }
  .uploadLogoBtn,
  .resetLogoBtn {
    display: none;
  }
  .editDiv {
    display: none;
  }
  #phoneNavigation2 img {
    width: 10rem;
    height: 3rem;
  }
  #content {
    margin: auto !important;
    padding: 0 !important;
  }
  #content p {
    text-align: center;
  }
  .phoneLogo2 {
    clip-path: none;
    width: 15rem;
    height: 11vh;
    padding: 1rem;
    margin-left: 20px;
  }
  .overlay1 {
    width: 100vw;
    height: 90vh;
    background-color: var(--primaryColor);
    position: fixed;
    bottom: 0%;
    left: 0%;
    transform: translatex(1000px);
    transition: 0.5s ease-in-out;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .overlay1.active {
    transform: translateY(0px);
  }

  .overlay22 {
    width: 95vw;
    height: 87vh;
    background-color: var(--secondaryColor);
    position: fixed;
    bottom: 1.3%;
    left: 2.8%;
    transform: translatex(1000px);
    transition: 1.5s ease-in-out;
    z-index: 4;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .overlay22.active {
    transform: translateY(0px);
  }
  .menu-btn {
    width: 40px !important;
    height: 30px !important;
    cursor: pointer;
    margin-right: 30px;
    background-color: #fff;
  }
  .phoneNav2 {
    position: fixed;
    font-size: 1.8rem;
    list-style: none;
    color: var(--primaryColor);
    opacity: 0;
    transition: 2s ease-in-out;
    z-index: 5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .phoneNav2 li {
    margin: 20px;
    cursor: pointer;
    transition: all 0.5s;
  }
  .phoneNav2 li a {
    color: var(--primaryColor);
  }
  .phoneNav2 a li {
    color: var(--primaryColor);
  }

  .phoneNav2 li:hover {
    transform: scale(1.2);
  }

  .phoneNav2.active {
    opacity: 1;
  }
  .btn2 {
    position: absolute;
    top: 15%;
    right: 10%;
    z-index: 6;
    display: flex;
    width: 3rem;
    height: 4rem;
    outline: inherit;
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
  }

  .btn2 span {
    width: 45px;
    height: 3px;
    background: var(--primaryColor);
    display: flex;
    position: absolute;
    transition: 0.3s;
  }

  .btn2 span:nth-child(1) {
    top: 20%;
  }

  .btn2 span:nth-child(2) {
    top: 60%;
    width: 35px;
  }

  .btn2 span:nth-child(3) {
    top: 40%;
    width: 27px;
  }

  .btn2.is-active span {
    background: var(--primaryColor);
  }

  .btn2.active span:nth-child(1) {
    top: 50%;
    transform: rotate(-45deg);
  }

  .btn2.active span:nth-child(2) {
    top: 50%;
    transform: rotate(45deg);
    width: 45px;
  }

  .btn2.active span:nth-child(3) {
    display: none;
  }
}
</style>
