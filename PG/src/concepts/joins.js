

const db=require('../db/db');

// inner join->returns only the rows where there is a match in both tables

async function getUsersWithPosts(){
  const getUserWithPostQuery=`
  SELECT users.id,users.username,posts.title
  FROM users
  INNER JOIN posts ON users.id=posts.user_id
  `

  try {
    const res=await db.query(getUserWithPostQuery)
    return res.rows;
  } catch (e) {
    console.error(e);
    
  }
}

module.exports={getUsersWithPosts}