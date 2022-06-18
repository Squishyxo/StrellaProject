import { createStore } from 'vuex'
import router from '@/router'

export default createStore({
    state: {
        loggedIn: false,
        inputPassword: '',
        lightTheme: true,
        lessSideBar: false,
        password: '',
        wrongToken: null,
        popUp: false,
        logoForm: false,
        imagesForm: false,
        brandImagesForm: false,
        colorsForm: false,
        balenciagaColorsForm: false,
        updatePageFormPopUp: false,
        editTextPopUp: false,
        logoResetWarning: false,
        deletingPageConfirmation: false,
        deletingColorConfirmation: false,
        deletingImageConfirmation: false,
    },
    getters: {},
    mutations: {
        addPageForm(state) {
            state.popUp = true;
        },
        editText(state) {
            state.editTextPopUp = true;
        },
        uploadLogoForm(state) {
            state.logoForm = true;
        },
        uploadImagesForm(state) {
            state.imagesForm = true;
        },
        uploadbrandImagesForm(state) {
            state.brandImagesForm = true;
        },
        addColorsForm(state) {
            state.colorsForm = true;
        },
        updatePageForm(state) {
            state.updatePageFormPopUp = true;
        },
        addBalenciagaColorsForm(state) {
            state.balenciagaColorsForm = true;
        },
        logoResetWarning(state) {
            state.logoResetWarning = true;
        },
        deletingPageConfirmation(state) {
            state.deletingPageConfirmation = true;
        },
        deletingColorConfirmation(state) {
            state.deletingColorConfirmation = true;
        },
        deletingImageConfirmation(state) {
            state.deletingImageConfirmation = true;
        },
        logoIsUploaded(state) {
            state.logoIsUploaded = true;
        },
        closeForm(state) {
            state.popUp = false;
            state.logoForm = false;
            state.colorsForm = false;
            state.balenciagaColorsForm = false;
            state.updatePageFormPopUp = false;
            state.editTextPopUp = false;
            state.imagesForm = false;
            state.brandImagesForm = false;
            state.logoResetWarning = false;
            state.deletingPageConfirmation = false;
            state.deletingColorConfirmation = false;
            state.deletingImageConfirmation = false;
        },
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
                    router.push('/dashboard/selector');
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