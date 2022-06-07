<template>
  <div class="content">
      {{title}}
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

<style>
#content{
    margin-left: 600px;
    font-size: 5rem;
}
</style>