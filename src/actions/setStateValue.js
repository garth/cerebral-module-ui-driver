export default function setStateValue ({ input: { statePath, value }, state }) {
  state.set(statePath, value)
}
