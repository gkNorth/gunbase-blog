<template>
  <div>
    <div v-for="item in items" :key="item.id">
      <div>
        <h2>
          <nuxt-link :to="{ name: 'page', query: { q: item.id } }" :id="item.id">タイトル： {{ item.title }}</nuxt-link>
        </h2>
      </div>
    </div>
  </div>
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
      console.log(list)
      return {
        items: list
      }
    }
  }
}
</script>
