<template>
<div>
    <!-- this v-if shows one of the two sidebars depending on what the user prefers. -->
    <Navigation v-if="!$store.state.lessSideBar"/>
    <Navigation2 v-else/>
      <!-- The main content starts here -->
      <section class="content">
        <h1>BRAND IN USE</h1>
        <p>We want our brand to be expressed throughout the entire world. We want to visualize our vision with the use of concepts and art-like expressions. Take a look at some of our ideas:</p>
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
};
</script>

<style scoped>
.content {
    position: relative;
    margin-left: 550px;
    width: 60vw;
}

.content p {
    width: 50vw;
    font-size: 1.5rem;
    margin-top: 30px;
}

.content h1 {
    padding-top: 100px;
    font-size: 3rem;
}

.content div p {
    padding-top: 100px;
    font-size: 1.5rem;
}

.content img {
    padding-top: 100px;
    width: 100%;
}

main {
    margin-top: 30px;
    width: 50vw;
}
@media (max-width: 1400px) {
    .artboards {
        padding-top: 100px;
        width: 50vw;
    }
    .content h1 {
        padding-top: 100px;
        font-size: 2rem;
    }
    .content {
        margin-left: 450px;
        width: 50vw;
    }
    .logo {
        width: 360px;
    }
    .content p {
        width: 50vw;
    }
}

@media (max-width: 900px) {
    .artboards {
        padding-top: 50px;
        width: 40vw;
    }
    .content h1 {
        padding-top: 100px;
        font-size: 1rem;
    }
    .content {
        margin-left: 350px;
        width: 40vw;
    }
    .content p {
        width: 40vw;
    }
}
</style>