<template>
  <v-toolbar light app>
 

    <v-toolbar-title><img src="../assets/logo2.png" alt=""></v-toolbar-title>

    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
      <v-flex>
        <v-btn fab v-show="isLogin">
          <v-avatar>
            <img :src="user.avatar" alt="">
          </v-avatar>
        </v-btn>

        <v-tooltip bottom>
          <v-btn icon slot="activator" to="/register" v-show="!isLogin">
            <v-icon>assignment_ind</v-icon>
          </v-btn>
          <span>Sign up here!</span>
        </v-tooltip>

        <v-tooltip bottom>
          <v-btn icon slot="activator" to="/login" v-show="!isLogin">
            <v-icon>input</v-icon>
          </v-btn>    
          <span>Sign in here!</span>
        </v-tooltip>
      </v-flex>
  
      <v-btn v-show="isLogin" @click.prevent="logout">
        Sign out
      </v-btn>

  </v-toolbar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Navbar',
  data () {
    return {

    }
  },
  computed: mapState([
    'isLogin', 'user'
  ]),
  methods: {
    logout () {
      this.$store.dispatch('logoutAct')
      this.$router.replace('/')
    }
  }
}
</script>

<style>

</style>
