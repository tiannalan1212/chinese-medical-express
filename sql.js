// 封装数据库接口
let dataBase = {}

// 查询
'SELECT * FROM patient WHERE sex="1" ORDER BY create_time DESC LIMIT 2 OFFSET 0 '
dataBase.select = (table, query) => {
    let sql = `SELECT * FROM ${table}`
    //console.log(query)

    let _current = query.current
    let _pageSize = query.pageSize
    let _orderBy = query.orderBy

    // console.log(_current)
    // console.log('.......')
    // console.log(_pageSize)

    delete query.current
    delete query.pageSize
    delete query.orderBy
    //console.log(query)

    if (!!query && Object.keys(query).length > 0) {

        let yx = 0;
        let _sql = "";

        for (let key in query) {
            if (typeof (query[key]) == "string" && query[key] != '' && query[key] != 'undefined') {
                _sql = _sql + ` ${key} = "${query[key]}"`
                yx++
            } else if (typeof (query[key]) == "number") {
                _sql = _sql + ` ${key} = ${query[key]}`
                yx++
            }
        }
        if (yx > 0) {
            sql = sql + " WHERE " + _sql
        }
    }
    if (!!_orderBy) {
        sql = sql + ` ORDER BY ${_orderBy} DESC`
    } else {
        sql = sql + ` ORDER BY create_time DESC`
    }
    if (!!_current && !!_pageSize) {
        let n = _pageSize * (_current - 1)
        sql = sql + ` LIMIT ${_pageSize} OFFSET ${n}`
    }
    //console.log(sql)
    return sql
}
// 总数查询
dataBase.count = (table,query) => {

    let sql = `SELECT COUNT(*) FROM ${table}`

    delete query.current
    delete query.pageSize
    delete query.orderBy

    if (!!query && Object.keys(query).length > 0) {

        let yx = 0;
        let _sql = "";

        for (let key in query) {
            if (typeof (query[key]) == "string" && query[key] != '' && query[key] != 'undefined') {
                _sql = _sql + ` ${key} = "${query[key]}"`
                yx++
            } else if (typeof (query[key]) == "number") {
                _sql = _sql + ` ${key} = ${query[key]}`
                yx++
            }
        }
        if (yx > 0) {
            sql = sql + " WHERE " + _sql
        }
    }
    
    return sql
}
// 插入
// INSERT INTO standardRecipe ( name, remark, standard_describe ) VALUES ( "c", "b", "a" )
dataBase.add = (table, query) => {
    let sql = `INSERT INTO ${table} (`
    let zd = ""
    let z = ""
    for (let key in query) {
        if (query[key] !== '' && query[key] !== 'undefined') {
            zd = zd + `${key},`
        }
    }
    //zd = zd.substring(0, zd.length - 1)
    sql = sql + zd + "create_time" + ") VALUES ("
    for (let key in query) {
        if (typeof (query[key]) == "string" && query[key] != '' && query[key] != 'undefined') {
            z = z + `"${query[key]}",`
        } else if (typeof (query[key]) == "number") {
            z = z + `${query[key]},`
        }
    }
    //z = z.substring(0, z.length - 1)
    sql = sql + z + new Date().getTime() + ")"
    //console.log(sql)
    return sql
}

//UPDATE standard SET name = "a", remark = "n", standard_describe = "c" WHERE id = "${id}"`
// 更新
dataBase.update = (table, query) => {

    let _sql = `UPDATE ${table} SET `
    let _id = query.id

    delete query.id
    for (let key in query) {
        if (typeof (query[key]) == "string" && query[key] != '' && query[key] != 'undefined') {

            _sql = _sql + ` ${key} = "${query[key]}" ,`

        } else if (typeof (query[key]) == "number") {

            _sql = _sql + ` ${key} = ${query[key]} ,`

        }
    }
    _sql = _sql.substring(0, _sql.length - 1) + `WHERE id = "${_id}"`

    return _sql
}

module.exports = dataBase;