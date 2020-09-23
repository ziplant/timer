<template lang="pug">
  #app
    .timers
      .timers_wrapper
        Timer.timers_item(v-for="timer in getTimers" :key="timer.id" :timer="timer")
        Timer.timers_item

</template>

<script>
  import Timer from "./components/Timer";
  import { mapActions, mapGetters } from "vuex";

  export default {
    name: "App",
    components: {
      Timer,
    },
    computed: {
      ...mapGetters(["getTimers"]),
    },
    methods: {
      ...mapActions(["timersPlaceholder"]),
    },
    mounted() {
      this.timersPlaceholder();
    },
  };
</script>

<style lang="sass">
  @import assets/sass/_fontface
  @import assets/sass/_core

  body
    margin: 0
    font-family: $font
    background: $bgColor

  .timers
    padding: 50px 0
    &_wrapper
      margin: auto
      display: flex
      flex-wrap: wrap
      @include container(1)

      @media screen and (min-width: 768px)
        @include container(2)

      @media screen and (min-width: 1024px)
        @include container(3)

    &_item
      margin: $timerMargin
</style>
