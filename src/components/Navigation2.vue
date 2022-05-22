<template>
<div>
            <nav class="side-menu">
        <div v-if="$store.state.lightTheme" class="logo"><img src="../images/logo.png" alt=""></div>
            <div v-else class="logo"><img src="../images/balenciaga-dark-mode-logo.png" alt=""></div>
            <ul>    
               <router-link to="/"><li><a>INTRODUCTION</a></li></router-link>
               <router-link to="/logo"><li><a>LOGO</a></li></router-link>
               <router-link to="/typography"><li><a>TYPOGRAPHY</a></li></router-link>
               <router-link to="/colors"><li><a>COLORS</a></li></router-link>
               <router-link to="/brand"><li><a>BRAND</a></li></router-link>
               <li><a>DOWNLOAD</a></li>
            </ul>
            <!-- dynaimic style to help the user choose which sidebar they want then apply the proper class to the sidebar -->
            <div :class="[ $store.state.lessSideBar ? 'bottom-menu2' : 'bottom-menu']">
            <div @click="$store.commit('changeTheme')" class="c"><img src="../images/contrast.svg"></div>
            <router-link to="/Login">
            <div v-if="!$store.state.loggedIn && $store.state.lightTheme"><img src="../images/edit.png"></div>
            <div v-if="!$store.state.loggedIn && !$store.state.lightTheme"><img src="../images/edit-light-mode.png"></div>
            </router-link>
            <button v-if="$store.state.loggedIn" @click="$store.commit('logOut')" class="logOut"><img src="../images/bx-log-in.svg" alt=""></button>
            </div>
        </nav>
        <!-- Through this button, the user can choose between the two sidebars -->
            <button class="toggle" @click="$store.commit('less')">
        <img v-if="!$store.state.lessSideBar" src="../images/bxs-left-arrow-square.svg" alt="left arrow">
        <img v-else src="../images/bxs-right-arrow-square.svg" alt="right arrow">
        </button>
    <phone-navigation />
    </div>
</template>

<script>
import phoneNavigation from './phoneNavigation.vue';
export default {
    components: { phoneNavigation },
    name: "Navigation2",
    data(){
        return{
        lightTheme: true,
        }
    },
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap');
:root {
    --primary-color: #fff;
    --secondary-color: #0D161C;
    --third-color: #333333;
    --color-1: #0D161C;
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
nav{
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
.bottom-menu div, .bottom-menu2 div {
    padding: 40px;
}
.logo{
    text-align: center;
}
.logo img {
    width: 18rem;
    padding: 1rem;
}

.bottom-menu div img, .bottom-menu2 div img{
    width: 3rem;
    height:4vh;
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
.logOut{
    background-color: var(--primary-color);
    color: var(--secondary-color);
    width: 80px;
    height: 50px;
    margin-left: 35px;
}
@media (max-width: 1400px) {
    .logo img {
        width: 15rem;
    }
    .side-menu ul, nav {
        width: 15rem;
    }
    .side-menu ul li a {
        font-size: 1.5rem;
    }
    .bottom-menu div, .bottom-menu2 div{
        padding: 20px;
    }
}
@media (max-width: 900px) {
    .logo img {
        width: 10rem;
    }
    .side-menu ul, nav {
        width: 10rem;
    }
    .side-menu ul li a {
        font-size: 1rem;
    }
    .bottom-menu div, .bottom-menu2 div {
        padding: 5px;
    }
    .bottom-menu div img, .bottom-menu  button, .bottom-menu2 div img, .bottom-menu2 button {
        width: 50px;
        height: 40px;
    }
    .toggle{
        display: none;
    }
}
@media (max-width: 600px) {
    .side-menu, .toggle{
        display: none;
    }
}
</style>