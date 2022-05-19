<template>
  <div>
    <Navigation v-if="!$store.state.lessSideBar"/>
    <Navigation2 v-else/>
        <section class="content">
        <h1>Introduction</h1>
        <div>
            <p :class="[ editable ? 'edit-border' : '']" id="intro-text" :v-model="text">{{text}}
                <!-- Welcome to Balenciaga’s Brand Guide System. Within this Brand Guide System, the Balenciaga brand internally and externally is explained and you will find the tools necessary for successfully promoting and implementing the brand. Using our
                brand guide ensures the consistency throughout any product or services that we offer.  -->
                </p>
        </div>
    </section>
    <div v-if="$store.state.loggedIn">
        <div
            @click="editText"
            @mouseover="pencilHovered = true"
            @mouseleave="pencilHovered = false"
         class="editBtn"><img src="../images/edit.png"></div>
        <div v-if="pencilHovered" class="editOnHover">edit text</div>
    </div>

    <div class="save-changes" v-if="editable"><p>You can click on the text and start editing, when you finish click save.</p><button @click="saveShanges">SAVE CHANGES</button></div>
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
  name: "Home",
        data() {
        return {
            pencilHovered: false,
            editable: false,
            text: ''
    };
  },
    mounted:function(){
        this.getText() 
  },
    methods: {
        getText(){
              fetch('https://s3-project-8f792-default-rtdb.europe-west1.firebasedatabase.app/introText.json').then((response) => {
                if (response.ok){
                    return response.json();
                }
            }).then((data) => {
                this.text = data;
                // document.getElementById('intro-text').innerHTML = data.introText
            });
        },
       editText(){
           this.editable = !this.editable;
           document.getElementById("intro-text").contentEditable = this.editable;
       },
       saveShanges(){
            let value = document.getElementById('intro-text').innerText;
        fetch('https://s3-project-8f792-default-rtdb.europe-west1.firebasedatabase.app/introText.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value),
        });
           this.editable = false;
       }
    }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500&display=swap');;
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
    font-size: 2.5rem;
    font-family: 'Space Grotesk', sans-serif;
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
    width: 10rem;
    height: 50px;
    text-align: center;
    background-color: var(--primary-color);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    text-transform: uppercase;
}
.edit-border{
    border: .3rem inset var(--secondary-color);
    padding: 2rem;
}
.save-changes{
    border: .2rem solid var(--secondary-color);
    position: absolute;
    bottom: 20%;
    right: 20%;
    padding: 1rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 600;
    text-transform: uppercase;
    display: flex;
}
.save-changes p{
    margin: auto;
}
.save-changes button{
    width: 10rem;
    margin: 0 2rem;
}
.toggle img{
  width: 2rem;
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
