<template>
<div class="spaceBoth">
  <header>
    <h1>
      Rapport
    </h1>
  </header>
  <section class="graph">
      <div class="cyllinder">
          <figure></figure>
      </div>
      <div class="cyllinder">
          <figure></figure>
      </div>
      <div class="cyllinder">
          <figure></figure>
      </div>
      <div class="cyllinder">
          <figure></figure>
      </div>
      <div class="cyllinder">
          <figure></figure>
      </div>
      <div class="cyllinder">
          <figure></figure>
      </div>
      <div class="cyllinder">
          <figure></figure>
      </div>
  </section>
  <div>
</div>
    <h2>
      Tracking
    </h2>
    <p class="fadedText">
      Vælg hvad du vil tracke
    </p>
  </div>
  <h4 class="selectorTitle spaceBoth">
    Kategorier
  </h4>
  <div class="selectorContainer">
    <template v-for="(category, index) in categories" :key="category">
      <template v-if="category.type != 'drug'">
        <div @click="selectCategory(index)" :class="targetCategory.name == category.name ? 'target' : ''">
            {{category.name}}
        </div>
      </template>
    </template>
  </div>
  <h4 class="selectorTitle spaceBoth">
      Symptomer
  </h4>
  <div class="selectorContainer">
    <template v-for="(symptom, index) in symptoms" :key="symptom">
      <div @click="selectSymptom(index)" :class="targetSymptom.name == symptom.name ? 'target' : ''">
          {{symptom.name}}
      </div>
    </template>
  </div>

  <nav>
    <router-link to="/home">
      <svg width="32" height="26" viewBox="0 0 32 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M31.5852 13.4212L17.1869 0.411748C16.5805 -0.137249 15.4159 -0.137249 14.8095 0.411748L0.411128 13.4212C0.203881 13.608 0.0678459 13.8397 0.0195627 14.0883C-0.0287206 14.3368 0.0128286 14.5913 0.139158 14.821C0.39513 15.2906 0.967866 15.5925 1.5998 15.5925H4.79944V24.6991C4.79944 25.0441 4.96799 25.375 5.26801 25.619C5.56804 25.8629 5.97496 26 6.39926 26H11.1987C11.623 26 12.0299 25.8629 12.33 25.619C12.63 25.375 12.7985 25.0441 12.7985 24.6991V19.4953H19.1978V24.6991C19.1978 25.0441 19.3664 25.375 19.6664 25.619C19.9664 25.8629 20.3734 26 20.7976 26H25.5971C26.0214 26 26.4283 25.8629 26.7284 25.619C27.0284 25.375 27.1969 25.0441 27.1969 24.6991V15.5925H30.3966C30.7064 15.5935 31.0099 15.5213 31.2701 15.3845C31.5303 15.2477 31.736 15.0523 31.862 14.8222C31.988 14.592 32.0289 14.337 31.9798 14.0882C31.9307 13.8394 31.7936 13.6077 31.5852 13.4212Z" fill="black" fill-opacity="0.3"/>
      </svg>
    </router-link>
    <router-link to="">
      <svg width="21" height="26" viewBox="0 0 21 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 24.05C0 24.5672 0.205446 25.0632 0.571142 25.4289C0.936838 25.7946 1.43283 26 1.95 26H3.9V0H1.95C1.43283 0 0.936838 0.205446 0.571142 0.571142C0.205446 0.936838 0 1.43283 0 1.95V24.05ZM5.2 0V26H18.2C18.8896 26 19.5509 25.7261 20.0385 25.2385C20.5261 24.7509 20.8 24.0896 20.8 23.4V2.6C20.8 1.91044 20.5261 1.24912 20.0385 0.761522C19.5509 0.273928 18.8896 0 18.2 0L5.2 0ZM14.3 10.4H7.8V9.1H14.3V10.4ZM18.2 7.8H7.8V6.5H18.2V7.8Z" fill="black" fill-opacity="0.3"/>
      </svg>
    </router-link>
    <router-link to="/graph">
      <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.83338 26H2.10005C1.75527 26 1.42461 25.863 1.18081 25.6192C0.937013 25.3754 0.800049 25.0448 0.800049 24.7V16.9C0.800049 16.5552 0.937013 16.2246 1.18081 15.9808C1.42461 15.737 1.75527 15.6 2.10005 15.6H3.83338C4.17816 15.6 4.50882 15.737 4.75262 15.9808C4.99642 16.2246 5.13338 16.5552 5.13338 16.9V24.7C5.13338 25.0448 4.99642 25.3754 4.75262 25.6192C4.50882 25.863 4.17816 26 3.83338 26ZM15.9667 26H14.2334C13.8886 26 13.5579 25.863 13.3141 25.6192C13.0703 25.3754 12.9334 25.0448 12.9334 24.7V11.7C12.9334 11.3552 13.0703 11.0246 13.3141 10.7808C13.5579 10.537 13.8886 10.4 14.2334 10.4H15.9667C16.3115 10.4 16.6422 10.537 16.886 10.7808C17.1298 11.0246 17.2667 11.3552 17.2667 11.7V24.7C17.2667 25.0448 17.1298 25.3754 16.886 25.6192C16.6422 25.863 16.3115 26 15.9667 26ZM22.0334 26H20.3C19.9553 26 19.6246 25.863 19.3808 25.6192C19.137 25.3754 19 25.0448 19 24.7V5.63333C19 5.28855 19.137 4.95789 19.3808 4.71409C19.6246 4.4703 19.9553 4.33333 20.3 4.33333H22.0334C22.3782 4.33333 22.7088 4.4703 22.9526 4.71409C23.1964 4.95789 23.3334 5.28855 23.3334 5.63333V24.7C23.3334 25.0448 23.1964 25.3754 22.9526 25.6192C22.7088 25.863 22.3782 26 22.0334 26ZM9.90005 26H8.16672C7.82193 26 7.49127 25.863 7.24748 25.6192C7.00368 25.3754 6.86672 25.0448 6.86672 24.7V1.3C6.86672 0.955219 7.00368 0.624559 7.24748 0.380761C7.49127 0.136964 7.82193 0 8.16672 0H9.90005C10.2448 0 10.5755 0.136964 10.8193 0.380761C11.0631 0.624559 11.2 0.955219 11.2 1.3V24.7C11.2 25.0448 11.0631 25.3754 10.8193 25.6192C10.5755 25.863 10.2448 26 9.90005 26Z" fill="#CD573D"/>
      </svg>
    </router-link>
    <router-link to="/profile">
      <svg width="21" height="26" viewBox="0 0 21 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.4445 11.5556C11.5872 11.5556 12.7043 11.2167 13.6544 10.5818C14.6046 9.94696 15.3451 9.04459 15.7825 7.98884C16.2198 6.93309 16.3342 5.77137 16.1112 4.65059C15.8883 3.52981 15.338 2.50031 14.53 1.69227C13.722 0.884237 12.6925 0.333958 11.5717 0.111021C10.4509 -0.111916 9.28918 0.0025034 8.23342 0.43981C7.17767 0.877116 6.27531 1.61767 5.64044 2.56782C5.00557 3.51797 4.66671 4.63504 4.66671 5.77778C4.66671 7.31014 5.27543 8.77974 6.35898 9.86329C7.44252 10.9468 8.91212 11.5556 10.4445 11.5556ZM19.1112 26C19.4942 26 19.8616 25.8478 20.1325 25.5769C20.4034 25.306 20.5556 24.9386 20.5556 24.5556C20.5556 21.8739 19.4903 19.3021 17.5941 17.4059C15.6979 15.5097 13.1261 14.4444 10.4445 14.4444C7.76285 14.4444 5.19105 15.5097 3.29485 17.4059C1.39865 19.3021 0.333374 21.8739 0.333374 24.5556C0.333374 24.9386 0.485556 25.306 0.756442 25.5769C1.02733 25.8478 1.39473 26 1.77782 26H19.1112Z" fill="black" fill-opacity="0.3"/>
      </svg>
    </router-link>
  </nav>
</template>

<script>
import { ref } from 'vue'
import firebase from 'firebase/compat/app'
import { getCategoriesById, getSymptomsByCategory } from '../main'

export default({
  setup(){
    const categories = ref([])
    const targetCategory = ref([])
    const symptoms = ref([])
    const targetSymptom = ref([])
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          getCategoriesById(user.uid)
            .then(data => {
              categories.value = data[0]
            })
        }
    })

    function selectCategory(index){
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                getSymptomsByCategory(user.uid, categories.value[index])
                    .then(data => {
                        symptoms.value = data
                        targetCategory.value = categories.value[index]
                    })
                }
        })
    }
    
    function selectSymptom(index){
        targetSymptom.value = symptoms.value[index]
        /* Control the graph here! */
    } 

    return{
      categories, selectCategory, symptoms, selectSymptom, targetCategory, targetSymptom
    }
  }
});
</script>

<style lang="sass" scoped>
.graph
    background: #F6F6F6
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.12)
    height: 231px
    border-radius: 10px
    margin-bottom: 19px
    margin-top: 56px
    display: flex
    justify-content: space-between
    padding: 16px 24px 0
    .cyllinder
        width: 16px
        height: 166px
        background: #EAEAEA
        border-radius: 8px
        display: flex
        align-items: flex-end
        figure
            height: calc(16.6px * 0)
            width: 100%
            background: #CB563D
            margin: 0 !important
            border-radius: 8px

h1
    font-size: 32px
    font-weight: 700
    text-align: center
    margin-top: 11px

h2
    font-size: 24px
    font-weight: 700
    margin: 0 !important
.fadedText
    color: #B3B3B3
    font-size: 13px

.selectorTitle
    color: #B3B3B3
    font-size: 16px

.selectorContainer
    display: flex
    overflow-x: scroll
    padding: 15px 0px 30px 0px
    div
        padding: 11.5px 20px
        background: #F2F2F2
        color: var(--overskrift)
        border-radius: 10px
        font-weight: 700
        box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.12)
        margin-right: 10px
        white-space: nowrap
        &:first-of-type
            margin-left: 16px
        &:last-of-type
            margin-right: 16px
    .target
        color: #fff
        background: #CB563D

</style>
