<template>
<div>
      <!-- this v-if shows one of the two sidebars depending on what the user prefers. -->
    <Navigation v-if="!$store.state.lessSideBar"/>
    <Navigation2 v-else/>
      <!-- content starts here -->
    <section class="content">
        <h1>Logo</h1>
        <div>
            <p>The Balenciaga brand uses text as its main logo. In many cases we switch it up by using interesting and exciting variants throughout various medium. Our logo is our brand. It speaks for us and it shows the viewers who we are and what we do.
                Some silhouettes require a different form of brand recognition, therefore we apply our brand logo differently according to the design.
            </p>
        </div>
        <div class="logo-container">
            <div class="primary-logo">
                <div class="white-background">
                    <img src="../images/balenciaga-dark-mode-logo.png" alt="white logo">
                </div>
                <div class="black-background">
                    <img src="../images/logo.png" alt="black logo">
                    <div class="logo-footer"><span>WORDMARK</span><span class="dot"></span><span>BALENCIAGA</span></div>
                </div>
            </div>
            <div class="secondary-logo">
                <div class="white-background">
                    <img src="../images/2nd-logo-black.png" alt="2nd white logo">
                </div>
                <div class="black-background dark-background">
                    <img src="../images/2nd-logo-white.webp" alt="2nd black logo">
                    <div class="logo-footer"><span>SECONDARY LOGO</span><span class="dot"></span><span>BALENCIAGA</span></div>
                </div>
            </div>
            <div class="third-logo">
                    <img src="../images/clear-space.jpeg" alt="3rd white logo">
                    <div class="logo-footer black"><span>CLEAR SPACE</span><span class="dot"></span><span>BALENCIAGA</span></div>
            </div>
        </div>
    </section>
      <!-- content ends here -->
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
  name: "Logo",
  data() {
    return {};
  },
};
</script>

<style scoped>
.logo-container {
    width: 60vw;
    height: auto;
    margin-top: 70px;
}

.primary-logo, .secondary-logo, .third-logo {
    display: flex;
    border: 1px solid black;
    margin: 60px 0;
    position: relative;
    align-items: center;
}
.third-logo{
    height: 70vh;
    background-color: #fff;
}

.primary-logo div img, .secondary-logo div img, .third-logo img{
    padding: 0 20px;
}

.white-background {
    background-color: #fff;
    width: 50%;
    height: 70vh;
    display: flex;
    align-items: center;
}

.black-background {
    background-color: black;
    width: 50%;
    height: 70vh;
    position: relative;
    display: flex;
    align-items: center;
}
.dark-background{
    background-color: #131217;
}
.dark-background img{
    margin-top: 60px;
}
.black .dot{
    background-color: black!important;
}
.black span{ 
    color: black!important;
}

.logo-footer {
    color: rgb(255, 255, 255);
    position: absolute;
    display: flex;
    align-items: center;
    bottom: 0;
    right: 0;
}
.logo-footer span {
  margin: 0 5px;
}
.dot {
    height: 7px;
    width: 7px;
    background-color: #fff;
    border-radius: 50%;
}
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
#two {
    background-color: var(--primary-color);
    color: var(--secondary-color);
}

.side-menu #two a {
    color: var(--secondary-color);
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
        width: 40vw;
    }
    .logo-container {
    width: 50vw;
}
}
@media (max-width: 1111px) {
    .content, .logo-container {
        width: 50vw;
    }
    .logo-container {
        width: 50vw;
    }
    .dark-background img{
    margin-top: 30px;
    }
    .logo-footer span {
    margin: 0 2px;
    font-size: .6rem;
    }
    .dot {
    height: 4px;
    width: 4px;
    }
}

@media (max-width: 900px) {
    .content{
        margin-left: 300px;
        width: 50vw;
    }
        .logo-container {
        width: 50vw;
    }
    .content p {
        width: 40vw;
    }
}
</style>