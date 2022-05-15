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
              <div class="pie animate no-round" style="--p:60;--c:#3D5BCD; position: relative">
                <ion-icon name="aperture" style="color: #3D5BCD"></ion-icon>
              </div>
            </figure>
            <h3>
              Missing Cake
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
              <div class="pie animate no-round" style="--p:30;--c:#219D0D; position: relative">
                <ion-icon name="bug" style="color: #219D0D"></ion-icon>
              </div>
            </figure>
            <h3>
              Brain Lag
            </h3>
          </div>
        <!-- Loop end -->
      </section>
    </section>
    
    <section>
      <h2 class="spaceLeft">
        Medicin
      </h2>
      <section class="sympContainer">
        <!-- Loop start -->
          <div class="medBox" v-for="symp in physicalSymp" :key="symp">
            <div class="title">
              <p>
                Medicin
              </p>
              <p class="dose">
                100mg
              </p>
              <!-- alignitems center -->
            </div>
            <div class="info">
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25 4.28932C27.7464 1.54291 31.4713 0 35.3553 0C39.2393 0 42.9643 1.54291 45.7107 4.28932C48.4571 7.03573 50 10.7607 50 14.6447C50 18.5287 48.4571 22.2536 45.7107 25L25 45.7107C23.6401 47.0706 22.0257 48.1493 20.2489 48.8852C18.4722 49.6212 16.5678 50 14.6447 50C10.7607 50 7.03573 48.4571 4.28932 45.7107C1.54291 42.9643 0 39.2393 0 35.3553C0 31.4713 1.54291 27.7464 4.28932 25L25 4.28932ZM33.8784 30.9161L42.7484 22.0461C44.6961 20.0818 45.7864 17.426 45.7808 14.6598C45.7751 11.8936 44.6739 9.24225 42.7182 7.28597C40.7625 5.32968 38.1114 4.22775 35.3452 4.2213C32.579 4.21486 29.9229 5.30442 27.9581 7.25158L19.0839 16.1216L33.8784 30.9161ZM24.3891 36.9411C24.5834 36.7466 24.7374 36.5157 24.8424 36.2617C24.9474 36.0076 25.0014 35.7354 25.0012 35.4606C25.001 35.1857 24.9466 34.9135 24.8413 34.6596C24.7359 34.4058 24.5815 34.1751 24.387 33.9809C24.1925 33.7867 23.9617 33.6327 23.7077 33.5276C23.4536 33.4226 23.1814 33.3687 22.9065 33.3689C22.6317 33.3691 22.3595 33.4234 22.1056 33.5288C21.8518 33.6341 21.6211 33.7885 21.4269 33.983L15.1509 40.259C14.9567 40.4535 14.8027 40.6843 14.6977 40.9383C14.5927 41.1924 14.5387 41.4646 14.5389 41.7395C14.5393 42.2946 14.7602 42.8269 15.153 43.2191C15.5458 43.6114 16.0784 43.8315 16.6335 43.8311C17.1887 43.8307 17.7209 43.6098 18.1132 43.217L24.3891 36.9411Z" fill="#E31515"/>
              </svg>
              <div class="pillContainer">
                <div class="pill"></div>
                <div class="pill"></div>
              </div>
              <!-- justify spacebetween -->
            </div>
          </div>
        <!-- Loop end -->
      </section>
    </section>
  </main>

  <nav>

  </nav>

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
@import url('./components/pie.css');

h2
  margin-bottom: 0 !important

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
        background: radial-gradient(#fff 59%, var(--hvidbg) 59%)
        ion-icon
          font-size: 50px
    h3
      text-align: center
      font-size: 14px

  .medBox
    margin-right: 20px
    margin-bottom: 10px
    margin-top: 16px
    margin-bottom: 30px
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.12)
    width: 170px
    min-width: 170px  
    height: 110px
    background: var(--hvidbg)
    border-radius: 10px
    padding: 11px 23px 14px 9px 
    align-content: space-between
    display: flex
    flex-wrap: wrap
    &:first-of-type
      margin-left: 16px 
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
      width: 31px
      align-items: flex-end
      .pill
        height: 28px
        width: 12px
        border-radius: 6px
        background: #E31515

nav
  position: fixed
  bottom: 30px
  left: 50%
  transform: translateX(-50%)
  width: 300px
  height: 56px
  border-radius: 20px
  background: var(--hvidbg)
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.12)

</style>
