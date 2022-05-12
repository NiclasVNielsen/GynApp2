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
</template>

<script>

export default({
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

</style>
