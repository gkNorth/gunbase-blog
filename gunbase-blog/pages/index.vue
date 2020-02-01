<template>
  <div>
    <div class="list">
      <div v-for="item in reverseItems" :key="item.id" class="card">
        <div class="thumb">
          <nuxt-link :to="{ name: 'page', query: { q: item.id } }" :id="item.id">
            <img src="../assets/img01.jpg" alt="">
          </nuxt-link>
          <!-- <p class="tag">{{ item.tags.tag }}</p> -->
        </div>
        <div class="txt">
          <div class="headline">
            <h2>
              <nuxt-link :to="{ name: 'page', query: { q: item.id } }" :id="item.id">タイトル： {{ item.title }}</nuxt-link>
            </h2>
          </div>

          <p class="date">{{ item.createdAt }}</p>

          <div class="more">
            <button>
              <nuxt-link text :to="{ name: 'page', query: { q: item.id } }" :id="item.id">Read Now</nuxt-link>
            </button>
          </div>
        </div>
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
  computed: {
    reverseItems() {
      return this.items.slice().reverse();
    }
  },
  async asyncData () {
    if (process.client) {
      const contents = document.getElementById('contents');
      const config = {
              apiKey: process.env.API_KEY,
              authDomain: process.env.AUTH_DOMAIN,
              databaseURL: process.env.DATABASE_URL,
              projectId: process.env.PROJECT_ID,
              storageBucket: process.env.STORAGE_BUCKET,
              messagingSenderId: process.env.MESSAGINGSENDER_ID
      };

      // console.log(process.env.API_KEY)

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
* {
  box-sizing: border-box;
  color: #333;
}
.view-pc {
  @media (min-width: 769px) {
    display: block;
  }
  @media (max-width: 768px) {
    display: none;
  }
}
.view-sp {
  @media (min-width: 769px) {
    display: none;
  }
  @media (max-width: 768px) {
    display: block;
  }
}
h2 {
  font-size: 100%;
  a {
    color: #333;
  }
}
.mv {
  position: relative;
  height: 190px;
  &:before {
    background-size: 3px 3px;
    background-image: radial-gradient(rgba(255,255,255,0.7),rgba(255,255,255,0.3) 1px,transparent 2px,transparent);
    content: '';
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    opacity: .2;
    z-index: 1;
  }
  img {
    height: 190px;
    object-fit: cover;
    width: 100%;
  }
}
.list {
  margin: 10px;
  .card {
    border-radius: 2px;
    box-shadow: 0px 2px 5px rgba(0,0,0,.1);
    margin-top: 20px;
    &:first-child {
      margin-top: 0;
    }
  }
}
.thumb {
  background: #d9d9d9;
  position: relative;
  width: 100%;
  img {
    height: 200px;
    object-fit: cover;
    width: 100%;
  }
  .tag {
    background: rgba(70, 70, 70, .7);
    color: #fff;
    font-size: 90%;
    padding: 2px 5px;
    position: absolute;
    right: 0;
    top: 0;
  }
}
.txt {
  background: #fff;
  padding: .6em;
  .date {
    color: #777;
    font-family: 'arial black';
    font-size: 70%;
  }
  .more {
    text-align: right;
  }
}
</style>
