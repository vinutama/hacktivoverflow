<template>
  <v-container>
      <v-layout row>
        <v-flex xs12 sm12 md12 lg12>  
          <v-card height="100%" dark>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Login</h3>
                <div></div>
                </div>
            </v-card-title>
            <v-container light>
                <v-form>
                    <v-text-field
                    v-model="email"
                    label="E-mail"
                    required
                    ></v-text-field>

                    <v-text-field
                    v-model="password"
                    label="Password"
                    type="password"
                    >
                    </v-text-field>
  
                    <v-btn 
                    @click.prevent="login"
                    v-on:click.prevent="loader = 'loading'"
                    :loading="loading"
                    :disabled="loading"
                    light
                    >
                    Sign In
                    </v-btn>
                    </v-form>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'LoginForm',
  data () {
    return {
      email: '',
      password: '',
      snackbar: false,
      timeout: 10000,
      message: '',
      loader: null,
      loading: false,
      color: '',
      icon: ''
    }
  },
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]
      setTimeout(() => (this[l] = false), 4000)
      this.loader = null
    }
  },
  methods: {
    login () {
      this.$store.dispatch('loginAct', {...this})
      this.email = ''
      this.password = ''
      this.$router.replace('/')
    },
  }
}
</script>

<style>

</style>
