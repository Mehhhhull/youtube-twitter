

const db=require('../db/db')

// ->user 1(id:abc)-> 5->p1,p2,p3,p4,p5
// ->user 2(id:xyz)->100->6,7,8,9,10,11,.............100


async function createPostsTable(){
  const createTableQuery=`
  CREATE TABLE IF NOT EXISTS posts(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

)
  `


  try {
    await db.query(createTableQuery)
    console.log('Posts table created SUcccessfully!!!');
    
  } catch (e) {
    console.error(e)
  }
}

module.exports={
  createPostsTable
}