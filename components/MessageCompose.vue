<template>
  <form ref="form" class="message-form" @submit.prevent="onSubmit">
    <div class="message-form__textarea-wrapper">
      <textarea tabindex="0" :style="dynamicTextAreaHeight" v-bind="attributes" class="message-form__textarea" :value="modelValue" @input="onInput($event)" @blur="onBlur($event)" @focus="onFocus($event)" @keydown="onKeyDown"></textarea>
      <div class="message-form__send">
        <button class="button submit-button">
          <span class="lable"> Send </span>
          <svg fill="#fff" class="icon-button__icon" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="24"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" /></svg>
        </button>
      </div>
    </div>
  </form>
</template>

<style lang="scss">
.message-form {
  margin: 0 16px 16px 16px;
  &__textarea-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    background: var(--md-sys-color-surface);
    border-radius: 12px;
  }
  &__textarea {
    margin: 0;
    width: 100%;
    padding: 16px;
    background: transparent;
    max-height: 200px;
    height: 56px;
    appearance: none;
    border-radius: 0;
    font-size: 16px;
    line-height: 1.5;
    overflow-y: hidden;
    -webkit-appearance: none;
    outline: none;
    resize: none;
    &:focus {
      outline: none;
    }
  }
  &__send {
    position: absolute;
    bottom: 8px;
    right: 8px;
    z-index: 3;
  }
}
</style>

<script setup lang="ts">
import { defineEmits, useAttrs, computed } from 'vue'
const attrs = useAttrs()

const props = defineProps({
  placeholder: {
    type: String,
    default: '',
  },
  name: { type: String, default: null },
  rows: { type: Number, default: 1 },
  disabled: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  modelValue: { type: [String, Number, Boolean, Array], default: '', required: true },
})

let textAreaEl = null
const dynamicTextAreaHeight = ref({
  maxHeight: '104px',
  height: '56px',
  overflowY: 'auto'
})

watch(
    () => props.modelValue,
    (newValue: string) => {
      if(newValue) {
        const style = window.getComputedStyle(textAreaEl);
        const boxSizing = style.boxSizing === 'border-box'
            ? parseInt(style.borderBottomWidth, 10) +
            parseInt(style.borderTopWidth, 10)
            : 0;
        dynamicTextAreaHeight.value.height = ''
        dynamicTextAreaHeight.value.height = (textAreaEl.scrollHeight + boxSizing) + 'px'
      } else {
        dynamicTextAreaHeight.value.height = ''
        dynamicTextAreaHeight.value.maxHeight=  '104px'
      }
    }
)

onMounted(() => {
  textAreaEl = document.querySelector('.message-form__textarea')
})

const attributes = computed(() => {
  return {
    ...attrs,
    name: name,
    rows: props.rows,
    disabled: props.disabled,
    placeholder: props.placeholder,
    required: props.required,
  }
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'submit'])

function onInput(e: any) {
  emit('update:modelValue', e.target.value)
}

function onBlur(e: any) {
  emit('blur', e)
}

function onFocus(e: any) {
  emit('focus', e)
}

function onSubmit(e) {
  emit('submit', e)
}

function onKeyDown(e) {
  // Get the code of pressed key
  const keyCode = e.which || e.keyCode

  // 13 represents the Enter key
  if (keyCode === 13 && !e.shiftKey) {
    // Don't generate a new line
    const formSubmitEl: HTMLInputElement | null | undefined = document?.querySelector('.submit-button')
    if (formSubmitEl) {
      formSubmitEl.click()
    }
    e.preventDefault()
  }
}
</script>
