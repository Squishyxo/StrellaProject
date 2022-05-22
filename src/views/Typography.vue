<template>
  <div>
    <Navigation v-if="!$store.state.lessSideBar"/>
    <Navigation2 v-else/>
          <section class="content">
        <h1>Typography</h1>
        <div>
            <p>Our logo uses Utah Condensed Bold font. This is a very classic look for our brand. Throughout our websites we use variations of Bureau Borsche and Demna Gvasalia. While using our products there’s always a certain level of luxury and expertise.
                We express this through our font usage.
            </p>
        </div>
    </section>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import Navigation2 from "@/components/Navigation2.vue";
export default {
  components: {
    Navigation,
    Navigation2
  },
  name: "Typography",
  data() {
    return {};
  },
};
</script>

<style scoped>
.content {
    position: relative;
    margin-left: 650px;
    width: 60vw;
}

.content p {
    width: 50vw;
    font-size: 1.5rem;
    margin-top: 30px;
}

.content h1 {
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
    .content {
        margin-left: 330px;
        width: 50vw;
    }
    .content p {
        width: 45vw;
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
    }
}
</style>