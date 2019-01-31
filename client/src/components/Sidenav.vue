<template>
  <v-flex>
    <v-navigation-drawer permanent app>
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title" v-if="isLogin">
              {{user.name}}
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-divider></v-divider>

      <v-list dense class="pt-0">
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-btn to="/" small block flat @click.prevent="getHome">
            <v-list-tile-title>Home</v-list-tile-title>
            </v-btn>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-action>
            <v-icon>how_to_vote</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-btn to="/askquestion" small flat block>
            <v-list-tile-title>Ask Question</v-list-tile-title>
            </v-btn>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-action>
            <v-icon>question_answer</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-btn to="/question/mine" small flat block>
            <v-list-tile-title>My Questions</v-list-tile-title>
            </v-btn>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>

          <v-list-tile-action>
            <v-icon>assessment</v-icon>
          </v-list-tile-action>

          <div class="text-xs-center">
            <v-dialog
              v-model="dialog"
              width="500"
            >
              <v-btn
                slot="activator"
                flat
              >
              <v-list-tile-title>My Activity</v-list-tile-title>
              </v-btn>

              <v-card>
                <v-card-title
                  class="headline grey lighten-2"
                  primary-title
                >
                  Your Questions Activity on Last {{diffQuestion}} days
                </v-card-title>

                <v-card-text>
                  Total Questions: {{myQuestions.length}}
                </v-card-text>

                <v-divider></v-divider>
                 <v-card-title
                  class="headline grey lighten-2"
                  primary-title
                >
                  Your Answers Activity on Last {{diffAnswer}} days
                </v-card-title>

                <v-card-text>
                  Total Answers: {{myAnswers.length}}
                </v-card-text>

              </v-card>
            </v-dialog>
          </div>

        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <v-card>
        <v-card-title>
          <v-icon>remove_red_eye</v-icon> 
          Watched Tags
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
         <v-flex xs12 sm12 md12 lg12>
          <div class="text-xs-center">
            <v-chip @click.prevent="findQuestionTagged(mytag)" label color="pink" text-color="white" v-for="(mytag, i) in myTags" :key="i">
              <v-icon left>label</v-icon>{{mytag}}
            </v-chip>
          </div>
          <v-layout row>
            <v-container id="dropdown-example" grid-list-xl>
              <v-layout row wrap>
                <v-flex xs12 sm12 md12 lg12>
                  <p>Add Watch Tag</p>

                  <v-overflow-btn
                    :items="tagsList"
                    label="Select Tag"
                    target="#dropdown-example"
                    v-model="chips"
                  >
                  </v-overflow-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-layout>  
         </v-flex>
        </v-card-text>
      </v-card>
          <v-btn small @click.prevent="addWatchTag">
          Add
        </v-btn>
    </v-navigation-drawer>
  </v-flex>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'sidenav',
  data () {
    return {
      chips: [],
      sheet: false,
      dialog: false
    }
  },
  props: ['myQuestion'],
  computed: mapState([
    'user', 'isLogin', 'tagsList', 'myTags', 'questions', 'myAnswers', 'diffAnswer', 'myQuestions', 'diffQuestion'
  ]),
  mounted () {
     this.$store.dispatch('getTagsAct')
     this.$store.dispatch('checkUser')
     this.myAnswer()
  },
  methods: {
    addWatchTag () {
      this.$axios({
        method: `POST`,
        headers: {
          token: localStorage.getItem('token')
        },
        url: `/users/watched/tags`,
        data: {
          tags: this.chips
        }
      })
      .then(({ data }) => {
        this.myTags.push(data.name)
        this.$store.dispatch('checkUser')
      })
      .catch(err => {
        console.log(err)
      })
    },
    findQuestionTagged (name) {
      console.log('masuk')
      this.$store.dispatch('taggedQuestionAct', name)
    },
    getHome () {
      this.$store.dispatch('getQuestionAct')
    },
    myAnswer () {
      this.$store.dispatch('myAnswerAct')
    }
  }
}
</script>

<style>

</style>
