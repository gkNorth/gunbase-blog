<template>
  <div id="app">
    <div class="contents-wrap">
      <div class="itemContainer">
        <div class="item">
          <div v-if="items.thumbnail">
            <div class="thumb">
              <img :src="items.thumbnail.url" alt="">
            </div>
          </div>

          <div v-else>
            <div class="thumb">
              <img src="../../assets/powderly-soy-bgwh.png" alt="">
            </div>
          </div>

          <h1>{{ items.title }}</h1>
          <ul class="date">
            <li>{{ items.createdAt | capitalize }}</li>
            <li>{{ items.updatedAt | capitalize }}</li>
          </ul>
          <ul class="tags">
            <li class="tag">
              <span v-for="item in items.tags">{{ item.tag }}</span>
            </li>
          </ul>

          <div id="toc-wrap" class="toc-wrap"></div>

          <div v-html="items.content" class="content-wrap">
            <p>{{ items.content }}</p>
          </div>
        </div>
      </div>
      <div class="my-2">
        <v-btn small color="#a9b3a6"><nuxt-link to="/">トップページに戻る</nuxt-link></v-btn>
      </div>
    </div>
    <div class="side-nav view-pc">
      <h3>タグ一覧</h3>
      <ul class="side-list">
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
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    async asyncData (params) {
      const url = `https://gunbase.microcms.io/api/v1/blog/${params.query.q}`;
      const { data } = await axios.get(url, { headers: { 'X-API-KEY': process.env.API_KEY } })
      return {
        items: data
      }
    },
    mounted() {
      const tableOfContents = document.getElementsByTagName("h2")
      if (tableOfContents.length > 0) {
        const el = document.getElementById("toc-wrap")
        var list = '<div class="wrap-in"><p class="toc-title"><span>Table of Contents</span></p><ol id="toc">';
        for(var key of tableOfContents) {
          var item = `<li class="item"><a href="#${key.id}">${key.textContent}</a></li>`
          list += item
        }
        list += '</ol></div>';
        el.innerHTML = list;
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

</style>
