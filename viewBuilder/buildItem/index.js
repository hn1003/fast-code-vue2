const buildTable = require('@only_you/fast-code/viewBuilder/buildView/buildTable')
const buildDialog = require('@only_you/fast-code/viewBuilder/buildView/buildFormDialog')
const buildApi = require('@only_you/fast-code/viewBuilder/buildView/buildApi')

const name = '角色'
const key = 'role'
const apiName = 'role'
const url = 'role'

// SEARCH
const table = `
SEARCH private String name;//角色
private String info;//描述
private String authTag;//权限字符
`

// REQUIRED
const dialog = ` 
REQUIRED private String authTag; //权限字符 --ADMIN,学院管理员 DOR_ADMIN,宿管 CLASS_ADMIN,班主任
REQUIRED private String name; //角色
`
const _path = [__dirname, 'res']
buildDialog(name, key, dialog, _path)
buildTable(name, key, table, _path)
buildApi(apiName, url, _path)


