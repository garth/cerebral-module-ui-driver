export default function setStateValue ({ input, state }) {
  state.set(input.statePath, input.value)
}
