<template>
  <div>
    <Sidebar />
    <router-view :title="$route.params.id"></router-view>
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue';
export default {
  components: { Sidebar },
  name: 'DashboardPage',
};
</script>

<style scoped>
div {
  background-color: var(--primaryColor);
  min-height: 100vh;
}
#content {
  width: 60%;
  margin-left: 30%;
  margin-top: 5%;
  color: var(--secondaryColor);
}
#content h1 {
  font-size: 2.7rem;
}
#content p {
  font-size: 1.5rem;
}
#content > * {
  margin: 3rem 0;
}
</style>
