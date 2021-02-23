<template>
  <v-app light>

    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <ul class="tag-list">
        <li><nuxt-link to="/"><span>HOME</span></nuxt-link></li>
        <li class="item" v-for="(item, i) in $store.state.tags" :key="i">
          <nuxt-link
            :to="{ name: 'tags', params: { id: item.id }, query: { q: item.id } }"
            :id="item.id">
            <span>{{ item.tag }}</span>
          </nuxt-link>
        </li>
      </ul>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; 2020 Gunbase All Rights Reserved.</span>
    </v-footer>
  </v-app>
</template>

<script>
import axios from 'axios';
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Gunbase'
    }
  },
  async mounted() {
    const baseURL = 'https://gunbase.microcms.io/api/v1'
    const apiKey = process.env.API_KEY;
    const config = { headers: {
      'X-API-KEY': apiKey
    }}
    const data = await Promise.all([
      axios.get(`${baseURL}/blog`,config),
      axios.get(`${baseURL}/header`,config),
      axios.get(`${baseURL}/tag`,config)
    ])
    this.$store.commit('contentsCommit', data[0].data.contents)
    this.$store.commit('headersCommit', data[1].data.contents)
    this.$store.commit('tagsCommit', data[2].data.contents)
  }
}
</script>

<style lang="scss" scoped>

</style>
