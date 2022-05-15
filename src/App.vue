<template>
  <div class="sudoBody">
    <ion-app>
      <ion-router-outlet />
    </ion-app>
  </div>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  }
});
</script>

<style lang="sass">
#app
  --overskrift: #20214F
  --broedtekst: #303188
  --hvidtekst: #FFFFFF
  --cta: #DC5B6B
  --hvidbg: #F2F2F2
  --blaabg: #3D5BCD

  color: var(--broedtekst)
  font-family: 'Lato', sans-serif
*
  margin: 0
  padding: 0
  box-sizing: border-box

.sudoBody
  background: #fff
  min-height: 100vh


h1
  font-size: 32px !important

h2
  font-size: 24px !important

h1,h2,h3,h4,h5,h6
  color: var(--overskrift)

p
  color: var(--broedtekst)

.spaceBoth
  padding-left: 16px
  padding-right: 16px
.spaceLeft
  padding-left: 16px
.spaceRight
  padding-right: 16px


</style>