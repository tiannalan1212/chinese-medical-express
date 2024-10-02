//封装数据库接口
let dataBase = {}

//查询
'SELECT * FROM patient WHERE sex="1" ORDER BY create_time DESC LIMIT 2 OFFSET 0 '
dataBase.select = (table, query) => {
    let sql = `SELECT * FROM ${table}`

    let _current = query.current
    let _pageSize = query.pageSize
    let _orderBy = query.orderBy

    delete query.current
    delete query.pageSize
    delete query.orderBy
    //console.log(query)

    if (!!query && Object.keys(query).length > 0) {

        let yx = 0;
        let _sql = "";

        for (let key in query) {
            if (typeof (query[key]) == "string" && query[key] != '' && query[key] != 'undefined') {
                _sql=_sql+` ${key} = "${query[key]}"`
                yx++
            } else if (typeof (query[key]) == "number"){
                _sql = _sql +` ${key} = ${query[key]}`
                yx++
            }
        }
        if (yx > 0) {
            sql = sql + " WHERE " +_sql
        }
    }
    if (!!_orderBy) {
        sql = sql + ` ORDER BY ${_orderBy} DESC`
    }
    if (!!_current && !!_pageSize) {
        let n = _pageSize * (_current - 1)
        sql = sql + ` LIMIT ${_pageSize} OFFSET ${n}`
    }
    //console.log(sql)
    return sql
}
//总数查询
dataBase.count = (table) => {

    return `SELECT COUNT(*) FROM ${table}`
}
//插入
//更新
//删除

module.exports = dataBase;