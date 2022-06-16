<template>
    <section id="phoneNavigation">
      <img
        id="logoPhone"
        class="phoneLogo"
        src=""
      />
      <button @click="openNav" class="btn close-icon">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </section>
<div class="overlay"></div>
    <div class="overlay2">
      <ul class="phoneNav">
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
import {
  collection,
  onSnapshot,
} from 'firebase/firestore';
import db from '../store/database';
import {
  getStorage,
  ref,
  getDownloadURL,
} from 'firebase/storage';
export default {
    name: 'DashboardPhoneNav',
    data(){
        return{
            pagesArray: []
        }
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
 openNav() {
      let btn = document.querySelector('.btn');
      let overlay = document.querySelector('.overlay');
      let overlay2 = document.querySelector('.overlay2');
      let nav = document.querySelector('.phoneNav');
      btn.classList.toggle('active');
      overlay.classList.toggle('active');
      overlay2.classList.toggle('active');
      nav.classList.toggle('active');
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
          const img = document.getElementById('logoPhone');
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
    }
}
</script>

<style>
#phoneNavigation {
  display: none;
  overflow: hidden;
  border-bottom: 4px solid var(--primaryColor);
}
@media (max-width: 700px) {
  .sidebar {
    display: none!important;
  }
  #phoneNavigation {
    position: fixed;
    width: 100vw;
    height: 10vh;
    background-color: var(--secondaryColor);
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 10;
  }
  #logoPhone{
    width: 8rem!important;
    height: 5rem!important;
  }
  .uploadLogoBtn, .resetLogoBtn{
    display: none;
  }
  .editDiv{
    display: none;
  }
  #phoneNavigation img {
    width: 10rem;
    height: 3rem;
  }
  #content{
    margin: auto!important;
    padding: 0!important;
  }
  #content p{
    text-align: center;
  }
  .phoneLogo {
    clip-path: none;
    width: 15rem;
    height: 11vh;
    padding: 1rem;
    margin-left: 20px;
  }
  .overlay {
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

  .overlay.active {
    transform: translateY(0px);
  }

  .overlay2 {
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

  .overlay2.active {
    transform: translateY(0px);
  }
  .menu-btn {
    width: 40px !important;
    height: 30px !important;
    cursor: pointer;
    margin-right: 30px;
    background-color: #fff;
  }
  .phoneNav {
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

  .phoneNav li {
    margin: 20px;
    cursor: pointer;
    transition: all 0.5s;
  }
  .phoneNav li a{
    color: var(--primaryColor);
  }
  .phoneNav a li {
    color: var(--primaryColor);
  }

  .phoneNav li:hover {
    transform: scale(1.2);
  }

  .phoneNav.active {
    opacity: 1;
  }
  .btn {
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

  .btn span {
    width: 45px;
    height: 3px;
    background: var(--primaryColor);
    display: flex;
    position: absolute;
    transition: 0.3s;
  }

  .btn span:nth-child(1) {
    top: 20%;
  }

  .btn span:nth-child(2) {
    top: 60%;
    width: 35px;
  }

  .btn span:nth-child(3) {
    top: 40%;
    width: 27px;
  }

  .btn.is-active span {
    background: var(--primaryColor);
  }

  .btn.active span:nth-child(1) {
    top: 50%;
    transform: rotate(-45deg);
  }

  .btn.active span:nth-child(2) {
    top: 50%;
    transform: rotate(45deg);
    width: 45px;
  }

  .btn.active span:nth-child(3) {
    display: none;
  }
}
</style>