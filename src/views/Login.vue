<template>
  <div class="login-page">
    <div class="layout1"></div>
    <div class="layout2"></div>
    <div class="wrap">
      <form @submit.prevent="$store.commit('handleSubmit')">
        <img
          v-if="!$store.state.lightTheme"
          class="login-logo"
          src="../images/logo.png"
        />
        <img
          v-else
          class="login-logo"
          src="../images/balenciaga-dark-mode-logo.png"
        />
        <h2>Log In</h2>
        <input
          v-model="$store.state.inputPassword"
          type="password"
          placeholder="Access Token"
          required
        />
        <p class="wrongToken" v-if="$store.state.wrongToken">Wrong Token</p>
        <button type="submit">Log in</button>
      </form>
      <img src="../images/Login.jpg" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
};
</script>

<style scpoed>
.login-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.layout1 {
  width: 50%;
  height: 100%;
  background-color: var(--primary-color);
}
.layout2 {
  width: 50%;
  height: 100%;
  background-color: var(--secondary-color);
}
.wrap {
  display: flex;
  justify-content: space-between;
  position: absolute;
  width: 60%;
  height: 70vh;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
  border: 2px groove var(--secondary-color);
  /* border: 1px solid red; */
}
form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
  height: 70%;
  padding: 2rem;
  gap: 2rem;
  margin: auto;
  /* border-right: 1px solid var(--secondary-color); */
}
.wrap img {
  width: 50%;
  height: 100%;
  /* border-left: 1px solid var(--secondary-color); */
}
h2 {
  font-size: 2rem;
}
input {
  width: 100%;
  height: 4vh;
  border-radius: 5px;
  border: 1px solid gray;
  padding: 0 10px;
  color: rgb(0, 0, 0);
  font-weight: 600;
}
button {
  width: 40%;
  height: 4vh;
  background-color: var(--secondary-color);
  color: var(--primary-color);
  cursor: pointer;
  border-radius: 7px;
  /* margin: auto; */
}
.wrongToken {
  color: red;
  text-align: center;
}
form img {
  height: 1.5rem !important;
}
@media (max-width: 1000px) {
  .wrap img {
    display: none !important;
  }
  .layout2 {
    background-color: var(--primary-color);
  }
  .wrap {
    width: 90%;
  }
  form {
    padding: 0;
    width: 80%;
  }
}
</style>
