<template>
  <router-view/>
</template>

<script>
export default{
      name: "App",
      }
</script>

<style lang="scss">
// @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
:root {
    --primary-color: #fff;
    --secondary-color: #0D161C;
    --third-color: #333333;
    --color-1: #0D161C;
    --nav-color: #0D161C;
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

.content {
    position: relative;
    margin-left: 550px;
    width: 60vw;
}


.content h1 {
    font-size: 3rem;
}

.content div p {
    padding-top: 100px;
    font-size: 2rem;
    width: 100%;
    line-height: 4rem;
    font-family: 'Lato', sans-serif;
    margin: auto;
}

.content img {
    padding-top: 100px;
    width: 100%;
}
.toggle{
    position: fixed;
    bottom: 8rem;
    left: 21rem;
    width: 3rem;
    border: 1px;
    background-color: #fff;
    z-index: 10;
}
.next-btn{
display: none;
}
</style>
