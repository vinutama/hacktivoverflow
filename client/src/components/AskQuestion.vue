<template>
   <v-container>
      <v-layout row>
        <v-flex xs12 sm12 md12 lg12>  
          <v-card height="100%" color="grey" dark>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Ask Question</h3>
                <div></div>
                </div>
            </v-card-title>
            <v-container>
                <v-form>
                    <v-text-field
                    v-model="title"
                    label="Title"
                    required
                    ></v-text-field>
                    <v-divider></v-divider>
                    Select Tags
                    <v-card dark>
                      <v-card-text>
                    <v-container fluid>
                      <v-layout row wrap>
                        <v-flex xs12 sm12 md3 lg3 v-for="(tag, i) in tags" :key="i" >
                          <v-checkbox v-model="selected" :label="tag.name" :value="tag.name"></v-checkbox>
                        </v-flex>
                      </v-layout>
                    </v-container>
                      </v-card-text>
                    </v-card>

                    <wysiwyg v-model="description" style="background-color: grey;"></wysiwyg>
  
                    <v-btn 
                    @click.prevent="askQuestion"
                    v-on:click.prevent="loader = 'loading'"
                    :loading="loading"
                    :disabled="loading"
                    light
                    
                    >
                    Ask
                    <v-icon small>send</v-icon>
                    </v-btn>
                    </v-form>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AskQuestion',
  data () {
    return {
      title: '',
      description: '',
      snackbar: false,
      message: '',
      loader: null,
      loading: false,
      color: '',
      icon: '',
      selected: []
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
  computed: mapState([
    'tags', 'questions'
  ]),
  methods: {
    askQuestion () {
      this.$store.dispatch('askQuestionAct', {...this})
      this.$store.dispatch('getQuestionAct')
      this.$store.dispatch('getMineQuestion')
      this.$router.push('/question/mine')
    }
  }
}
</script>

<style>

</style>
