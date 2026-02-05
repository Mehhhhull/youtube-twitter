

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

async function getSortedUser(column,order="ASC"){
  const getSortedUsersQueries=`
  SELECT * FROM users
  ORDER BY ${column} ${order}
  `

  try {
    const result=await db.query(getSortedUsersQueries);

    return result.rows
  } catch (e) {
    console.log("Error",e)
  }
}

async function getPaginatedUsers(limit,offset){
    const getPaginatedQuery=`
    SELECT * FROM users
    LIMIT $1 OFFSET $2
    `

    try {
      const result=await db.query(getPaginatedQuery,[limit,offset])

      return result.rows;
    } catch (e) {
      console.log(e)
    }
}

module.exports={getUsersWhere,getSortedUser,getPaginatedUsers}