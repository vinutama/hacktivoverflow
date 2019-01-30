<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm12 md12 lg12>
        <v-card height="100%" color="grey" dark>
          <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">
                  <v-avatar>
                  <img :src="question.owner.avatar" alt="">
                  </v-avatar>
                  {{question.title}}
                </h3>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-layout row>
              <v-flex xs12 sm12 md2 lg2>
                <v-flex xs12 sm12 md12 lg12>
                    <v-btn small fab @click.prevent="upVoteQuestion(question._id)">
                      <v-icon>thumb_up</v-icon>
                    </v-btn>
                    <v-btn small flat>
                      {{question.point}}
                    </v-btn>
                    <v-btn small fab @click.prevent="downVoteQuestion(question._id)">
                      <v-icon>thumb_down</v-icon>
                    </v-btn>
                </v-flex>
              </v-flex>
              <v-flex xs12 sm12 md10 lg10>
               <v-card>
                 <v-card-text>
                   {{question.description}}
                 </v-card-text>
               </v-card>
               <v-divider></v-divider>
               <div>
                <h3 class="headline mb-0">
                  Answers
                </h3>
              </div>
              <v-divider></v-divider>
               <v-card v-for="(answer, i) in answers" :key="i">
                 <v-layout row wrap>
                 <v-flex xs12 sm6 md2 lg2>
                  <v-btn small fab @click.prevent="upVoteAnswer(answer._id)">
                    <v-icon>thumb_up</v-icon>  
                  </v-btn>
                  <v-btn small flat>{{answer.point}}</v-btn>
                  <v-btn small fab @click.prevent="downVoteAnswer(answer._id)">
                    <v-icon>thumb_down</v-icon>
                  </v-btn>
                 </v-flex>
                 <v-flex xs12 sm12 md2 lg2>
                    <v-avatar>
                       <img :src="answer.owner.avatar" alt="">
                    </v-avatar>
                    <span class="text--primary">{{answer.owner.name}}</span>
                 </v-flex>
                 <v-flex xs12 sm12 md8 lg8>
                 <v-card-text>
                   <v-card>
                     
                     <v-card-text v-html="answer.content">
                       
                     </v-card-text>
                     <v-card-text>
                      Last edited: {{convertDate(answer.updatedAt)}}
                     </v-card-text>
                     <v-card-actions v-show=" user && user._id === answer.owner._id">
                       <v-btn fab small @click.prevent="editAnswer(answer._id)">
                         <v-icon>
                           edit
                         </v-icon>
                       </v-btn>
                     </v-card-actions>
                   </v-card>
                 </v-card-text>
                 </v-flex>
                 </v-layout>
               </v-card>
               <v-divider></v-divider>
               <v-card>
                 <v-card-text>
                   <wysiwyg v-model="content"></wysiwyg>
                   <v-btn @click.prevent="answerQuestion(question._id)">
                     Answer
                   </v-btn>
                 </v-card-text>
               </v-card>
              </v-flex>

            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
export default {
  name: 'QuestionDetail',
  data () {
    return {
      snackbar: false,
      timeout: 10000,
      message: '',
      loader: null,
      loading: false,
      color: '',
      icon: '',
      content: '',
      answers: []
    }
  },
  created () {
    this.getDetails(this.$route.params.questionId)
    this.getAnswers(this.$route.params.questionId)
  },
  computed: mapState([
    'question', 'user'
  ]),
  mounted () {
    this.getDetails(this.$route.params.questionId)
    this.getAnswers(this.$route.params.questionId)
  },
  methods: {
    getDetails (id) {
      this.$store.dispatch('getDetailsAct', id)
    },
    upVoteQuestion (id) {
      this.$store.dispatch('upQuestAct', {
        id: id,
        snackbar: this.snackbar,
        message: this.message,
        color: this.color,
        icon: this.icon,
        timeout: this.timeout
      })
    },
    downVoteQuestion (id) {
      this.$store.dispatch('downQuestAct', {
        id: id,
        snackbar: this.snackbar,
        message: this.message,
        color: this.color,
        icon: this.icon,
        timeout: this.timeout
      })
    },
    answerQuestion (id) {
      this.$axios({
        method: `POST`,
        url: `/answers/${id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          content: this.content
        }
      })
      .then(({ data }) => {
        this.answers.push(data)
        this.getAnswers(id)
        this.$store.dispatch('answerQuestAct', {
        snackbar: this.snackbar,
        message: this.message,
        color: this.color,
        icon: this.icon,
        timeout: this.timeout,
        content: this.content
        })
         this.content = ''
      })
      .catch(err => {
        console.log(err)
      })
    },
    getAnswers (id) {
      this.$axios({
        method: `GET`,
        url: `/answers/${id}`
      })
      .then(({ data }) => {
        this.answers = data
      }) 
      .catch(err => {
        console.log(err)
      })
     
    },
    upVoteAnswer (id) {
      this.$axios({
        method: `POST`,
        url: `/answers/${id}/upvotes`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        this.getAnswers(this.$route.params.questionId)
        this.$store.dispatch('upAnswerAct', {
        snackbar: this.snackbar,
        message: this.message,
        color: this.color,
        icon: this.icon,
        timeout: this.timeout
        })
      })
      .catch(err => {
        console.log(err)
      })
    },
    downVoteAnswer (id) {
      this.$axios({
        method: `POST`,
        url: `/answers/${id}/downvotes`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        this.getAnswers(this.$route.params.questionId)
        this.$store.dispatch('downAnswerAct', {
        snackbar: this.snackbar,
        message: this.message,
        color: this.color,
        icon: this.icon,
        timeout: this.timeout
        })
      })
      .catch(err => {
        console.log(err)
      })
    },
    editAnswer (id) {
      this.$axios({
        method: `PATCH`,
        url: `/answers/${id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          content: this.content
        }
      })
      .then(({ data }) => {
        this.getAnswers(this.$route.params.questionId)
      })
      .catch(err => {
        console.log(err)
      })
    },
    convertDate(input) {
      return moment(input).format('DD MMMM, YYYY hh:mm A')
    }
  }
}
</script>

<style>

</style>
