

const db=require('../db/db');

async function countPostsByUser(){
  const countPostsByUserQuery=`
  SELECT users.username,COUNT(posts.id) as post_count
  FROM users
  LEFT JOIN posts ON users.id=posts.user_id
  GROUP BY users.id,users.username
  `;

  try {
    const res=await db.query(countPostsByUser)
    return res.rows
  } catch (e) {
    console.error(e);
    
  }
}

module.exports={
  countPostsByUser
}