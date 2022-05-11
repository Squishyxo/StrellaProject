<template>
<div>
    <Navigation />
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
            <article>
            </article>
            <article>
            </article>
        </main>
        <!-- <section id="side-column">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </section> -->
    </section>
    </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
export default {
  components: {
    Navigation,
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
    height: 70vh;
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
        width: 30vw;
    }
    .content h1 {
        padding-top: 100px;
        font-size: 2rem;
    }
    .content {
        margin-left: 550px;
        width: 30vw;
    }
    .logo {
        width: 360px;
    }
    .logo img {
        margin-top: 10px;
        width: 200px;
    }
    .side-menu ul {
        width: 241px;
    }
    .side-menu ul li a {
        font-size: 1.5rem;
    }
    .bottom-menu {
        width: 360px;
    }
    .bottom-menu a {
        padding: 30px;
    }
    .bottom-menu a img {
        width: 40px;
    }
    .content p {
        width: 30vw;
    }
}

@media (max-width: 900px) {
    .artboards {
        padding-top: 50px;
        width: 30vw;
    }
    .content h1 {
        padding-top: 100px;
        font-size: 1rem;
    }
    .content {
        margin-left: 300px;
        width: 30vw;
    }
    .logo {
        width: 260px;
    }
    .logo img {
        margin-top: 15px;
        width: 150px;
    }
    .side-menu ul {
        width: 175px;
    }
    .side-menu ul li a {
        font-size: 1rem;
    }
    .bottom-menu {
        width: 260px;
    }
    .bottom-menu a {
        padding: 20px;
    }
    .bottom-menu a img {
        width: 30px;
    }
    .content p {
        width: 30vw;
    }
    .content div p {
        font-size: 1.3rem;
    }
}
</style>