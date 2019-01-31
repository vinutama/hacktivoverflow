<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm12 md12 lg12>
        <v-card height="100%" dark>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">
                Your Questions List
              </h3>
            </div>
          </v-card-title>
          <v-card-text>
            <v-card light v-for="(question, i) in myQuestions" :key="i">
              <v-card-text>
                Title: {{question.title}} 
                <v-spacer></v-spacer>
                Description: {{question.description}}
                <v-spacer></v-spacer>
                Last Edited: {{convertDate(question.updatedAt)}}
              </v-card-text>
              <v-card-actions>
                 <v-btn color="grey" :to="'/question/mine/'+question._id">
                  edit
                 </v-btn>
                 <v-btn color="red" @click.prevent="deleteQuestion(question._id)">
                  delete
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-card-text>
         <router-view @get-questions="getMyQuestions"></router-view>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment,{ locales } from 'moment'
import { mapState } from 'vuex'
export default {
  name: 'MyQuestionList',
  data () {
    return {
     
    }
  },
  computed: mapState([
    'myQuestions'
  ]),
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
      this.$store.dispatch('getMineQuestion')
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
    
  }
}
</script>

<style>

</style>
