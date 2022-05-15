<template>
  <div class="login">
      <div class="left">
          <img class="login-logo" src="../images/balenciaga-dark-mode-logo.png" alt="">
          <form @submit.prevent="$store.commit('handleSubmit')">
              <h2>Log in</h2>
              <input v-model="$store.state.inputPassword" type="password" placeholder="Access Token" required>
              <p>Forgot Token</p>
              <button type="submit" @click="$store.commit('logIn')">Sign in</button>
          </form>
      </div>
      <div class="right"><img src="../images/Login.jpg" alt=""></div>
  </div>
</template>

<script>
export default {
    name: "Login",
}
</script>

<style scpoed>
.login{
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
}
.login>*{
    width: 50%;
    border: 1px solid red;
    height: 100vh;
    padding: 20px 120px;
}
.login-logo{
    width: 50%;
    padding: 6rem 0;
    margin: auto;
}
form{
    border: 1px solid yellow;
    margin-top: 7rem;
    width: 50%;
    margin: auto;
}
form p{
    cursor: pointer;
    display: flex;
    justify-content: end;
}
h2{
    font-size: 2rem;
}
input{
    width: 40%;
    height: 4vh;
    border-radius: 7px;
    border: 1px solid gray;
    padding: 0 10px;
    color: rgb(0, 0, 0);
    font-weight: 600;
}
button{
    width: 40%;
    height: 4vh;
    background-color: #0D161C;
    color: white;
    cursor: pointer;
    border-radius: 7px;
}
</style>