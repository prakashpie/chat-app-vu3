<template>
  <div role="progressbar" class="circular-progress" :aria-valuemax="mode !== 'indeterminate' ? 100 : false" :aria-valuemin="mode !== 'indeterminate' ? 0 : false" :aria-valuenow="mode !== 'indeterminate' ? progress : false" :style="rootStyle" :class="[themeClass, progressMode, rootClasses]">
    <svg class="circular-progress__bar" :width="size + 'px'" :height="size + 'px'" viewBox="22 22 44 44" xmlns="http://www.w3.org/2000/svg">
      <circle class="circular-progress__path" :style="pathStyle" fill="none" :stroke-width="strokeWidth" stroke-linecap="round" cx="44" cy="44" r="20"></circle>
    </svg>
  </div>
</template>

<script lang="ts" setup>
const { mode, theme, show, progress, size } = defineProps({
  mode: {
    type: String,
    default: 'indeterminate',
    validator: (value: string) => {
      return ['indeterminate', 'determinate', 'buffer'].includes(value)
    },
  },
  theme: {
    type: String,
    default: null,
  },
  show: {
    type: Boolean,
    default: true,
  },
  autoFinish: {
    type: Boolean,
    default: true,
  },
  progress: {
    type: Number,
    default: 0,
  },
  size: {
    type: Number,
    default: 48,
  },
})

const strokeWidth = ref(4)

const rootClasses = computed(() => {
  return [
    {
      'circular-progress--closed': !show,
    },
  ]
})

const themeClass = computed(() => {
  return theme ? `circular-progress--${theme}` : ''
})

const progressMode = computed(() => {
  return `circular-progress--${mode}`
})

const rootStyle = computed(() => {
  return {
    transform: mode === 'determinate' ? `rotate(-90deg)` : false,
    width: `${size}px`,
    height: `${size}px`,
  }
})

const strokeDashoffset = computed(() => {
  if (mode === 'determinate') {
    return progress ? circumference - (progress / 100) * circumference : 0
  } else if (mode === 'indeterminate') {
    return circumference
  }
  return false
})

const pathStyle = computed(() => {
  return {
    strokeDasharray: mode === 'indeterminate' ? false : circumference.value,
    strokeDashoffset: strokeDashoffset.value,
  }
})

const radius = computed(() => {
  return (44 - strokeWidth.value) / 2
})

const circumference = computed(() => {
  return 2 * Math.PI * radius
})
</script>
