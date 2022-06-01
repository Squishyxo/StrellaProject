<template>
  <div class="selector">
    <div class="layout1"></div>
    <div class="layout2"></div>
    <section>
      <router-link to="/"><div>BALENCIAGA</div></router-link>
      <router-link to="/dashboard/home"><div>+</div></router-link>
    </section>
  </div>
</template>

<script>
export default {
  name: 'DashboardSelector',
};
</script>

<style scoped>
a {
  all: unset;
}
.selector {
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
section {
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
section a div {
  cursor: pointer;
  width: 30vw;
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  margin: 3rem;
  border: 4px solid var(--secondary-color);
  border-radius: 10px;
  color: var(--secondary-color);
  transition: 0.4s ease-in-out;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
}
section a div:nth-child(1) {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(255, 255, 255, 0.3) 0px 30px 60px -30px,
    rgba(255, 255, 255, 0.35) 0px -2px 6px 0px inset;
  background-color: #fff;
  color: var(--secondary-color);
}
section div:hover {
  transform: scale(1.1);
}
@media (max-width: 1200px) {
  section a div {
    font-size: 2rem;
  }
}
@media (max-width: 800px) {
  section a div {
    font-size: 1rem;
  }
}
@media (max-width: 600px) {
  section {
    flex-direction: column;
  }
  section a div {
    width: 80vw;
    font-size: 2rem;
  }
}
</style>
