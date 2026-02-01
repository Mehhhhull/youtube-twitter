
const db=require('../db/db');

async function createUserTable(){
  const createTableQuery=`
  CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email varchar(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  )
  `;

  try{
  await  db.query(createTableQuery)
  console.log("Users table created successfully");
  } catch(error){
    console.log("Error while creating users table",error)
  }
}

module.exports={createUserTable}