<template>
        <section id="side">
            <div v-if="$store.state.lightTheme" class="logo"><img src="../images/logo.png" alt=""></div>
            <div v-else class="logo"><img src="../images/balenciaga-dark-mode-logo.png" alt=""></div>
        <nav class="side-menu">
            <ul>    
               <router-link to="/"><li><a>INTRODUCTION</a></li></router-link>
               <router-link to="/logo"><li><a>LOGO</a></li></router-link>
               <router-link to="/typography"><li><a>TYPOGRAPHY</a></li></router-link>
               <router-link to="/colors"><li><a>COLORS</a></li></router-link>
               <router-link to="/brand"><li><a>BRAND</a></li></router-link>
            </ul>
        </nav>
            <div :class="[ $store.state.lessSideBar ? 'bottom-menu2' : 'bottom-menu']">
            <div @click="$store.commit('changeTheme')" class="c"><img src="../images/contrast.svg"></div>
            <div v-if="$store.state.lightTheme"><img src="../images/download.png"></div>
            <div v-else><img src="../images/download-light-mode.png"></div>
            <router-link to="/Login">
            <div v-if="!$store.state.loggedIn && $store.state.lightTheme"><img src="../images/edit.png"></div>
            <div v-if="!$store.state.loggedIn && !$store.state.lightTheme"><img src="../images/edit-light-mode.png"></div>
            </router-link>
            <button v-if="$store.state.loggedIn" @click="$store.commit('logOut')" class="logOut"><img src="../images/bx-log-in.svg" alt=""></button>
        </div>
    </section>
</template>

<script>
export default {
    name: "Navigation",
    data(){
        return{
        lightTheme: true
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
    --nav-color: #0D161C;
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

.bottom-menu div,  .bottom-menu2 div {
    padding: 30px;
}

.bottom-menu div img, .bottom-menu2 div img{
    width: 3rem;
    height:4vh;
    cursor: pointer;
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
#side {
    position: fixed;
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
    .bottom-menu, .bottom-menu2 {
        width: 360px;
    }
    .bottom-menu div, .bottom-menu2 div {
        padding: 30px;
    }
    .bottom-menu div img, .bottom-menu2 div img {
        width: 40px;
    }
    .logOut{
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
    .logOut{
    width: 50px;
    padding: 0;
    }
}
</style>