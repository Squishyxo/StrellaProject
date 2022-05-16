import { createStore } from 'vuex'
import Vue from "vue";
import {router} from "../main.js"
import { vm } from '@/main'

export default createStore({
    state: {
        loggedIn: false,
        token: '1223334444',
        inputPassword: ''
    },
    getters: {},
    mutations: {
        logIn(state) {
            state.loggedIn = true
            // router.push('/colors')
        },
        logOut(state) {
            state.loggedIn = false
        },
        handleSubmit(state) {
            if (state.token === state.inputPassword) {
                console.log('correct password');
                vm.$router.push('/colors')
            } else {
                console.log('wrong password');
            }
        },
        changeTheme() {
            let darkBottomMenu = document.querySelector('.dark-bottom-menu');
            let bottomMenu = document.querySelector('.bottom-menu');
            this.lightTheme = !this.lightTheme;
            if (this.lightTheme === false) {
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
    actions: {},
    modules: {}
})