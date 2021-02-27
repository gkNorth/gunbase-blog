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
      <h2>タグ: {{tagName}}</h2>
      <div v-if="tagFilter.length > 0">
        <div v-for="item in tagFilter" :key="item.id" class="card">
          <nuxt-link
            :to="{ name: 'page', params: { id: item.id }, query: { q: item.id } }"
            :id="item.id">
            <div v-if="item.thumbnail">
              <div class="thumb">
                <img :src="item.thumbnail.url" alt="">
              </div>
            </div>

            <div v-else>
              <div class="thumb">
                <img src="../../assets/noimage.png" alt="">
              </div>
            </div>

            <div class="txt">
              <div class="headline">
                <h2>{{ item.title }}</h2>
              </div>
              <p class="date">{{ item.createdAt | capitalize }}</p>
              <div class="more"><button>Read Now</button></div>
            </div>
          </nuxt-link>
        </div>
      </div>
      <div v-else>
        <p>現在はありません。</p>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.substring(0,value.indexOf("T"));
      }
    },
    computed: {
      tagFilter: function () {
        let tagList = [];
        for(var i=0; i<this.$store.state.contents.length; i++) {
          for(var j=0; j<this.$store.state.contents[i].tags.length; j++) {
            if(this.$store.state.contents[i].tags[j].id == this.$route.query.q) {
              tagList.push(this.$store.state.contents[i])
            }
          }
        }
        return tagList
      },
      tagName: function () {
        let tagName = ''
        for(var i=0; i<this.$store.state.tags.length; i++) {
          if(this.$store.state.tags[i].id == this.$route.query.q) {
            tagName = this.$store.state.tags[i].tag
          }
        }
        return tagName
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
