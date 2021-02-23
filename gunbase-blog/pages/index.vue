<template>
  <div class="list-wrap">
    <div class="mv" v-for="item in $store.state.headers" :key="item.id">
      <img :src="item.headerPC.url" alt="" class="view-pc">
      <img :src="item.headerSP.url" alt="" class="view-sp">
    </div>
    <div class="g-nav-wrap view-pc">
      <ul class="g-nav-list">
        <li><nuxt-link to="/"><span>HOME</span></nuxt-link></li>
        <li class="item" v-for="(item, i) in $store.state.tags" :key="i">
          <nuxt-link
            :to="{ name: 'tags', params: { id: item.id }, query: { q: item.id } }"
            :id="item.id">
            <span>{{ item.tag }}</span>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div class="list">
      <div v-for="item in limitList" :key="item.id" class="card">
        <nuxt-link
          :to="{ name: 'page', params: { id: item.id }, query: { q: item.id } }"
          :id="item.id">
          <div v-if="item.thumbnail">
            <div class="thumb">
              <img :src="item.thumbnail.url" alt="">
              <div class="tag">
                <span v-for="item in item.tags">{{ item.tag }}</span>
              </div>
            </div>
          </div>

          <div v-else>
            <div class="thumb">
              <img src="../assets/powderly-soy-bgwh.png" alt="">
              <div class="tag">
                <span v-for="item in item.tags">{{ item.tag }}</span>
              </div>
            </div>
          </div>

          <div class="txt">
            <div class="headline">
              <h2 class="title">{{ item.title }}</h2>
            </div>
            <p class="date">{{ item.createdAt | capitalize }}</p>
            <div class="more"><button>Read Now</button></div>
          </div>
        </nuxt-link>
      </div>
    </div>
    <div class="btn-wrap" v-if="this.$store.state.contents.length > this.count">
      <div class="btn -limit" @click="countUp">
        <span>次の10件を表示する</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      count: 10,
      contents: [],
      header: []
    };
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.substring(0,value.indexOf("T"));
    }
  },
  computed: {
    limitList: function(value) {
      let list = this.$store.state.contents.slice(0,this.count)
      return list
    }
  },
  methods: {
    countUp: function() {
      this.count += 10
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
