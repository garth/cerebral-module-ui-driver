export default function getMeta (state, path) {
  let meta = state || undefined
  path.forEach((node) => {
    meta = meta && meta[node]
  })
  return meta
}
