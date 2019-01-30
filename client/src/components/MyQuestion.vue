<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm12 md12 lg12>
        <v-card height="50rem" dark>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">
                Your Questions List
              </h3>
            </div>
          </v-card-title>
          <v-card-text>
            <v-card light v-for="(question, i) in questions" :key="i">
              <v-card-text>
                Title: {{question.title}} 
                <v-spacer></v-spacer>
                Description: {{question.description}}
                <v-spacer></v-spacer>
                Last Edited: {{convertDate(question.updatedAt)}}
              </v-card-text>
              <v-card-actions>
                <v-btn 
                @click.prevent="editQuestion(question._id)"
                v-on:click.prevent="loader = 'loading'"
                :loading="loading"
                :disabled="loading"
                light>
                  edit
                </v-btn>
                 <v-btn color="red" @click.prevent="deleteQuestion(question._id)">
                  delete
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-card-text>
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
              </v-form>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment,{ locales } from 'moment'
export default {
  name: 'MyQuestionList',
  data () {
    return {
      questions: [],
      snackbar: false,
      timeout: 10000,
      message: '',
      loader: null,
      loading: false,
      color: '',
      icon: '',
      title: '',
      description: ''
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
  mounted () {
    this.getMyQuestions()
  },
  methods: {
    getMyQuestions () {
      this.$axios({
        method: `GET`,
        url: `/questions/own/list`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        this.questions = data
      })
      .catch(err => {
        console.log(err)
      })
    },
    deleteQuestion (id) {
      this.$axios({
        method: `DELETE`,
        url: `/questions/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(() => {
        this.getMyQuestions()
        this.getQuestions()
        this.$store.dispatch('deleteResponseAct', {...this})
      })
      .catch(err => {

      })
    },
    convertDate(input) {
      return moment(input).format('DD MMMM, YYYY hh:mm A')
    },
    getQuestions () {
      this.$store.dispatch('getQuestionAct')
    },
    editQuestion(id) {
      this.$axios({
        method: `PATCH`,
        url: `/questions/${id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          title: this.title,
          description: this.description
        }
      })
      .then(({ data }) => {
        console.log(data)
        this.getMyQuestions()
        this.getQuestions()
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
