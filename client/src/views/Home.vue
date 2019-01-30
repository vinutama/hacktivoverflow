<template>
  <div class="home">
      <v-layout row>
        <v-flex xs12 sm12 md12 lg12>
          <navbar></navbar>
        </v-flex>
      </v-layout>
      <v-spacer></v-spacer>
      <v-layout row>
        <sidenav v-if="isLogin"></sidenav>
        <v-container>

        <router-view></router-view>
        </v-container>
      </v-layout>

      <v-snackbar
      v-model="validation.snackbar"
      :timeout="timeout"
      :top="y"
      :color="validation.color"
      >
      <v-icon>
      {{validation.icon}}
      </v-icon>
      {{ validation.message }}
      <v-btn
          color="white"
          flat
          @click="validation.snackbar = false"
      >
          Close
      </v-btn>
    </v-snackbar>

  </div>
</template>

<script>
// @ is an alias to /src
import navbar from '@/components/Navbar.vue'
import sidenav from '@/components/Sidenav.vue'
import questionlist from '@/components/QuestionList.vue'
import { mapState } from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      y: 'top',
      timeout: 4000
    }
  },
  components: {
    navbar,
    sidenav,
    questionlist
  },
  created () {
    this.getTags()
    this.getQuestions()
  },
  mounted () {
    this.getTags()
    this.getQuestions()
    if (localStorage.getItem('token')) {
      this.checkUserLogin()
    }
  },
  computed: mapState([
    'validation', 'user', 'isLogin', 'questions'
  ]),
  methods: {
    checkUserLogin () {
      this.$store.dispatch('checkUser')
    },
    getTags () {
      this.$store.dispatch('getTagsAct')
    },
    getQuestions () {
      this.$store.dispatch('getQuestionAct')
    }
  }
}
</script>
