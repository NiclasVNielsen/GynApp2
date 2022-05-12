<template>
  <header class="spaceBoth">
    <h1 style="line-height: .8em">
      Hello, Winston! <br>
      <span style="font-size: 16px">11 april, 2022</span>
    </h1>
    <ul class="dayCalendar">
      <li class="target">
        man
      </li>
      <li>
        tir
      </li>
      <li>
        ons
      </li>
      <li>
        tor
      </li>
      <li>
        fre
      </li>
      <li>
        lør
      </li>
      <li>
        søn
      </li>
    </ul>
  </header>

  <main >
    <section>
      <h2 class="spaceLeft">
        Fysisk
      </h2>
      <section class="sympContainer">
        <!-- Loop start -->
          <div class="symptomThumb" v-for="symp in physicalSymp" :key="symp">
            <figure class="progCircle">
              <div>

              </div>
            </figure>
            <h3>
              Symptom
            </h3>
          </div>
        <!-- Loop end -->
      </section>
    </section>
    <section>
      <h2 class="spaceLeft">
        Phykisk
      </h2>
      <section class="sympContainer">
        <!-- Loop start -->
          <div class="symptomThumb" v-for="symp in physicalSymp" :key="symp">
            <figure class="progCircle">
              <div>

              </div>
            </figure>
            <h3>
              Symptom
            </h3>
          </div>
        <!-- Loop end -->
      </section>
    </section>
  </main>

</template>

<script>
export default({
  setup(){
    const physicalSymp = [1,2,3,4];

    return {
      physicalSymp
    }
  },
  name: 'HomePage',
});
</script>

<style lang="sass" scoped>

.dayCalendar
  background: var(--hvidbg)
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
      //Stroke fill color something
      border-radius: 50%
      width: 110px
      height: 110px
      margin: 0

      display: flex
      justify-content: center
      align-items: center

      //background: var(--blaabg)
      background: var(--hvidbg)
      div
        background: #fff
        width: 94px
        height: 94px
        border-radius: 50%
    h3
      text-align: center
      font-size: 14px

</style>
