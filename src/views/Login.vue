<template>
  <div class="login">
      <div class="left">
          <form>
              <h2>Log in</h2>
              <input type="password" placeholder="Access Token">
              <p>Forgot Token</p>
              <button @click="logIn"><router-link to="/">Sign in</router-link></button>
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

<style>
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
form{
    border: 1px solid yellow;
}
</style>