<template>
<div class="spaceBoth">
  <header>
    <div>
      <h1>
        Ny Kategori
      </h1>
    </div>
  </header>
  <form @submit.prevent="create">
    <input type="text" placeholder="Navn" name="name" id="name" v-model="name" required>
    <p>
        Farve valg er på vej!
    </p>
    <!-- <input type="text" placeholder="Farve" name="color" id="color" v-model="color"> -->
    <select name="color" id="color" v-model="color" required>
        <option value="" disabled selected>Farve</option>
        <option value="red">Rød</option>
        <option value="green">Grøn</option>
    </select>
    <select name="type" id="type" v-model="type" required>
        <option value="" disabled selected>Type</option>
        <option value="symptom">Symptomer</option>
        <option value="drug">Medicin</option>
    </select>
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
import { createSymptomsCategory } from '@/main.js'
import { useRouter } from 'vue-router'

export default({
  setup(){
    const name = ref("")
    const color = ref("")
    const type = ref("")
      
    const router = useRouter()

    const create = () => {
      const auth = getAuth()
      let user = auth.currentUser.uid
      createSymptomsCategory(user, color.value, name.value, type.value)
      router.push({ name: 'Home' })
    }

    return{
      create, color, type, name
    }
  }
});
</script>

<style lang="sass" scoped>

::placeholder 
  color: #ADADAD


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
    margin-left: 30%
    h1
      font-size: 24px !important
      font-weight: 700
      margin: 0

form
  input, select, textarea
    display: block
    width: 100%
    border-radius: 20px
    margin-bottom: 20px
    padding: 16px
    border: none
    background: #F6F6F6
    color: var(--overskrift)
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
