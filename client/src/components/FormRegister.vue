<template>
  <v-container>
      <v-layout row>
        <v-flex xs12 sm12 md12 lg12>  
          <v-card height="100%" dark>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Register</h3>
                <div></div>
                </div>
            </v-card-title>
            <v-container light>
                <v-form>
                    <v-text-field
                    v-model="name"
                    :counter="20"
                    label="Name"
                    required
                    ></v-text-field>

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
                    <input type="file" @change="uploadAvatar">

        
                    <v-btn 
                    @click.prevent="register"
                    v-on:click.prevent="loader = 'loading'"
                    :loading="loading"
                    :disabled="loading"
                    light
                    >
                    Register
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
  name: 'FormRegister',
  data () {
    return {
      checkbox: false,
      name: '',
      email: '',
      password: '',
      avatar: '',
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
        setTimeout(() => (this[l] = false), 2000)
        this.loader = null
      }
  },
  methods: {
    register () {
      this.$store.dispatch('registerAct', {...this})
      this.name = ''
      this.email = ''
      this.password = ''
      this.avatar = ''
    },
    uploadAvatar (img) {
      this.avatar = img.target.files[0]
    }
  }
}
</script>

<style>

</style>
