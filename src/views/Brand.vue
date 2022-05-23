<template>
<div>
    <!-- this v-if shows one of the two sidebars depending on what the user prefers. -->
    <Navigation v-if="!lessSideBar"/>
    <Navigation2 v-else/>
      <!-- The main content starts here -->
      <section class="content">
        <h1>BRAND IN USE</h1>
        <div>
        <p>We want our brand to be expressed throughout the entire world. We want to visualize our vision with the use of concepts and art-like expressions. Take a look at some of our ideas:</p>
        </div>
        <div class="artboards">
            <img src="../images/Artboard1.png">
            <img src="../images/Artboard2.png">
            <img src="../images/Artboard3.png">
            <img src="../images/Brandinuse4.jpg">
            <img src="../images/Brandinuse5.jpg">
            <img src="../images/brandinuse6.jpg">
        </div>
    </section>
    </div>
      <!-- content ends here -->
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import Navigation2 from "@/components/Navigation2.vue";
export default {
  components: {
    Navigation,
    Navigation2
  },
  name: "Brand",
  data() {
    return {};
  },
    computed: {
        lessSideBar(){
            return this.$store.state.lessSideBar
        }
    }
};
</script>

<style scoped>
@media (max-width: 1400px) {
    .content h1 {
        font-size: 2rem;
    }
    .content {
        margin-left: 450px;
        width: 50vw;
    }
    .content p {
        width: 50vw;
    }
}

@media (max-width: 900px) {
    .content h1 {
        font-size: 2rem;
    }
    .content {
        margin-left: 350px;
        width: 40vw;
    }
    .content p {
        width: 40vw;
    }
}
@media (max-width: 600px) {
    .content h1 {
        font-size: 2rem;
        text-align: center;
        margin-top: 5rem;
    }
    .content {
        margin: auto;
        width: 100%;
    }
    .content p {
        padding-top: 5rem;
        margin: auto;
        width: 80%;
        text-align: center;
        font-size: 1rem;
        line-height: 2rem;
    }
    .artboards{
        width: 80%;
        margin: auto;
    }
}
</style>