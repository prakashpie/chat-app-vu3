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
        <template v-if="lastMessageStatus && lastMessageStatus !== 3">
          <span title="Failed" v-if="lastMessageStatus === 2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="#ff0000" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
          </span>
          <span title="Sending" v-else>
            <svg xmlns="http://www.w3.org/2000/svg" fill="#0000ff" height="24" viewBox="0 -960 960 960" width="24"><path d="M320-160h320v-120q0-66-47-113t-113-47q-66 0-113 47t-47 113v120Zm160-360q66 0 113-47t47-113v-120H320v120q0 66 47 113t113 47ZM160-80v-80h80v-120q0-61 28.5-114.5T348-480q-51-32-79.5-85.5T240-680v-120h-80v-80h640v80h-80v120q0 61-28.5 114.5T612-480q51 32 79.5 85.5T720-280v120h80v80H160Z"/></svg>
          </span>
        </template>
        <template v-else>
          <span title="Sent">
            <svg fill="#00ff00" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M268-240 42-466l57-56 170 170 56 56-57 56Zm226 0L268-466l56-57 170 170 368-368 56 57-424 424Zm0-226-57-56 198-198 57 56-198 198Z"/></svg>
          </span>
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
    white-space: pre-line;

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
const props = defineProps({
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
  const regex = /\\n|\\r\\n|\\n\\r|\\r/g
  return string.replace(regex, '<br>')
}

const lastMessageStatus = computed(() => {
  const msgArr = props.messages
  return msgArr[msgArr.length - 1].status
})
</script>
