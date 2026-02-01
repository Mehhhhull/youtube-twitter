const { Poll } = require("pg");
const { connectionString } = require("pg/lib/defaults");

//create a new pool instance to manage database connection
//->postgres->://->[user]->password->@->host:port->[database name]
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function query(text, params) {
  const start = Date.now();

  try {
    const result = await pool.query(text, params);

    //execute the time->
    const duration = Date.now() - start;

    console.log(
      `Executed query: , ${{ text, duration, rows: result.rowCount }}`
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
}

module.exports = { query };
