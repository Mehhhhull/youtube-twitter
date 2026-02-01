
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

async function insertUser(username,email){
  const insertUserQuery=`
  INSERT INTO users(username,email)
  VALUES($1,$2)  
  RETURNING *
  `
  //using dollar sign to prevent sql injection

  try {
    const res=await db.query(insertUserQuery,[username,email])
    console.log('User Inserted Successfully',res.rows[0])

    return res.rows[0];
    
  } catch (error) {
    console.log("Error while inserting user",error)
  }
}

async function fetchAllUsers(){
    const getAllUsersFromUsersTable='SELECT * FROM users'

    try {
      const res=await db.query(getAllUsersFromUsersTable)
      console.log("Fetched All Users")

      return res.rows
    } catch (error) {
      console.log("Error",error)
    }
}

module.exports={createUserTable,insertUser,fetchAllUsers}