//��װ���ݿ�ӿ�
let dataBase = {}

//��ѯ
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
    }
    if (!!_current && !!_pageSize) {
        let n = _pageSize * (_current - 1)
        sql = sql + ` LIMIT ${_pageSize} OFFSET ${n}`
    }
    //console.log(sql)
    return sql
}
//������ѯ
dataBase.count = (table) => {

    return `SELECT COUNT(*) FROM ${table}`
}
//����
// INSERT INTO standardRecipe ( name, remark, standard_describe ) VALUES ( "c", "b", "a" )
dataBase.add = (table, query) => {
    let sql = `INSERT INTO ${table} (`
    let zd = ""
    let z = ""
    for (let key in query) {
        if (query[key] != '' && query[key] != 'undefined') {
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
//����
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