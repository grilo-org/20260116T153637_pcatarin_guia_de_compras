const pg = require('pg')

const db = new pg.Pool({
    connectionString: "postgresql://pcatarin:6FCDMSjc7pZXHnyz8lnBVoWccS4SVCHa@dpg-d3kokm49c44c738tlpqg-a.oregon-postgres.render.com:5432/dblist_e8e2",
    ssl: { rejectUnauthorized: false }
})

console.log(db)

async function teste() {
    //await db.connect();

    //const query = "SELECT 1+1 AS RESULTADO;"
    const query = "DELETE FROM users WHERE name = 'Gabriel';"
    const querySelect = "SELECT * FROM users;"
    const queryInsert = `INSERT INTO users (name, nick_name, password) VALUES (
    'Gabriel',
    'gmoura',
    '54321');` 
    const result = await db.query(query);

    console.log(result.rows)
    
}

teste()

async function teste2 () {
    try {
        const res = await db.query('SELECT 1 + 1 AS resultado');
        console.log(res.rows);
        await db.end()
    } catch (err) {
        console.error(err);
  
    }

}