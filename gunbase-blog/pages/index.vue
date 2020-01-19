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

    <div class="list">
      <div v-for="item in items" :key="item.id">
        <div>
          <h2>
            <nuxt-link :to="{ name: 'page', query: { q: item.id } }" :id="item.id">タイトル： {{ item.title }}</nuxt-link>
          </h2>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  async asyncData () {
    if (process.client) {
      const contents = document.getElementById('contents');
      const config = {

      };

      const firebaseApp = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
      const app = flamelink({ firebaseApp });

      const list = [];

      app.content.get('myposts').then(posts => {
        Object.keys(posts).forEach(function(data) {
          list.push(posts[data])
        })
      })
      console.log(list)
      return {
        items: list
      }
    }
  }
}
</script>

<style>
  body {
    color: #333;
  }
  .list {
    margin-top: 30px;
  }
</style>
