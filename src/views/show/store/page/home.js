
const homeActions = {

}

const homeMutations = {
  updateSource (state, payload) {
    state.source = payload
  }

}

const homeState = {
  source: []

}

export {
  homeActions,
  homeMutations,
  homeState
}