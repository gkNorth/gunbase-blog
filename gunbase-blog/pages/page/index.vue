<template>
  <v-app>
    <v-app-bar
      app
      color="#004D40"
      dark
    >
      <div class="d-flex align-center">
        <h1 class="header-title">Gunbase</span></h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        to="/"
        text
      >
        <span class="mr-2">HOME</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <div id="app">
        <div class="itemContainer">
          <div class="item" v-for="detail in list" :key="detail.id">
            <h1> {{ detail.title }}</h1>
            <ul>
              <li>{{ detail.__meta__.createdDate | capitalize }}</li>
              <li>{{ detail.date | capitalize }}</li>
            </ul>
            <div v-html="detail.content">{{ detail.content }}</div>
          </div>
        </div>
        <div class="button">
            <nuxt-link to="/">戻る</nuxt-link>
        </div>
    </div>
  </v-app>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        list: []
      }
    },
    async asyncData (params) {
      console.log(params.query.q)
      if (process.client) {
        const contents = document.getElementById('contents');
        const config = {

        };

        const firebaseApp = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
        const app = flamelink({ firebaseApp });

        const list = [];

        app.content.get('myposts').then(posts => {
          Object.keys(posts).forEach(function(data) {
            console.log(posts[data].id)
            if(posts[data].id == params.query.q) {
              list.push(posts[data])
            }
          })
        })
        return {
          list: list
        }
      }
    },
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.substring(0,value.indexOf("T"));
      }
    }
  }
</script>

<style>
  #app {
    margin-top: 30px;
  }
</style>
