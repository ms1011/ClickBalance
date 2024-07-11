<template>
  <div :id="side"
       class="side"
       @click.left="$emit('increment')"
       @click.right="$emit('decrement')"
       @dblclick.prevent
       :style="{ flex: ratio }">
    <h2>{{ side }} 진영</h2>
    <div class="count">
      {{ count }}
      <br>
      ({{ formattedBalance }})
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue'

const props = defineProps({
  side: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true
  },
  ratio: {
    type: Number,
    required: true
  }
})

const formattedBalance = computed(() => {
  if (props.count === 0) {
    return '0%'
  }
  const percentage = props.ratio * 100
  return `${percentage.toFixed(1)}%`
})

defineEmits(['increment', 'decrement'])
</script>

<style scoped>
.side {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: flex 0.3s ease;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
#A {
  background-color: pink;
}
#B {
  background-color: lightblue;
}
.count {
  font-size: 24px;
  margin-top: 20px;
}
</style>