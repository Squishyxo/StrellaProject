import { createStore } from 'vuex'

export default createStore({
    state: {
        loggedIn: false,
        token: '1223334444',
        inputPassword: '',
        lightTheme: true
    },
    getters: {},
    mutations: {
        logIn(state) {
            state.loggedIn = true
        },
        logOut(state) {
            state.loggedIn = false
        },
        handleSubmit(state) {
            if (state.token === state.inputPassword) {
                console.log('correct password');
            } else {
                console.log('wrong password');
            }
        },
        changeTheme(state) {
            if (state.lightTheme === true) {
                document.documentElement.style.setProperty('--primary-color', '#0D161C');
                document.documentElement.style.setProperty('--secondary-color', '#fff');
                document.documentElement.style.setProperty('--third-color', '#C4C4C4');
                document.documentElement.style.setProperty('--color-1', '#A4A4A4');
            } else {
                document.documentElement.style.setProperty('--primary-color', '#fff');
                document.documentElement.style.setProperty('--secondary-color', '#0D161C');
                document.documentElement.style.setProperty('--third-color', '#333333');
                document.documentElement.style.setProperty('--color-1', '#0D161C');
            }
            state.lightTheme = !state.lightTheme;
        },
    },
    actions: {},
    modules: {}
})