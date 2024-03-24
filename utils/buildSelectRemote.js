function buildSelectRemote(
  action,
  getSelectComponent,
  setData,
  DataKey='data'
) {
  const time = 500
  let timer = null
  let oldTime = 0
  const getList = (query, action) => {
    if ((new Date().getTime() - oldTime) < time) {
      clearTimeout(timer)
      oldTime = new Date().getTime()
      return
    }
    timer = setTimeout(() => {
      const selectComponent = getSelectComponent()
      selectComponent.loading = true
      action({
        name: query,
        pageSize: 9999,
        pageNum: 1
      }).then(res => {
        selectComponent[DataKey] = setData(res)
      }).finally(() => {
        selectComponent.loading = false
        clearTimeout(timer)
      })
    }, time)
  }
  const init = setTimeout(() => {
    clearTimeout(init)
    getList('', action)
  }, 0)
  return (query) => {
    getList(query, action)
  }
}

export default buildSelectRemote