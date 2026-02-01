
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

// update->mehulkumarsingh@gmail.com to mks@gmail.com where user name is Mehul Kumar SIngh

async function updateUserInfo(username,newEmail){
  const updateQuery=`
  UPDATE users
  SET email=$2
  WHERE username=$1
  RETURNING *
  `

  try {
    const res=await db.query(updateQuery,[username,newEmail])

    if(res.rows.length>0){
      console.log("User email updated successfully",res.rows[0])
      return res.rows[0]
    }else{
      console.log("No user found with the given username")
      return null
    }
  } catch (error) {
    console.log("Error while updating user email",error)
  }
}

module.exports={createUserTable,insertUser,fetchAllUsers,updateUserInfo}