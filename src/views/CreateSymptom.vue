<template>
<div class="spaceBoth">
  <header>
    <div>
      <h1>
        Nyt Symptom
      </h1>
    </div>
  </header>
  <form action="">
    <input type="text" placeholder="Navn">
    <div class="actions">
      <a href="/home">
        <ion-icon name="arrow-back"></ion-icon>
      </a>
      <button type="submit">
        <ion-icon name="checkmark"></ion-icon>
      </button>
    </div>
  </form>
</div>
</template>

<script>
export default({
  setup(){
      
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
