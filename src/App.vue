<template>
  <router-view/>
</template>

<script>
export default{
      name: "App",
      }
</script>

<style lang="scss">
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
.toggle{
    position: fixed;
    bottom: 8rem;
    left: 21rem;
    width: 3rem;
    border: 1px;
    background-color: #fff;
    z-index: 10;
}
</style>
