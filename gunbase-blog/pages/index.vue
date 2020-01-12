<template>
  <div>
    <div v-for="item in items" :key="item.id">
      <div>
        <h2>タイトル： {{ item.title }}</h2>
        <div v-html="item.content">
          本文<br>
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      items: []
    };
  },
  created() {
    axios.get("https://gunbase.microcms.io/api/v1/news", { headers: { 'X-API-KEY': '86d518d6-1de7-423f-aca2-8bde6f74e3cd' } })
    .then(response => {
      this.items = response.data.contents;
    });
  }
}
</script>
