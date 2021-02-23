export const state = () => ({
  contents: [],
  headers: [],
  tags: []
})

export const mutations = {
  contentsCommit(state, contents) {
    state.contents = contents
  },
  headersCommit(state, headers) {
    state.headers = headers
  },
  tagsCommit(state, tags) {
    state.tags = tags
  }
}
