<template>
  <div id="overlay">
    <div id="menu">
      <form @submit.prevent="editFromOverlay" class="spaceBoth">
        <h6>
          {{ overlayTitle }}
        </h6>
        <input type="text" placeholder="Navn" v-model="overlayName">
        <div class="actions">
          <a @click="hideOverlay">
            <ion-icon name="arrow-back"></ion-icon>
          </a>
          <button type="submit">
            <ion-icon name="checkmark"></ion-icon>
          </button>
        </div>
        <!-- Need styling and security make sure button! -->
        <div style="background: red; padding: 20px; color: #000" @click="deleteFromOverlay">
          Delete
        </div>
      </form>
    </div>
  </div>
  <header class="spaceBoth">
    <h1 style="line-height: .8em; font-weight: 700">
      Hello, {{ name }}! <br>
      <span style="font-size: 16px">{{currentDate.getDate()}}. {{monthNames[currentDate.getMonth()]}}, {{currentDate.getFullYear()}}</span>
    </h1>
    <ul class="dayCalendar">
      <li :class="currentDate.getDay() == 1 ? 'target' : ''">
        man
      </li>
      <li :class="currentDate.getDay() == 2 ? 'target' : ''">
        tir
      </li>
      <li :class="currentDate.getDay() == 3 ? 'target' : ''">
        ons
      </li>
      <li :class="currentDate.getDay() == 4 ? 'target' : ''">
        tor
      </li>
      <li :class="currentDate.getDay() == 5 ? 'target' : ''">
        fre
      </li>
      <li :class="currentDate.getDay() == 6 ? 'target' : ''">
        lør
      </li>
      <li :class="currentDate.getDay() == 0 ? 'target' : ''">
        søn
      </li>
    </ul>
  </header>

  <main >
    <section>
      <template v-for="type in symptomTypes" :key="type.order">
        <template v-if="type.type == 'symptom'">
          <h2 class="spaceLeft" @click="showOverlay(type.name, 'cat')">
            {{type.name}}
          </h2>
          <section class="sympContainer">
            <!-- Loop start -->
              <template v-for="(symptom) in allSymptoms" :key="symptom">
                <template v-if="symptom.type == type.name">
                  <div class="symptomThumb">
                    <router-link :to="'/createreport/' + symptom.name">
                      <figure class="progCircle" @touchstart="triggerEditSymptom(symptom.name)" @touchend="holdDownTimerInterupt" @touchmove="holdDownTimerInterupt">
                        <div class="pie animate no-round" :style="{'--p': symptom.reports.sort( orderDates )[0].intensity * 10, '--c': type.color}"
                        style="position: relative">
                          <ion-icon :name="symptom.icon" :style="{'color': type.color}"></ion-icon>
                        </div>
                      </figure>
                      <h3>
                        {{symptom.name}}
                      </h3>
                    </router-link>
                  </div>
                </template>
              </template>
            <!-- Loop end -->
            <div class="symptomThumb">
              <router-link :to="'/createsymptom/' + type.name">
                <figure class="progCircle">
                  <div class="addSymptom">
                    <ion-icon name="add-circle"></ion-icon>
                  </div>
                </figure>
                <h3>
                  &nbsp;
                </h3>
              </router-link>
            </div>
          </section>

        </template>
        <template v-if="type.type == 'drug'">

          <h2 class="spaceLeft" @click="showOverlay(type.name, 'cat')">
            {{type.name}}
          </h2>
          <section class="sympContainer">
            <!-- Loop start -->
              <template v-for="(symptom) in allSymptoms" :key="symptom">
                <template v-if="symptom.type == type.name">
                  <div class="medBox medFoT" @click="drugUpdate(symptom.name)" @touchstart="triggerEditSymptom(symptom.name)" @touchend="holdDownTimerInterupt" @touchmove="holdDownTimerInterupt">
                    <div class="title">
                      <p :style="{'color': type.color}">
                        {{symptom.name}}
                      </p>
                      <p class="dose">
                        {{symptom.dose}}
                      </p>
                      <!-- alignitems center -->
                    </div>
                    <div class="info">
                      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M25 4.28932C27.7464 1.54291 31.4713 0 35.3553 0C39.2393 0 42.9643 1.54291 45.7107 4.28932C48.4571 7.03573 50 10.7607 50 14.6447C50 18.5287 48.4571 22.2536 45.7107 25L25 45.7107C23.6401 47.0706 22.0257 48.1493 20.2489 48.8852C18.4722 49.6212 16.5678 50 14.6447 50C10.7607 50 7.03573 48.4571 4.28932 45.7107C1.54291 42.9643 0 39.2393 0 35.3553C0 31.4713 1.54291 27.7464 4.28932 25L25 4.28932ZM33.8784 30.9161L42.7484 22.0461C44.6961 20.0818 45.7864 17.426 45.7808 14.6598C45.7751 11.8936 44.6739 9.24225 42.7182 7.28597C40.7625 5.32968 38.1114 4.22775 35.3452 4.2213C32.579 4.21486 29.9229 5.30442 27.9581 7.25158L19.0839 16.1216L33.8784 30.9161ZM24.3891 36.9411C24.5834 36.7466 24.7374 36.5157 24.8424 36.2617C24.9474 36.0076 25.0014 35.7354 25.0012 35.4606C25.001 35.1857 24.9466 34.9135 24.8413 34.6596C24.7359 34.4058 24.5815 34.1751 24.387 33.9809C24.1925 33.7867 23.9617 33.6327 23.7077 33.5276C23.4536 33.4226 23.1814 33.3687 22.9065 33.3689C22.6317 33.3691 22.3595 33.4234 22.1056 33.5288C21.8518 33.6341 21.6211 33.7885 21.4269 33.983L15.1509 40.259C14.9567 40.4535 14.8027 40.6843 14.6977 40.9383C14.5927 41.1924 14.5387 41.4646 14.5389 41.7395C14.5393 42.2946 14.7602 42.8269 15.153 43.2191C15.5458 43.6114 16.0784 43.8315 16.6335 43.8311C17.1887 43.8307 17.7209 43.6098 18.1132 43.217L24.3891 36.9411Z" :fill="type.color"/>
                      </svg>
                      <div class="pillContainer">
                        <template v-for="(pills, index) in symptom.amount" :key="pills">
                          <div class="pill" :class="index + 1 <= symptom.taken ? 'taken' : ''" :style="{'--notTaken': type.color}"></div>
                        </template>
                      </div>
                    </div>
                  </div>
                </template>
              </template>
            <!-- Loop end -->
            <div class="createDrug medFoT">
              <router-link :to="'/createdrug/' + type.name">
                <div class="addSymptom">
                  <ion-icon name="add-circle"></ion-icon>
                </div>
              </router-link>
            </div>
          </section>

        </template>
      </template>
    </section>
    <div class="addCategory">
      Brug for endnu en  kategori?
      <router-link to="/CreateSymptomCategory">
        <div>
          <ion-icon name="add-circle"></ion-icon>
        </div>
      </router-link>
    </div>
  </main>

  <nav>
    <router-link to="/home">
      <svg width="32" height="26" viewBox="0 0 32 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M31.5852 13.4212L17.1869 0.411748C16.5805 -0.137249 15.4159 -0.137249 14.8095 0.411748L0.411128 13.4212C0.203881 13.608 0.0678459 13.8397 0.0195627 14.0883C-0.0287206 14.3368 0.0128286 14.5913 0.139158 14.821C0.39513 15.2906 0.967866 15.5925 1.5998 15.5925H4.79944V24.6991C4.79944 25.0441 4.96799 25.375 5.26801 25.619C5.56804 25.8629 5.97496 26 6.39926 26H11.1987C11.623 26 12.0299 25.8629 12.33 25.619C12.63 25.375 12.7985 25.0441 12.7985 24.6991V19.4953H19.1978V24.6991C19.1978 25.0441 19.3664 25.375 19.6664 25.619C19.9664 25.8629 20.3734 26 20.7976 26H25.5971C26.0214 26 26.4283 25.8629 26.7284 25.619C27.0284 25.375 27.1969 25.0441 27.1969 24.6991V15.5925H30.3966C30.7064 15.5935 31.0099 15.5213 31.2701 15.3845C31.5303 15.2477 31.736 15.0523 31.862 14.8222C31.988 14.592 32.0289 14.337 31.9798 14.0882C31.9307 13.8394 31.7936 13.6077 31.5852 13.4212Z" fill="#CD573D"/>
      </svg>
    </router-link>
    <router-link to="">
      <svg width="21" height="26" viewBox="0 0 21 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 24.05C0 24.5672 0.205446 25.0632 0.571142 25.4289C0.936838 25.7946 1.43283 26 1.95 26H3.9V0H1.95C1.43283 0 0.936838 0.205446 0.571142 0.571142C0.205446 0.936838 0 1.43283 0 1.95V24.05ZM5.2 0V26H18.2C18.8896 26 19.5509 25.7261 20.0385 25.2385C20.5261 24.7509 20.8 24.0896 20.8 23.4V2.6C20.8 1.91044 20.5261 1.24912 20.0385 0.761522C19.5509 0.273928 18.8896 0 18.2 0L5.2 0ZM14.3 10.4H7.8V9.1H14.3V10.4ZM18.2 7.8H7.8V6.5H18.2V7.8Z" fill="black" fill-opacity="0.3"/>
      </svg>
    </router-link>
    <router-link to="/graph">
      <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.83338 26H2.10005C1.75527 26 1.42461 25.863 1.18081 25.6192C0.937013 25.3754 0.800049 25.0448 0.800049 24.7V16.9C0.800049 16.5552 0.937013 16.2246 1.18081 15.9808C1.42461 15.737 1.75527 15.6 2.10005 15.6H3.83338C4.17816 15.6 4.50882 15.737 4.75262 15.9808C4.99642 16.2246 5.13338 16.5552 5.13338 16.9V24.7C5.13338 25.0448 4.99642 25.3754 4.75262 25.6192C4.50882 25.863 4.17816 26 3.83338 26ZM15.9667 26H14.2334C13.8886 26 13.5579 25.863 13.3141 25.6192C13.0703 25.3754 12.9334 25.0448 12.9334 24.7V11.7C12.9334 11.3552 13.0703 11.0246 13.3141 10.7808C13.5579 10.537 13.8886 10.4 14.2334 10.4H15.9667C16.3115 10.4 16.6422 10.537 16.886 10.7808C17.1298 11.0246 17.2667 11.3552 17.2667 11.7V24.7C17.2667 25.0448 17.1298 25.3754 16.886 25.6192C16.6422 25.863 16.3115 26 15.9667 26ZM22.0334 26H20.3C19.9553 26 19.6246 25.863 19.3808 25.6192C19.137 25.3754 19 25.0448 19 24.7V5.63333C19 5.28855 19.137 4.95789 19.3808 4.71409C19.6246 4.4703 19.9553 4.33333 20.3 4.33333H22.0334C22.3782 4.33333 22.7088 4.4703 22.9526 4.71409C23.1964 4.95789 23.3334 5.28855 23.3334 5.63333V24.7C23.3334 25.0448 23.1964 25.3754 22.9526 25.6192C22.7088 25.863 22.3782 26 22.0334 26ZM9.90005 26H8.16672C7.82193 26 7.49127 25.863 7.24748 25.6192C7.00368 25.3754 6.86672 25.0448 6.86672 24.7V1.3C6.86672 0.955219 7.00368 0.624559 7.24748 0.380761C7.49127 0.136964 7.82193 0 8.16672 0H9.90005C10.2448 0 10.5755 0.136964 10.8193 0.380761C11.0631 0.624559 11.2 0.955219 11.2 1.3V24.7C11.2 25.0448 11.0631 25.3754 10.8193 25.6192C10.5755 25.863 10.2448 26 9.90005 26Z" fill="black" fill-opacity="0.3"/>
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
import { getUserById, updateDrug, editSymptomCategory, editSymptom, drugAutoReportAndDailyReset, deleteSymptomCategory, deleteSymptom } from '../main'
export default({
  setup(){
    const isLoggedIn = ref(false)

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          isLoggedIn.value = true
          getUserById(user.uid)
            .then(data => {
              name.value = data[0].Name
              symptomTypes.value = data[0].SymptomTypes.sort( orderTypes )
              allSymptoms.value = data[0].Symptoms
              uid.value = user.uid
              drugAutoReportAndDailyReset(uid.value)
            })
        } else {
          isLoggedIn.value = false
        }
    })

    const name = ref("")
    const symptomTypes = ref([])
    const allSymptoms = ref([])
    const uid = ref("")


    function orderTypes( a, b ) {
      if ( a.order < b.order ){
        return -1;
      }
      if ( a.order > b.order ){
        return 1;
      }
      return 0;
    }

    function orderDates( a, b ) {
      if ( a.time > b.time ){
        return -1;
      }
      if ( a.time < b.time ){
        return 1;
      }
      return 0;
    }

    const currentDate = new Date()
    const monthNames = ['Januar', 'Febuar', 'Marts', 'April', 'Maj', 'Juni', 'July', 'August', 'September', 'Oktober', 'November', 'December']

    firebase.auth().onAuthStateChanged(function(user) {
        //Nope you don't belong here check
        if (!user) {
            window.location.href = '/login'
            return
        }
    });

    const drugUpdate = (name) => {
      updateDrug(uid.value, name)
    }

    const hideOverlay = () => {
      document.querySelector('#overlay').style.display="none"
    }

    const overlayTitle = ref("")
    const overlayName = ref("")
    let originalName;
    const showOverlay = (name, title) => {
      document.querySelector('#overlay').style.display="block"
      overlayName.value = name
      originalName = name
      if(title == 'cat'){
        overlayTitle.value = "Rediger kategori"
        editType = "cat"
      }
      if(title == 'symp'){
        overlayTitle.value = "Rediger symptom"
        editType = "symp"
      }
    }

    let editType;
    const editFromOverlay = () => {
      if(editType == "cat"){
        editSymptomCategory(uid.value, originalName, overlayName.value)
      }
      if(editType == "symp"){
        editSymptom(uid.value, originalName, overlayName.value) 
      }
      hideOverlay()
    }

    const deleteFromOverlay = () => {
      if(editType == "cat"){
        deleteSymptomCategory(uid.value, originalName) 
      }
      if(editType == "symp"){
        deleteSymptom(uid.value, originalName) 
      }
      hideOverlay()
    }

    let holdDownTimer;
    const triggerEditSymptom = (name) => {
      holdDownTimer = setTimeout(() => {
        showOverlay(name, "symp")
      }, 400);
    }

    const holdDownTimerInterupt = () => {
      clearTimeout(holdDownTimer)
    }



    return {
      name, symptomTypes, allSymptoms, orderDates, currentDate, monthNames, drugUpdate, hideOverlay, 
      showOverlay, overlayName, overlayTitle, editFromOverlay, orderTypes, deleteFromOverlay,
      triggerEditSymptom, holdDownTimerInterupt
    }
  },
  name: 'HomePage',
});
</script>

<style lang="sass" scoped>
@import url('./components/pie.css');

h2
  margin-bottom: 0 !important

.dayCalendar
  background: #ECECEC
  padding: 3px 20px
  display: flex
  justify-content: space-between
  border-radius: 10px
  li
    list-style: none
    width: 13.5%
    text-align: center
    border-radius: 10px
    font-size: 14px
    color: var(--overskrift)
    font-weight: 700
  .target
    background: #fff

.sympContainer
  display: flex
  overflow-x: scroll
  .symptomThumb
    width: 110px
    margin-right: 20px
    &:first-of-type
      margin-left: 20px
    .progCircle
      border-radius: 50%
      width: 110px
      height: 110px
      margin: 0

      display: flex
      justify-content: center
      align-items: center
      margin: 16px 0 0 0
      div
        box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.12)
        border-radius: 50%
        background: radial-gradient(#F6F6F6 59%, #E2E2E2 59%)
        ion-icon
          font-size: 50px
    h3
      text-align: center
      font-size: 14px

  .medFoT
    &:first-of-type
      margin-left: 16px 

  .createDrug
    margin-right: 20px
    margin-bottom: 10px
    margin-top: 16px
    margin-bottom: 30px
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.12)
    width: 110px
    min-width: 110px  
    height: 110px
    display: flex
    justify-items: center
    align-content: center
    background: #F6F6F6
    border-radius: 10px
    position: relative
    div
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)

  .medBox
    margin-right: 20px
    margin-bottom: 10px
    margin-top: 16px
    margin-bottom: 30px
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.12)
    width: 170px
    min-width: 170px  
    height: 110px
    background: #F6F6F6
    border-radius: 10px
    padding: 11px 23px 14px 9px 
    align-content: space-between
    display: flex
    flex-wrap: wrap
    .title
      display: flex
      align-items: center
      p
        color: #E31515
        font-weight: 900
      .dose
        font-size: 12px
        margin-left: 8px
        color: #ADADAD
    .info
      display: flex
      justify-content: space-between
      width: 100%
    .pillContainer
      display: flex
      justify-content: space-around
      align-items: flex-end
      .pill
        height: 28px
        width: 12px
        margin-left: 7px
        border-radius: 6px
        background: var(--notTaken)
      .taken
        background: #E2E2E2

.addSymptom
  border-radius: 50%
  width: 100px
  height: 100px
  display: flex
  align-items: center
  justify-content: center
  background: #F6F6F6 !important
  ion-icon
    font-size: 60px !important
    color: #E2E2E2

.addCategory
  text-align: center
  color: #B3B3B3
  font-size: 10px
  div
    width: 38px
    height: 38px
    background: #F6F6F6
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.12)
    border-radius: 50%
    display: flex
    align-items: center
    justify-content: center
    margin: 3px auto 0
    font-size: 24px
    color: #E2E2E2

#overlay
  display: none
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100vh
  background: rgba(0, 0, 0, 0.5)
  z-index: 100
  #menu
    position: absolute
    bottom: 0
    width: 100%
    background: #F2F2F2
    border-radius: 20px 20px 0 0
    form
      h6
        text-align: center
        font-size: 24px
        font-weight: 700
      input
        display: block
        background: #F6F6F6
        border: none
        width: 100%
        padding: 16.5px
        border-radius: 20px
        color: var(--overskrift)
        margin-bottom: 22px
        margin-top: 20px
      .actions
        margin-bottom: 32px
        display: flex
        justify-content: center
        a, button
          display: block
          width: 61px
          height: 61px
          border-radius: 50%
          display: flex
          justify-content: center
          align-items: center
          font-size: 30px
          margin: 3px
        a
          background: #F6F6F6
          color: #ADADAD
        button
          background: #CD573D
          color: #FFF
</style>
