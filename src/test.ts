import db from "./modules/db";

(async () => {
    const sql = "SELECT * FROM users"
    return await db.query(sql)
})().then(result => {
    console.log(result)
}).catch(error => {
    console.error(error)
})