<template>
  <div>
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
    </v-app>

    <v-card
      v-for="item in reverseItems"
      :key="item.id"
      color="#899386"
      dark
    >
      <v-card-title class="headline">
        <h2>
          <nuxt-link :to="{ name: 'page', query: { q: item.id } }" :id="item.id">タイトル： {{ item.title }}</nuxt-link>
        </h2>
      </v-card-title>

      <v-card-subtitle>{{ item.createdAt }}</v-card-subtitle>

      <v-card-actions>
        <v-btn text :to="{ name: 'page', query: { q: item.id } }" :id="item.id">Read Now</v-btn>
      </v-card-actions>
    </v-card>
  </div>

</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  computed: {
    reverseItems() {
      return this.items.slice().reverse();
    }
  },
  async asyncData () {
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
          list.push(posts[data])
        })
      })
      return {
        items: list
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  h2 {
    font-size: 100%;
    a {
      color: #fff;
      text-decoration: none;
    }
  }
  .v-card {
    margin-top: 20px;
  }
</style>
