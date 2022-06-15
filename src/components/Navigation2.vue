<template>
  <div>
    <nav class="side-menu">
      <div v-if="$store.state.lightTheme" class="logo">
        <img src="../images/logo.png" alt="" />
      </div>
      <div v-else class="logo">
        <img src="../images/balenciaga-dark-mode-logo.png" alt="" />
      </div>
      <ul>
        <router-link to="/"
          ><li><a>INTRODUCTION</a></li></router-link
        >
        <router-link to="/logo"
          ><li><a>LOGO</a></li></router-link
        >
        <router-link to="/typography"
          ><li><a>TYPOGRAPHY</a></li></router-link
        >
        <router-link to="/colors"
          ><li><a>COLORS</a></li></router-link
        >
        <router-link to="/brand"
          ><li><a>BRAND</a></li></router-link
        >
        <li><a download="" href="BALENCIAGA.pdf">DOWNLOAD</a></li>
      </ul>
      <!-- dynaimic style to help the user choose which sidebar they want then apply the proper class to the sidebar -->
      <div :class="[$store.state.lessSideBar ? 'bottom-menu2' : 'bottom-menu']">
        <div @click="$store.commit('changeTheme')" class="c">
          <img src="../images/contrast.svg" />
        </div>
        <router-link v-if="$store.state.loggedIn" to="/dashboard/selector">
          <img
            class="selector"
            v-if="$store.state.lightTheme"
            src="../images/dashboard.svg"
          />
          <img class="selector" v-else src="../images/blackDashboard.svg" />
        </router-link>
        <router-link to="/Login">
          <div v-if="!$store.state.loggedIn && $store.state.lightTheme">
            <img src="../images/login.svg" />
          </div>
          <div v-if="!$store.state.loggedIn && !$store.state.lightTheme">
            <img src="../images/login-dark.svg" />
          </div>
        </router-link>
        <div
          @click="$store.commit('logOut')"
          v-if="$store.state.loggedIn && $store.state.lightTheme"
        >
          <img src="../images/logout.svg" />
        </div>
        <div
          @click="$store.commit('logOut')"
          v-if="$store.state.loggedIn && !$store.state.lightTheme"
        >
          <img src="../images/logout-dark.svg" />
        </div>
      </div>
    </nav>
    <!-- Through this button, the user can choose between the two sidebars -->
    <button class="toggle" @click="$store.commit('less')">
      <img class="arrow" src="../images/double-arrow.svg" alt="arrow" />
    </button>
    <ProgressBar />
    <phone-navigation />
  </div>
</template>

<script>
import phoneNavigation from './phoneNavigation.vue';
import ProgressBar from './ProgressBar.vue';
export default {
  components: { phoneNavigation, ProgressBar },
  name: 'Navigation2',
  data() {
    return {
      lightTheme: true,
    };
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
nav {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
}
nav ul li a {
  text-decoration: none;
  color: var(--primary-color);
  font-size: 2rem;
  height: 10;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bottom-menu {
  display: flex;
  align-items: center;
  clip-path: polygon(0 0, 84% 0, 100% 100%, 0% 100%);
  background-color: var(--color-1);
  width: 20rem;
  height: 12vh;
  border-top: 1px solid var(--secondary-color);
  overflow-y: hidden;
}
.bottom-menu2 {
  display: flex;
  align-items: center;
  background-color: var(--color-1);
  width: 20rem;
  height: 12vh;
  border-top: 1px solid var(--secondary-color);
  overflow-y: hidden;
}
.bottom-menu div,
.bottom-menu2 div {
  padding: 40px;
}
.logo {
  text-align: center;
}
.logo img {
  width: 18rem;
  padding: 1rem;
}

.bottom-menu div img,
.bottom-menu2 div img {
  width: 3rem;
  height: 4vh;
  cursor: pointer;
}

.side-menu ul li {
  cursor: pointer;
  border-bottom: 1px solid var(--primary-color);
}

.router-link-active {
  background-color: var(--primary-color);
  color: var(--secondary-color);
}

.side-menu .router-link-active a {
  color: var(--secondary-color);
}
.logOut {
  background-color: var(--primary-color);
  color: var(--secondary-color);
  width: 80px;
  height: 50px;
  margin-left: 35px;
}
.selector {
  width: 3rem;
  height: 4vh;
  cursor: pointer;
}

.arrow {
  width: 1.3rem;
}
@media (max-width: 1400px) {
  .logo img {
    width: 15rem;
  }
  .side-menu ul,
  nav {
    width: 15rem;
  }
  .side-menu ul li a {
    font-size: 1.5rem;
  }
  .bottom-menu div,
  .bottom-menu2 div {
    padding: 20px;
  }
}
@media (max-width: 900px) {
  .logo img {
    width: 10rem;
  }
  .side-menu ul,
  nav {
    width: 10rem;
  }
  .side-menu ul li a {
    font-size: 1rem;
  }
  .bottom-menu div,
  .bottom-menu2 div {
    padding: 5px;
  }
  .bottom-menu div img,
  .bottom-menu button,
  .bottom-menu2 div img,
  .bottom-menu2 button {
    width: 50px;
    height: 40px;
  }
  .toggle {
    display: none;
  }
}
@media (max-width: 600px) {
  .side-menu,
  .toggle {
    display: none;
  }
}
</style>
