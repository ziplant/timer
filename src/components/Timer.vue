<template lang="pug">
  .timer(v-if="timer" :class="{'timer--active': timer.active}")
    .timer_time {{getFormattedTime(timer)}}
    .timer_controls
      button.timer_control.timer_control--pause(v-if="timer.active" @click="stopTimer(timer.id)")
      button.timer_control.timer_control--start(v-else @click="startTimer(timer.id)")
      button.timer_control.timer_control--clear(@click="clearTimer(timer.id)")
  .timer(v-else)
    .timer_controls 
      .timer_control.timer_control--add(@click="addTimer()")

</template>

<script>
  import { mapGetters, mapMutations } from "vuex";

  export default {
    props: {
      timer: {
        type: Object,
      },
    },
    methods: {
      ...mapMutations(["startTimer", "stopTimer", "addTimer", "clearTimer"]),
    },
    computed: {
      ...mapGetters(["getFormattedTime"]),
    },
  };
</script>

<style lang="sass">
  @import ../assets/sass/_core

  .timer
    display: flex
    flex-direction: column
    text-align: center
    font-size: $timerFontSize
    width: $timerWidth
    height: $timerHeight
    background-color: $timerBgColor
    color: $timerColor
    &_time
      border-bottom: 1px solid $timerColor
      flex: 1
      line-height: $timerHeight / 2
    &_controls
      flex: 1
      display: flex
      justify-content: center
      align-items: center
    &_control
      background: transparent
      border: none
      width: $iconSize
      height: $iconSize
      padding: 0
      margin: auto 25px
      cursor: pointer
      position: relative
      outline: none
      &--start::before
        content: ''
        position: absolute
        top: 0
        left: 0
        border-top: $iconSize / 2 solid transparent
        border-bottom: $iconSize / 2 solid transparent
        border-left: $iconSize * 0.85 solid $timerColor
      &--clear::before
        content: ''
        position: absolute
        top: 0
        left: 0
        border: $iconSize / 2 solid $timerColor
      &--pause
        &::before
          content: ''
          position: absolute
          top: 0
          left: 50%
          width: $iconSize * 0.15
          height: $iconSize
          background-color: $timerColor
          transform: translateX(50%)
        &::after
          content: ''
          position: absolute
          top: 0
          right: 50%
          width: $iconSize * 0.15
          height: $iconSize
          background-color: $timerColor
          transform: translateX(-50%)
      &--add
        width: 100%
        height: 100%
        margin: 0
        &::before
          content: ''
          position: absolute
          width: $iconSize * 0.15
          height: $iconSize
          background-color: $timerColor
          top: 50%
          left: 50%
          transform: translate(-50%, -50%)
        &::after
          content: ''
          position: absolute
          top: 50%
          left: 50%
          width: $iconSize
          height: $iconSize * 0.15
          background-color: $timerColor
          transform: translate(-50%, -50%)
        &:hover
          &::before,
          &::after
            background-color: $activeColor
    &--active
      color: $activeColor
      .timer
        &_time
          border-bottom-color: $activeColor
        &_control
          &--clear::before
            border-color: $activeColor
          &--start::before
            border-left-color: $activeColor
          &--pause::before,
          &--pause::after
            background: $activeColor
</style>
