<template>
  <div class="tweetMsg">
    <p>
      {{ tweet.text }}
    </p>
    <div class="tweetDate">
      <i class="fas fa-calendar-alt fa-sm fa-fw"></i>{{ tweet.date }}
    </div>
    <div class="tweet_remove" @click="$emit('remove-tweet', 'index')">
      <span class="remove">Delete this tweet <i class="fas fa-trash fa-xs fa-fw"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tweet-message',
  props: {
    'tweet': Object
  }
}
</script>

<style scoped>

</style>
