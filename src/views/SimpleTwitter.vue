<template>
  <div class="root_view">
<!--    Register an account-->
    <div class="card">
      <i class="fab fa-twitter fa-lg fa-fw"></i>
      <div class="register" v-if="!registered">
        <button form="register" type="submit">Register</button>
        <h2>Create Your Account</h2>
        <form id="register" @submit.prevent="registerAccount">
          <div class="form_group">
            <label for="name">
              Name <span>{{ name.length + '/' + max_length }}</span>
            </label>
            <input type="text" v-model="name" id="name" name="name" :maxlength="max_length" required>
          </div>
          <div class="form_group">
            <label for="email">
              Email <span>{{ email.length + '/' + max_length }}</span>
            </label>
            <input type="email" v-model="email" id="email" name="email" maxlength="25" required>
          </div>
          <div class="form_group">
            <label for="password">
              Password <span>{{ password.length + '/' + max_pass_length }}</span>
            </label>
            <input type="password" v-model="password" id="password" name="password" maxlength="16" required>
          </div>
        </form>
        <div v-if="error.length > 0"> {{ error }} </div>
      </div>
      <!--    Add a tweet-->
      <div class="tweetBox" v-else>
        <h2>Welcome {{ userData.name }} write your first tweet</h2>
        <form @submit.prevent="sendTweet">
          <div class="form_group">
            <label for="tweet">
              Send your tweet
              <span>{{ tweetMsg.length + '/' + max_tweet }}</span>
            </label>
            <textarea name="tweet" id="tweet" cols="30" rows="10" v-model="tweetMsg" maxlength="200">
            </textarea>
          </div>
          <button type="submit">Tweet</button>
        </form>
      </div>
    </div>
<!--    Show all tweets-->
    <div class="card_tweets">
      <section class="tweets" v-if="tweets.length > 0">
        <h2>Tweets</h2>
        <tweet-message
          v-for="(tweet, index) in tweets"
          :tweet="tweet"
          :key="index"
          @remove-tweet="removeTweet(index)">
        </tweet-message>
      </section>
      <div v-else>No tweets to show</div>
    </div>
  </div>
</template>

<script>
import TweetMessage from '../components/TweetMessage'
export default {
  name: 'SimpleTwitter',
  components: {TweetMessage},
  data () {
    return {
      userData: {},
      userID: 0,
      name: '',
      email: '',
      password: '',
      max_length: 25,
      max_pass_length: 16,
      max_tweet: 200,
      error: '',
      registered: false,
      tweetMsg: '',
      tweets: []
    }
  },
  methods: {
    registerAccount () {
      // record user details
      if (this.name !== '' && this.email !== '' && this.password !== '') {
        this.userData.id = ++this.userID
        this.userData.name = this.name
        this.userData.email = this.email
        this.userData.password = this.password
        this.registered = true
      } else {
        this.error = 'Complete all the form fields'
      }

      // add registration to localstorage
      localStorage.setItem('simple_tweet_registered', 'true')
      localStorage.setItem('simple_tweet_registered_user', JSON.stringify(this.userData))

      // clear the registration fields
      this.name = ''
      this.email = ''
      this.password = ''
    },
    sendTweet () {
      this.tweets.unshift({
        text: this.tweetMsg,
        date: new Date().toLocaleTimeString()
      })

      this.tweetMsg = ''

      let stringTweets = JSON.stringify(this.tweets)
      localStorage.setItem('simple_tweet_tweets', stringTweets)
    },
    removeTweet (index) {
      let removeIt = confirm('Are you sure you want to remove this tweet?')
      if (removeIt) {
        this.tweets.splice(index, 1)
        localStorage.simple_tweet_tweets = JSON.stringify(this.tweets)
      }
    }
  },
  created () {
    if (localStorage.getItem('simple_tweet_registered') === 'true') {
      this.registered = true
    }

    if (localStorage.getItem('simple_tweet_registered_user')) {
      this.userData = JSON.parse(localStorage.getItem('simple_tweet_registered_user'))
    }

    if (localStorage.getItem('simple_tweet_tweets')) {
      this.tweets = JSON.parse(localStorage.getItem('simple_tweet_tweets'))
    }
  }
}
</script>

<style scoped>

</style>
