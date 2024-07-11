<template>
  <div class="app">
    <div class="overlay">
      <h1>ClickBalance</h1>
    </div>
    <div class="container" @contextmenu.prevent>
      <SideComponent
          side="A"
          :count="countA"
          :ratio="ratioA"
          @increment="incrementCount('A')"
          @decrement="decrementCount('A')"
      />
      <SideComponent
          side="B"
          :count="countB"
          :ratio="ratioB"
          @increment="incrementCount('B')"
          @decrement="decrementCount('B')"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SideComponent from './components/SideComponent.vue'

const countA = ref(0)
const countB = ref(0)

const total = computed(() => countA.value + countB.value)
// const ratioA = computed(() => countA.value / total.value || 0.5)
// const ratioB = computed(() => countB.value / total.value || 0.5)
const ratioA = computed(() => total.value === 0 ? 0.5 : countA.value / total.value)
const ratioB = computed(() => total.value === 0 ? 0.5 : countB.value / total.value)

const incrementCount = (side) => {
  console.log("좌클릭", side)
  if (side === 'A') {
    countA.value++
  } else {
    countB.value++
  }
}
const decrementCount = (side) => {
  console.log("우클릭", side)
  if (side === 'A' && countA.value > 0) {
    countA.value--
  } else if (side === 'B' && countB.value > 0) {
    countB.value--
  }
}
</script>

<style>
.app {
  font-family: Arial, sans-serif;
  text-align: center;
}
.container {
  display: flex;
  height: 100vh;
}
.overlay {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 2;
}
</style>