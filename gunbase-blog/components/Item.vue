<!-- <template>
    <div class="item">
        <div>ID: {{ items.id }}</div>
        <div>タイトル: {{ items.title }}</div>
        <div>本文: {{ items.content }}</div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Item",
  props: {
    id: String
  },
  data() {
    return {
      url: '',
      items: []
    };
  },
  created() {
    this.url = `https://gunbase.microcms.io/api/v1/news/p6UCrvXMS`
    axios.get(this.url, { headers: { 'X-API-KEY': '86d518d6-1de7-423f-aca2-8bde6f74e3cd' } })
    .then(response => {
      this.items = response.data;
    });
  }
}
</script> -->
