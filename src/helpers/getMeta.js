export default function getMeta (state, path) {
  let meta = state
  path.forEach(node => {
    meta = meta[node]
  })
  return meta
}
