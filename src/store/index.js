import { createStore } from 'vuex'
import router from '@/router'

export default createStore({
    state: {
        loggedIn: false,
        inputPassword: '',
        lightTheme: true,
        lessSideBar: false,
        password: '',
        wrongToken: null
    },
    getters: {},
    mutations: {
        logOut(state) {
            state.loggedIn = false
        },
        less(state) {
            state.lessSideBar = !state.lessSideBar
            console.log(state.lessSideBar)
        },
        handleSubmit(state) {
            fetch('https://s3-project-8f792-default-rtdb.europe-west1.firebasedatabase.app/.json').then((response) => {
                if (response.ok) {
                    return response.json();
                }
            }).then((data) => {
                state.password = data.password;
                if (state.password === state.inputPassword) {
                    console.log('correct password');
                    state.loggedIn = true
                    state.inputPassword = '';
                    router.push('/');
                } else {
                    state.wrongToken = true;
                    state.inputPassword = '';
                    console.log('wrong password');
                }
            })
        },
        changeTheme(state) {
            if (state.lightTheme === true) {
                document.documentElement.style.setProperty('--primary-color', '#0D161C');
                document.documentElement.style.setProperty('--secondary-color', '#fff');
                document.documentElement.style.setProperty('--third-color', '#C4C4C4');
                document.documentElement.style.setProperty('--color-1', '#A4A4A4');
                document.documentElement.style.setProperty('--nav-color', '#A4A4A4');
            } else {
                document.documentElement.style.setProperty('--primary-color', '#fff');
                document.documentElement.style.setProperty('--secondary-color', '#0D161C');
                document.documentElement.style.setProperty('--third-color', '#333333');
                document.documentElement.style.setProperty('--color-1', '#0D161C');
                document.documentElement.style.setProperty('--nav-color', '#0D161C');
            }
            state.lightTheme = !state.lightTheme;
        },
    },
    actions: {},
    modules: {}
})