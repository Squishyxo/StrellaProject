<template>
  <div>
    <Navigation />
        <section class="content">
        <h1>Introduction</h1>
        <div>
            <p>Welcome to Balenciaga’s Brand Guide System. Within this Brand Guide System, the Balenciaga brand internally and externally is explained and you will find the tools necessary for successfully promoting and implementing the brand. Using our
                brand guide ensures the consistency throughout any product or services that we offer. </p>
        </div>
    </section>
    <div v-if="$store.state.loggedIn">
        <div
            @mouseover="pencilHovered = true"
            @mouseleave="pencilHovered = false"
         class="editBtn"><img src="../images/edit.png"></div>
        <div v-if="pencilHovered" class="editOnHover">Change a font</div>
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
export default {
  components: {
    Navigation
  },
  name: "Home",
        data() {
        return {
            pencilHovered: false,
            // loggedIn: false,                                

    };
  },
    //   methods: {
    //     logIn(){
    //         this.loggedIn = !this.loggedIn
    //         }
    //     }
};
</script>

<style scoped>
.content {
    position: relative;
    margin-left: 600px;
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
.editBtn{
    position: absolute;
    right: 10%;
    top: 50%;
    border: 2px solid var(--secondary-color);
    border-radius: 50%;
    padding: 15px;
    background-color: #0D161C;
    cursor: pointer;
}
.editOnHover{
    position: absolute;
    right: 10%;
    top: 44%;
    border: 2px solid var(--secondary-color);
    padding: 10px;
    width: 150px;
    height: 50px;
    text-align: center;
}
@media (max-width: 1400px) {
    .content h1 {
        padding-top: 100px;
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
</style>
