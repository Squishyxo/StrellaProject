<template>
<div>
      <section id="phoneNavigation">
        <img v-if="$store.state.lightTheme" class="phoneLogo" src="../images/logo.png" alt="">
        <img v-else class="phoneLogo" src="../images/balenciaga-dark-mode-logo.png" alt="">
        <button @click="openNav" class="btn close-icon">
        <span></span>
        <span></span>
        <span></span>
            </button>
    </section>
        <div class="overlay"></div>
        <div class="overlay2">
        <ul class="phoneNav">
            <router-link to="/"><li>INTRO</li></router-link>
            <router-link to="/logo"><li>LOGO</li></router-link>
            <router-link to="/typography"><li>TYPOGRAPHY</li></router-link>
            <router-link to="/colors"><li>COLORS</li></router-link>
            <router-link to="/brand"><li>BRAND</li></router-link>
            <li>DOWNLOAD</li>
            <router-link to="/Login">
            <li v-if="!$store.state.loggedIn">LOG IN</li>
            </router-link>
            <li v-if="$store.state.loggedIn" @click="$store.commit('logOut')">LOG OUT</li>
            <li @click="$store.commit('changeTheme')">CHANGE THEME</li>
        </ul>
        </div>
        </div>
</template>

<script>
export default {
    methods: {
        openNav(){
            let btn = document.querySelector('.btn');
            let overlay = document.querySelector('.overlay');
            let overlay2 = document.querySelector('.overlay2');
            let nav = document.querySelector('.phoneNav');
            btn.classList.toggle('active');
            overlay.classList.toggle('active');
            overlay2.classList.toggle('active');
            nav.classList.toggle('active');
            
        }
    }
}
</script>

<style>
#phoneNavigation{
    display: none;
    overflow: hidden;
}
    @media (max-width: 600px) {
   #side{
    display: none;
   } 
   #phoneNavigation{
       position: sticky;
       width: 100vw;
       height: 10vh;
       background-color: var(--secondary-color);
       display: flex;
       justify-content: space-between;
       align-items: center;
   }
   #phoneNavigation img{
       width: 10rem;
       height: 3rem;
   }
   .phoneLogo{
    clip-path: none;
    width: 15rem;
    height: 11vh;
    padding: 1rem;
    margin-left: 20px;
    
   }
   .overlay {
    width: 100vw;
    height: 90vh;
    background-color: var(--primary-color);
    position: fixed;
    bottom: 0%;
    left: 0%;
    transform: translatex(1000px);
    transition: .5s ease-in-out;
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
    background-color: var(--secondary-color);
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
.menu-btn{
    width: 40px!important;
    height: 30px!important;
    cursor: pointer;
    margin-right: 30px;
    background-color: #fff;
}
.phoneNav {
    position: fixed;
    font-size: 1.8rem;
    list-style: none;
    color: var(--primary-color);
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
    transition: all .5s;
}
.phoneNav a li{
    color: var(--primary-color);
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
    background: var(--primary-color);
    display: flex;
    position: absolute;
    transition: .3s;
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
    background: var(--primary-color);
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