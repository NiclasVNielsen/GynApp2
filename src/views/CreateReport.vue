<template>
<div class="spaceBoth">
  <header>
    <figure>
      <ion-icon :name="symptomIcon" style="color: var(--overskrift)"></ion-icon>
    </figure>
    <div>
      <h1>
        {{ symptom }}
      </h1>
    </div>
  </header>
  <form @submit.prevent="create">
    <input type="datetime-local" v-model="time"> <!-- Should give current time -->
    <!-- For some reason this dosent work sometimes and i have too add a {{time}} and remove it again -->
    <label for="intensity">
      Intensitet
    </label>
    <input name="intensity" type="range" min="1" max="10" v-model="intensity">
    <label for="journal">
      Skriv journal (Valgfri)
    </label>
    <textarea name="journal" id="journal" cols="30" rows="10" v-model="journal"></textarea>
    <div class="actions">
      <router-link to="/home">
        <ion-icon name="arrow-back"></ion-icon>
      </router-link>
      <button type="submit">
        <ion-icon name="checkmark"></ion-icon>
      </button>
    </div>
  </form>
</div>
</template>

<script>
import { ref } from 'vue'
import { getAuth } from "firebase/auth"
import { createReport, getUserById } from '../main'
import firebase from 'firebase/compat/app'
import { useRoute, useRouter } from 'vue-router'

export default({
  setup(){
    const time = ref(`${new Date().getFullYear()}-${new Date().getMonth() < 9 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)}-${new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()}T${new Date().getHours()}:${new Date().getMinutes()}`)
    const intensity = ref()
    const journal = ref("")

    const route = useRoute()
    const router = useRouter()

    const symptom = route.params.symptom
    const allSymptoms = ref([])
    const symptomIcon = ref("")

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          getUserById(user.uid)
            .then(data => {
              allSymptoms.value = data[0].Symptoms
              for(let i = 0; i < allSymptoms.value.length; i++){
                if(allSymptoms.value[i].name == symptom){
                  symptomIcon.value = allSymptoms.value[i].icon
                }
              }
            })
        }
    })

    

    const create = () => {
      const auth = getAuth()
      let user = auth.currentUser.uid
      createReport(user, route.params.symptom, time.value, intensity.value, journal.value)
      router.push({ name: 'Home'})
    }


    return{
      create, time, time, intensity, journal, symptom, symptomIcon
    }
  }
});
</script>

<style lang="sass" scoped>

header
  display: flex
  align-items: center
  margin: 33px 0
  figure
    width: 30%
    margin: 0
    font-size: 60px
    display: flex
    justify-content: center
  div
    width: 40%
    margin-right: 30%
    h1
      font-size: 24px !important
      font-weight: 700
      margin: 0
      text-align: center

form
  input, select, textarea
    display: block
    width: 100%
    border-radius: 20px
    margin-bottom: 20px
    padding: 16px
    border: none
    background: #F6F6F6
    color: #ADADAD
    &[type=range]
      padding: 0
  textarea
    resize: none
  label
    color: var(--overskrift)
    font-weight: 700
    margin-bottom: 5px
    display: block
  .actions
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
