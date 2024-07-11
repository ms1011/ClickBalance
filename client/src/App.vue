<template>
  <div class="app">
    <div class="overlay">
      <h1>ClickBalance</h1>
    </div>
    <div class="container" @contextmenu.prevent>
      <SideComponent
          side="A"
          :count="counts.A"
          :ratio="ratioA"
          @increment="incrementCount('A')"
          @decrement="decrementCount('A')"
      />
      <SideComponent
          side="B"
          :count="counts.B"
          :ratio="ratioB"
          @increment="incrementCount('B')"
          @decrement="decrementCount('B')"
      />
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted, onUnmounted} from 'vue'
import {io} from 'socket.io-client'
import SideComponent from './components/SideComponent.vue'

const socket = io('http://localhost:3000')

const counts = ref({ A: 0, B: 0})

// const countA = ref(0)
// const countB = ref(0)

// const total = computed(() => countA.value + countB.value)
const total = computed(() => counts.value.A + counts.value.B)
const ratioA = computed(() => total.value === 0 ? 0.5 : counts.value.A / total.value)
const ratioB = computed(() => total.value === 0 ? 0.5 : counts.value.B / total.value)

onMounted(() => {
  socket.on('counts', (newCounts) => {
    counts.value = newCounts
  })
})

onUnmounted(() => {
  socket.off('counts')
  socket.disconnect()
})

const incrementCount = (side) => {
  socket.emit('increment', side)
}
const decrementCount = (side) => {
  socket.emit('decrement', side)
}

// Offline 용 코드
/*const incrementCount = (side) => {
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
}*/
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