<template>
  <div class="list-wrap">
    <div class="mv" v-for="item in $store.state.headers" :key="item.id">
      <img :src="item.headerPC.url" alt="" class="view-pc">
      <img :src="item.headerSP.url" alt="" class="view-sp">
    </div>
    <div class="list">
      <h2>タグ: {{tagName}}</h2>
      <div v-if="tagFilter.length > 0">
        <div v-for="item in tagFilter" :key="item.id" class="card">
          <nuxt-link
            :to="{ name: 'page', params: { id: item.id }, query: { q: item.id } }"
            :id="item.id">
            <div v-if="item.thumbnail">
              <div class="thumb" v-for="url in item.thumbnail">
                <img :src="url" alt="">
                <div class="tag">
                  <span v-for="item in item.tags">{{ item.tag }}</span>
                </div>
              </div>
            </div>

            <div v-else>
              <div class="thumb">
                <img src="../../assets/powderly-soy-bgwh.png" alt="">
                <div class="tag">
                  <span v-for="item in item.tags">{{ item.tag }}</span>
                </div>
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
