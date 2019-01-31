<template>
   <v-container>
    <h4>Edit Your Question Below</h4>
      <v-form>
      <v-text-field
      v-model="title"
      label="Title"
      required
      ></v-text-field>
      <v-divider></v-divider>
      <wysiwyg v-model="description" style="background-color: grey;"></wysiwyg>
        <v-btn 
        @click.prevent="editQuestion"
        v-on:click.prevent="loader = 'loading'"
        :loading="loading"
        :disabled="loading"
        light>
          edit
        </v-btn>
      </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'EditQuestion',
  data () {
    return {
      title: '',
      description: '',
      snackbar: false,
      timeout: 10000,
      message: '',
      loader: null,
      loading: false,
      color: '',
      icon: '',
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
    editQuestion() {
      this.$axios({
        method: `PATCH`,
        url: `/questions/${this.$route.params.id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          title: this.title,
          description: this.description
        }
      })
      .then(({ data }) => {
        this.$emit('get-questions')
        this.snackbar = true
        this.message = `Successfully edited this question with title ${data.title}`
        this.color = 'green'
        this.icon = 'check_circle'
        this.$store.dispatch('editResponseAct', {...this})
      })
      .catch(err => {
        this.snackbar = true
        this.message = err.response.data
        this.color = 'red'
        this.icon = 'error'
        this.$store.dispatch('editResponseAct', {...this})
      })
    }
  }
}
</script>

<style>

</style>
