<template>
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
                apiKey: "AIzaSyBUz1NJpEI21rn7-95R75vM7YyY2zbeA6k",
                authDomain: "gunbase-v2.firebaseapp.com",
                databaseURL: "https://gunbase-v2.firebaseio.com",
                projectId: "GUNBASE V2",
                storageBucket: "gunbase-v2.appspot.com",
                messagingSenderId: "480521834607"
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
