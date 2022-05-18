<template>
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
            <div class="bottom-menu">
            <div @click="$store.commit('changeTheme')" class="c"><img src="../images/contrast.svg"></div>
            <router-link to="/Login">
            <div v-if="!$store.state.loggedIn && $store.state.lightTheme"><img src="../images/edit.png"></div>
            <div v-if="!$store.state.loggedIn && !$store.state.lightTheme"><img src="../images/edit-light-mode.png"></div>
            </router-link>
            <button v-if="$store.state.loggedIn" @click="$store.commit('logOut')" class="logOut">Log out</button>
            </div>
        </nav>
</template>

<script>
export default {
    name: "Navigation2",
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
    background-color: var(--secondary-color);
    width: 17vw;
    height: 100vh;
    position: fixed;
}
nav ul {
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
    text-align: center;
    border-left: 5px solid var(--third-color);
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
    background-color: var(--color-1);
    overflow-y: hidden;
    display: flex;
    justify-content: space-evenly;
}
.bottom-menu div {
    padding: 40px;
}
.logo img {
    width: 290px;
    padding: 1rem;
}

.bottom-menu div img{
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
</style>