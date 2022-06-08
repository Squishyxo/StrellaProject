<template>
  <div id="content">
      <h1>{{title}}</h1>
      <p>{{text}}</p>
  </div>
</template>

<script>
export default {
    name: 'DashboardItem',
    props: {
        title: String,
        text: String
    }
}
</script>

<style scoped>
#content h1{
    text-transform: uppercase;
    font-size: 3rem;
}
#content p{
    margin-top: 5rem;
    font-size: 1rem;
}
</style>