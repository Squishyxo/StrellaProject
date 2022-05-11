<template>
        <section id="side">
            <div class="logo"><img src="../images/logo.png" alt=""></div>
        <nav class="side-menu">
            <ul>    
               <router-link to="/"><li><a>INTRODUCTION</a></li></router-link>
               <router-link to="/logo"><li><a>LOGO</a></li></router-link>
               <router-link to="/typography"><li><a>TYPOGRAPHY</a></li></router-link>
               <router-link to="/colors"><li><a>COLORS</a></li></router-link>
               <router-link to="/brand"><li><a>BRAND</a></li></router-link>
            </ul>
        </nav>
        <div class="bottom-menu">
            <div @click="changeTheme" class="c"><img src="../images/contrast.svg"></div>
            <div @click="logIn"><img src="../images/download.png"></div>
            <router-link to="/Login"><div><img src="../images/edit.png"></div></router-link>
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
    methods:{
        changeTheme() {
        let darkBottomMenu = document.querySelector('.dark-bottom-menu');
        let bottomMenu = document.querySelector('.bottom-menu');
        this.lightTheme = !this.lightTheme;
            if(this.lightTheme === false){
                document.documentElement.style.setProperty('--primary-color', '#0D161C');
                document.documentElement.style.setProperty('--secondary-color', '#fff');
                document.documentElement.style.setProperty('--third-color', '#C4C4C4');
                document.documentElement.style.setProperty('--color-1', '#A4A4A4');
                darkBottomMenu.style.display = 'flex';
                bottomMenu.style.display = 'none';
            } else {
                document.documentElement.style.setProperty('--primary-color', '#fff');
                document.documentElement.style.setProperty('--secondary-color', '#0D161C');
                document.documentElement.style.setProperty('--third-color', '#333333');
                document.documentElement.style.setProperty('--color-1', '#0D161C');
                darkBottomMenu.style.display = 'none';
                bottomMenu.style.display = 'flex';
            }
        },
    },
};
</script>


<style>
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

.logo {
    clip-path: polygon(0 0, 100% 0, 67% 100%, 0% 100%);
    background-color: var(--third-color);
    width: 460px;
    height: 121px;
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
    height: auto;
    border-top: 1px solid var(--secondary-color);
    overflow-y: hidden;
}

.bottom-menu div {
    padding: 30px;
}

.bottom-menu div img{
    width: 60px;
    padding: 3px;
    cursor: pointer;
}

.router-link-active {
    background-color: var(--primary-color);
    color: var(--secondary-color);
}

.side-menu .router-link-active a {
    color: var(--secondary-color);
}

#side {
    position: fixed;
}
.dark-theme{
    color: white;
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
    .bottom-menu {
        width: 360px;
    }
    .bottom-menu div {
        padding: 30px;
    }
    .bottom-menu div img {
        width: 40px;
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
}
</style>