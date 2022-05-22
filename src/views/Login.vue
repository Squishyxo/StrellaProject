<template>
  <div class="login">
      <div class="left">
        <img v-if="$store.state.lightTheme" class="login-logo" src="../images/logo.png">
        <img v-else class="login-logo" src="../images/balenciaga-dark-mode-logo.png">
          <form @submit.prevent="$store.commit('handleSubmit')">
              <h2>Log in</h2>
              <input v-model="$store.state.inputPassword" type="password" placeholder="Access Token" required>
              <a href="https://youtu.be/rKWGV8SVmtE" target="_blank">Forgot Token</a>
              <p class="wrongToken" v-if="$store.state.wrongToken">Worng password</p>
              <button type="submit">Sign in</button>
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
    height: 100vh;
    padding: 20px 120px;
}
.login-logo{
    width: 50%;
    padding: 6rem 0;
    margin: auto;
}
.left img{
    /* border: 1px solid yellow; */
    width: 15rem;

}
form{
    /* border: 1px solid yellow; */
    margin-top: 7rem;
    width: 90%;
    height: 40vh;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}
form a{
    cursor: pointer;
    display: flex;
    justify-content: end;
    color: black;
}
h2{
    font-size: 2rem;
}
input{
    width: 100%;
    height: 4vh;
    border-radius: 5px;
    border: 1px solid gray;
    padding: 0 10px;
    color: rgb(0, 0, 0);
    font-weight: 600;
    /* margin-top: 7rem; */
}
button{
    width: 40%;
    height: 4vh;
    background-color: #0D161C;
    color: white;
    cursor: pointer;
    border-radius: 7px;
    margin: auto;
    /* margin-top: 2rem; */
}
.wrongToken{
    color: red;
    text-align: center;
}
@media (max-width: 900px) {
    .right{
        display: none;
    }
    .left{
        width: 100%;
    }
    .login>*{
    width: 100%;
    height: 100vh;
    padding: 20px 12px;
}
.login-logo{
    width: 100%;
    padding: 6rem 0;
    margin: auto;
}
}
</style>