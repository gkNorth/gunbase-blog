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
            <h2> {{ detail.title }}</h2>
            <ul class="date">
              <li>{{ detail.__meta__.createdDate | capitalize }}</li>
              <li>{{ detail.date | capitalize }}</li>
            </ul>
            <ul class="tags">
              <li v-for="(item, index) in detail.tag" :key="item.index">{{ item }}</li>
            </ul>
            <div v-html="detail.content">{{ detail.content }}</div>
          </div>
        </div>
        <div class="my-2">
          <v-btn small color="#899386"><nuxt-link to="/">Back</nuxt-link></v-btn>
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

<style lang="scss">
  // #app {
  //   // margin-top: 40px;
  //   .itemContainer {
  //     color: #333;
  //     h2 {
  //       border-bottom: 1px solid rgba(7, 36, 7, .2);
  //       border-radius: 5px;
  //       box-shadow: 5px 5px 5px rgba(7, 36, 7, .2);
  //       box-sizing: border-box;
  //       padding: 4px 6px;
  //     }
  //     h3 {
  //       border-left: 5px solid rgb(7, 36, 7);
  //       margin: 10px 0;
  //       padding-left: 10px;
  //     }
  //     .tags {
  //       display: flex;
  //       list-style: none;
  //       margin-bottom: 20px;
  //       li {
  //         background: #bbb;
  //         border-radius: 5px;
  //         margin-right: 10px;
  //         padding: 1px 5px;
  //       }
  //     }
  //     .date {
  //       display: flex;
  //       list-style: none;
  //       justify-content: flex-end;
  //       margin-bottom: 10px;
  //       padding-left: 30px;
  //       li {
  //         color: #777;
  //         margin-left: 40px;
  //         position: relative;
  //         &:before {
  //           content:'';
  //           background: url('../../assets/created_ico.png') center top /contain no-repeat;
  //           display: block;
  //           left: -24px;
  //           margin-top: -10px;
  //           opacity: .8;
  //           position: absolute;
  //           top: 50%;
  //           height: 22px;
  //           width: 22px;
  //         }
  //         &:nth-child(2) {
  //           &:before {
  //             background: url('../../assets/update_ico.png') center top /contain no-repeat;
  //             left: -19px;
  //             margin-top: -7.5px;
  //             opacity: .7;
  //             height: 17px;
  //             width: 17px;
  //           }
  //         }
  //       }
  //     }
  //   }
  //   .btn {
  //     background: #a9b3a6;
  //     border-radius: 3px;
  //     display: inline-block;
  //     color: #fff;
  //   }
  //   button {
  //     a {
  //       color: #fff;
  //       text-decoration: none;
  //     }
  //   }
  // }
</style>
