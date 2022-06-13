<template>
  <div>
    <section id="side">
      <div v-if="$store.state.lightTheme" class="logo">
        <img src="../images/logo.png" alt="" />
      </div>
      <div v-else class="logo">
        <img src="../images/balenciaga-dark-mode-logo.png" alt="" />
      </div>
      <nav class="side-menu">
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
        </ul>
      </nav>
      <!-- dynaimic style to help the user choose which sidebar they want then apply the proper class to the sidebar -->
      <div :class="[$store.state.lessSideBar ? 'bottom-menu2' : 'bottom-menu']">
        <div @click="$store.commit('changeTheme')" class="c">
          <img src="../images/contrast.svg" />
        </div>
        <div v-if="$store.state.lightTheme">
          <img src="../images/cloud.svg" />
        </div>
        <div v-else><img src="../images/cloud-dark.svg" /></div>
        <router-link to="/dashboard/selector">
          <img src="../images/dashboard.svg" />
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
      <!-- Through this button, the user can choose between the two sidebars -->
      <button class="toggle" @click="$store.commit('less')">
        <img class="arrow" src="../images/double-arrow.svg" alt="arrow" />
      </button>
    </section>
    <phone-navigation />
  </div>
</template>

<script>
import phoneNavigation from './phoneNavigation.vue';
export default {
  components: { phoneNavigation },
  name: 'Navigation',
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
  --nav-color: #0d161c;
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

.logo {
  clip-path: polygon(0 0, 100% 0, 67% 100%, 0% 100%);
  background-color: var(--third-color);
  width: 460px;
  height: 11vh;
  padding: 30px;
  border-bottom: 1px solid var(--secondary-color);
}

.logo img {
  width: 300px;
}

.side-menu ul {
  height: 77vh;
  width: 308px;
  background-color: var(--third-color);
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  border-left: 5px solid var(--third-color);
}

.side-menu ul li {
  cursor: pointer;
  border-bottom: 1px solid var(--primary-color);
}

.side-menu ul li a {
  text-decoration: none;
  color: var(--primary-color);
  font-size: 2rem;
  height: 15.29vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bottom-menu {
  display: flex;
  align-items: center;
  clip-path: polygon(0 0, 84% 0, 100% 100%, 0% 100%);
  background-color: var(--color-1);
  width: 460px;
  height: 12vh;
  border-top: 1px solid var(--secondary-color);
  overflow-y: hidden;
}
.bottom-menu2 {
  display: flex;
  align-items: center;
  background-color: var(--color-1);
  width: 460px;
  height: 12vh;
  border-top: 1px solid var(--secondary-color);
  overflow-y: hidden;
}

.bottom-menu div,
.bottom-menu2 div {
  padding: 30px;
}

.bottom-menu div img,
.bottom-menu2 div img {
  width: 3rem;
  height: 4vh;
  cursor: pointer;
}

.router-link-active {
  background-color: var(--primary-color);
  color: var(--secondary-color);
}

.side-menu .router-link-active a {
  color: var(--secondary-color);
}
.logOut {
  width: 80px;
  height: 50px;
  margin-left: 25px;
}
#side {
  position: fixed;
}
.arrow {
  width: 1.3rem;
}
@media (max-width: 1400px) {
  .logo {
    width: 360px;
  }
  .logo img {
    margin-top: 10px;
    width: 200px;
  }
  .side-menu ul {
    width: 241px;
  }
  .side-menu ul li a {
    font-size: 1.5rem;
  }
  .bottom-menu,
  .bottom-menu2 {
    width: 360px;
  }
  .bottom-menu div,
  .bottom-menu2 div {
    padding: 30px;
  }
  .bottom-menu div img,
  .bottom-menu2 div img {
    width: 40px;
  }
  .logOut {
    margin-left: 5px;
  }
}
@media (max-width: 900px) {
  .logo {
    width: 260px;
  }
  .logo img {
    margin-top: 15px;
    width: 150px;
  }
  .side-menu ul {
    width: 175px;
  }
  .side-menu ul li a {
    font-size: 1rem;
  }
  .bottom-menu {
    width: 260px;
  }
  .bottom-menu div {
    padding: 20px;
  }
  .bottom-menu div img {
    width: 30px;
  }
  .logOut {
    width: 50px;
    padding: 0;
  }
  .toggle {
    display: none;
  }
}
</style>
