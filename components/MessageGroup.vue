<template>
  <div class="message-group" :class="{ 'message-group--reverse': isReverse }">
    <div class="message-avatar">
      <app-avatar :img-src="messages[messages.length - 1].from.thumbnail"></app-avatar>
    </div>
    <div class="message-group__body">
      <div class="message-group__content-wrapper">
        <p v-for="item in messages" :key="item.date" class="message-group__content elevation-1" v-html="parseNewLineToBr(item.message)"></p>
      </div>
      <div v-if="isReverse" class="message-group__icon-indicator text-right">
        <template v-if="messages[messages.length - 1].status && messages[messages.length - 1].status !== 3">
          Sending
        </template>
        <template v-else>
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" class="text-success" width="1em" height="1em" viewBox="0 0 24 24" style="font-size: 18px; height: 18px; width: 18px"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m7 12l5 5L22 7M2 12l5 5m5-5l5-5"></path></svg>
        </template>
        <span class="text-disabled">{{ getDate(messages[messages.length - 1].date) }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.message-group {
  display: flex;
  align-items: flex-end;
  margin-bottom: 16px;

  .message-avatar {
    margin-right: 12px;
  }

  &__content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &__content {
    padding: 8px 16px 8px 16px;
    margin-bottom: 12px;
    border-radius: 8px;
    background: var(--md-sys-color-surface);
    color: var(--md-sys-color-on-surface);
    text-align: left;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__body {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    align-items: flex-end;
    max-width: 60%;
  }

  &__icon-indicator {
    position: absolute;
    bottom: -24px;
    right: 4px;
  }

  &--reverse {
    flex-direction: row-reverse;
    margin-bottom: 20px;
    .message-group__content {
      border-radius: 8px;
      background: var(--md-sys-color-primary);
      color: var(--md-sys-color-on-primary);
      line-height: 1.5;
    }
    .message-avatar {
      margin-left: 12px;
    }
    .message-group__content-wrapper {
      align-items: flex-end;
    }
  }
}
</style>

<script setup lang="ts">
const { isReverse } = defineProps({
  isReverse: {
    type: Boolean,
    default: false,
  },
  messages: {
    type: Array,
    default: () => [],
  },
})

function getDate(d) {
  const date = new Date(d)
  let hours = date.getHours()
  let minutes: string | number = date.getMinutes()
  let ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours ? hours : 12 // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes
  return hours + ':' + minutes + ' ' + ampm
}

function parseNewLineToBr(string) {
  const regex = /\\n|\\r\\n|\\n\\r|\\r/g;
  return string.replace(regex, '<br>');
}

</script>
