import Vue from 'vue'
import Vuex from 'vuex'
import axiosInstance from 'axios'

Vue.use(Vuex)

let axios = axiosInstance.create({
  baseURL: `http://localhost:3000`
})


export default new Vuex.Store({
  state: {
    validation: {},
    login: {},
    user: {},
    isLogin: false,
    questions: [],
    tags: [],
    tagsList: [],
    question: {},
    myTags: []
  },
  mutations: {
    registerMt (state, payload) {
      state.validation = {...payload}
    },
    loginMt (state, payload) {
      if (payload.user) {
        state.validation = {...payload}
        state.user = {...payload.user}
        state.isLogin = true
      } else {
        state.validation = {...payload}
        state.isLogin = false
      }
    },
    checkUserMt (state, payload) {
      state.user = payload
      let tags = []
      payload.tags.map(val => {
        tags.push(val.name)
      })
      state.myTags = tags
      state.isLogin = true
    },
    logoutMt (state, payload) {
      state.isLogin = payload
    },
    askQuestionMt (state, payload) {
      state.questions.push(payload.question)
      state.validation = {...payload}
    },
    getTagsMt (state, payload) {
      state.tags = payload
      let tags = []
      payload.map(val => {
        tags.push(val.name)
      })
      state.tagsList = tags
    },
    getQuestionMt (state, payload) {
      state.questions = payload
    },
    getDetailsMt (state, payload) {
      state.question = payload
    },
    upQuestMt (state, payload) {
      state.question = payload.question
      state.validation = {...payload}
    },
    downQuestMt (state, payload) {
      state.question = payload.question
      state.validation = {...payload}
    },
    answerQuestMt (state, payload) {
      state.validation = {...payload}
    },
    upAnswerMt (state, payload) {
      state.validation = {...payload}
    },
    downAnswerMt (state, payload) {
      state.validation = {...payload}
    },
    deleteResponseMt (state, payload) {
      state.validation = {...payload}
    },
    editResponseMt (state, payload) {
      state.validation = {...payload}
    },
    taggedQuestionMt (state, payload) {
      state.questions = payload
    }
  },
  actions: {
    registerAct({ commit }, user) {
      let formData = new FormData()
      formData.append('name', user.name)
      formData.append('email', user.email)
      formData.append('password', user.password)
      formData.append('avatar', user.avatar)
      axios({
        method: `POST`,
        url: `/users`,
        data: formData
      })
      .then(({ data }) => {
        user.snackbar = true
        user.message = `Thank you for join our website ${data.name}, please sign in`
        user.color = 'green'
        user.icon = 'check_circle'
        let response = {
          snackbar: user.snackbar,
          message: user.message,
          color: user.color,
          icon: user.icon  
        }
        commit('registerMt', response)
      })
      .catch(err => {
        user.snackbar = true
        user.color = 'red'
        user.message = err.response.data
        user.icon = 'error'
        let response = {
          snackbar: user.snackbar,
          message: user.message,
          color: user.color,
          icon: user.icon  
        }
        commit('registerMt',response)
      })
    },
    loginAct ({commit}, login) {
      axios({
        method: `POST`,
        url: `/users/login`,
        data: {
          email: login.email,
          password: login.password
        }
      })
      .then(({ data }) => {
        login.snackbar = true
        login.message = `Welcome back! ${data.name} !`
        login.color = 'green'
        login.icon = 'check_circle'
        localStorage.setItem('token', data.token)
        let response = {
          snackbar: login.snackbar,
          message: login.message,
          color: login.color,
          icon: login.icon,
          user: data
        }
        commit('loginMt', response)
        
      })
      .catch(err => {
        login.snackbar = true
        login.color = 'red'
        login.message = err.response.data.msg
        login.icon = 'error'
        let response = {
          snackbar: login.snackbar,
          message: login.message,
          color: login.color,
          icon: login.icon,
        }
        commit('loginMt', response)
      })
    },
    checkUser ({ commit }, data) {
      axios({
        method: `GET`,
        url: `/users`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        commit('checkUserMt', data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    logoutAct ({ commit }) {
      localStorage.clear()
      commit('logoutMt', false)
    },
    askQuestionAct ({ commit }, question) {
      axios({
        method: `POST`,
        url: `/questions`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          title: question.title,
          description: question.description,
          tags: question.selected
        }
      })
      .then(({ data }) => {
        question.snackbar = true
        question.message = `Successfully Post Your Question!`
        question.color = 'green'
        question.icon = 'check_circle'
        let response = {
          snackbar: question.snackbar,
          message: question.message,
          color: question.color,
          icon: question.icon,
          question: data
        }
        commit('askQuestionMt', response)
      })
      .catch(err => {
        question.snackbar = true
        question.color = 'red'
        question.message = err.response.data
        question.icon = 'error'
        let response = {
          snackbar: question.snackbar,
          message: question.message,
          color: question.color,
          icon: question.icon
        }
        commit('askQuestionMt', response)
      })
    },
    getTagsAct ({ commit }, tags) {
      axios({
        method: `GET`,
        url: `/tags`
      })
      .then(({ data }) => {
       
        commit('getTagsMt', data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getQuestionAct ({ commit }) {
      axios({
        method: `GET`,
        url: `/questions`
      })
      .then(({ data }) => {
        commit('getQuestionMt', data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getDetailsAct({ commit }, id) {
      axios({
        method: `GET`,
        url: `/questions/${id}`
      })
      .then(({ data }) => {
        commit('getDetailsMt', data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    upQuestAct ({ commit }, upvote) {
      axios({
        method: `POST`,
        url: `/questions/${upvote.id}/upvotes`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        upvote.snackbar = true
        upvote.color = 'green'
        upvote.message = `Thanks for you feedback!`
        upvote.icon = 'check_circle'
        let response = {
          snackbar: upvote.snackbar,
          color: upvote.color,
          message: upvote.message,
          icon: upvote.icon,
          question: data
        }
        commit('upQuestMt', response)
      })
      .catch(err => {
        upvote.snackbar = true
        upvote.color = 'red'
        upvote.message = err.response.data.message
        upvote.icon = 'error'
        let response = {
          snackbar: upvote.snackbar,
          color: upvote.color,
          message: upvote.message,
          icon: upvote.icon,
        }
        commit('upQuestMt', response)
      })
    },
    downQuestAct ({ commit }, downvote) {
      axios({
        method: `POST`,
        url: `/questions/${downvote.id}/downvotes`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        downvote.snackbar = true
        downvote.color = 'green'
        downvote.message = `Thanks for you feedback!`
        downvote.icon = 'check_circle'
        let response = {
          snackbar: downvote.snackbar,
          color: downvote.color,
          message: downvote.message,
          icon: downvote.icon,
          question: data
        }
        commit('downQuestMt', response)
      })
      .catch(err => {
        downvote.snackbar = true
        downvote.color = 'red'
        downvote.message = err.response.data.message
        downvote.icon = 'error'
        let response = {
          snackbar: upvote.snackbar,
          color: upvote.color,
          message: upvote.message,
          icon: upvote.icon,
        }
        commit('downQuestMt', response)
      })
    },
    answerQuestAct ({ commit }, answer) {
      answer.snackbar = true
      answer.color = 'green'
      answer.message = `Success Post Answer!`
      answer.icon = 'check_circle'
      let response = {
        snackbar: answer.snackbar,
        color: answer.color,
        message: answer.message,
        icon: answer.icon,
      }
      commit('answerQuestMt', response)
    },
    upAnswerAct ({ commit }, upvote) {
      upvote.snackbar = true
      upvote.color = 'green'
      upvote.message = `Thanks for you feedback!`
      upvote.icon = 'check_circle'
      let response = {
        snackbar: upvote.snackbar,
        color: upvote.color,
        message: upvote.message,
        icon: upvote.icon,
      }
      commit('upAnswerMt', response)
    },
    downAnswerAct ({ commit }, downvote) {
      downvote.snackbar = true
      downvote.color = 'green'
      downvote.message = `You downvote this answer!`
      downvote.icon = 'check_circle'
      let response = {
        snackbar: downvote.snackbar,
        color: downvote.color,
        message: downvote.message,
        icon: downvote.icon,
      }
      commit('downAnswerMt', response)
    },
    deleteResponseAct ({ commit }, resp) {
      resp.snackbar = true
      resp.color = 'green'
      resp.message = `Successfully deleted this question!`
      resp.icon = 'check_circle'
      commit('deleteResponseMt', resp)
    },
    editResponseAct ({commit}, resp) {
      commit('editResponseMt', resp)
    },
    taggedQuestionAct ({ commit }, name) {
      axios({
        method: `GET`,
        url: `/questions/tagged/${name}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        commit('taggedQuestionMt', data)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
})
