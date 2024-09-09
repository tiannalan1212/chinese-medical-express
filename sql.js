//封装数据库接口
let dataBase = {}

//列表查询
'SELECT * FROM patient WHERE sex="1" ORDER BY create_time DESC LIMIT 2 OFFSET 0 '

dataBase.select = (table, query) => {
    let sql = `SELECT * FROM ${table}`

    let _current = query.current
    let _pageSize = query.pageSize
    let _orderBy = query.orderBy

    delete query.current
    delete query.pageSize
    delete query.orderBy
    console.log(query)

    if (!!query && Object.keys(query).length != 0) {
        sql = sql + " WHERE "
        for (let key in query) {
            if (typeof (query[key]) == "string") {
                `${key} =“${query[key]}”`
            } else {
                `${key} = ${query[key]}`
            }
        }
    }

    if (!!_orderBy) {
        sql = sql + ` ORDER BY ${_orderBy} DESC`
    }
    if (!!_current && !!_pageSize) {
        let n = _pageSize * (_current - 1)
        sql = sql + ` LIMIT ${_pageSize} OFFSET ${n}`
    }
    console.log(sql)
    return sql
}



//详情查询
//插入
//更新
//删除

module.exports = dataBase;