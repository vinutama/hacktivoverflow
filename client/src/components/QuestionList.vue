<template>
<v-container>
  <v-layout>
  <v-flex xs12 sm12 md12 lg12>
      <v-card color="grey">
        <v-list three-line>
            <v-subheader>
              Top Questions
            </v-subheader>
            <v-divider></v-divider>

            <v-list-tile v-for="(question, i) in questions" :key="i">
              <v-list-tile-avatar>
                <img :src="question.owner.avatar">
              </v-list-tile-avatar>
      
              <v-list-tile-content>
                <v-list-tile-title>{{question.title}}</v-list-tile-title>
                <v-list-tile-sub-title><span class="text--primary">{{question.owner.name}}</span> &mdash; <router-link :to="'/'+question._id" v-html="question.description"></router-link></v-list-tile-sub-title>
                <v-list-tile-sub-title>Last edited: {{convertDate(question.updatedAt)}}</v-list-tile-sub-title>
                <v-list-tile-sub-title>
                  <v-chip label color="pink" text-color="white" v-for="(tag, i) in question.tags" :key="i">
                    <v-icon left>label</v-icon>{{tag.name}}
                  </v-chip>
                </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-spacer></v-spacer> 
              <v-list-tile-action>
                <v-btn ripple small fab>
                  <v-icon>thumb_up</v-icon>
                  {{question.point}}
                </v-btn>
                Total Votes
              </v-list-tile-action>
            </v-list-tile>  
        </v-list>
          <v-divider></v-divider>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
export default {
  name: 'QuestionList',
  data () {
    return {
     
    }
   },
  computed: mapState([
    'questions'
  ]),
  methods: {
    convertDate (input) {
      return moment(input).format('DD MMMM, YYYY hh:mm A')
    }
  }
}
</script>

<style>

</style>
