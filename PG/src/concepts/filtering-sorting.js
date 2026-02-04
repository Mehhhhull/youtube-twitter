

const db=require('../db/db')

//WHERE clause

async function getUsersWhere(condition){
  const getUsersQuery=`
  SELECT * FROM users
  WHERE ${condition}
  `
  try {
    const res=await db.query(getUsersQuery)
    return res.rows
  } catch (e) {
    console.error(e)
  }
}

module.exports={getUsersWhere}