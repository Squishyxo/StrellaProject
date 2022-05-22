<template>
<div>
    <!-- this v-if shows one of the two sidebars depending on what the user prefers. -->
    <Navigation v-if="!$store.state.lessSideBar"/>
    <Navigation2 v-else/>
      <!-- The main content starts here -->
  <section class="content">
        <h1>Colors</h1>
        <main class="grid">
            <article>
                <p>WHITE</p>
                <hr>
                <div class="hex-code">#fff</div>
            </article>
            <article>
                <p>BLACK</p>
                <hr>
                <div class="hex-code">#000000</div>
            </article>
            <article>
            </article>
            <article>
            </article>
        </main>
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
  name: "Colors",
  data() {
    return {};
  },
};
</script>

<style scoped>
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 20px 90px;
    align-items: center;
    width: 70%;
}

.grid>article {
    box-shadow: 2px 2px 6px 1px var(--third-color);
    height: 220px;
    background-color: var(--secondary-color);
}
article {
    border-right: 4px solid var(--primary-color);
}

/* article:first-child {
    border-right: 4px solid var(--color-1);
}

article:nth-child(2) {
    border-right: 4px solid var(--color-2);
} */

.grid>article p {
    color: var(--primary-color);
    margin-top: 70px;
    margin-left: 20px;
}

.grid>article hr {
    width: 60%;
    margin-left: 10px;
    margin-top: 10px;
    border: 1px solid var(--primary-color);
}

.grid>article div {
    width: 60%;
    margin-left: 18px;
    margin-top: 10px;
    color: var(--primary-color);
}
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

@media (max-width: 1400px) {
    .content h1 {
        font-size: 2rem;
    }
    .content {
        margin-left: 550px;
    }
}

@media (max-width: 900px) {
    .content h1 {
        font-size: 2rem;
        margin-bottom: 5%;
    }
    .content {
        margin-left: 40%;
    }
    .grid{
        overflow: hidden;
    }
}
@media (max-width: 600px) {
    .grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    padding: 0 1rem;
}
    .content {
    position: static;
    margin-left: 0;
    width: 100%;
}
    .content h1 {
        font-size: 2rem;
        text-align: center;
        margin-top: 5rem;
    }
    .grid {
        width: 100%;
        grid-gap: 2rem;
    }
    .content p {
        padding-top: 5rem;
        margin: auto;
        width: 80%;
        text-align: center;
    }
    .grid>article p {
    margin-top: 0;
    margin-left: 0;
}
}
</style>