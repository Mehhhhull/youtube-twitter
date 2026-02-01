

const {insertUser,createUserTable,fetchAllUsers}=require('./concepts/basic-queries')

//test basic quaries
async function testBasicQueries(){
try {
  // await createUserTable()

  //Insert new Users
  // await insertUser('Mehul Kumar Singh','mehulkumarsingh@gmail.com')
  // await insertUser('John Sina','johnsina@gmail.com')
  // await insertUser('Jane Smith','janesmith@gmail.com')
  // await insertUser('Bob Johnson','bobjohnson@gmail.com')
  // await insertUser('Alice Williams','alicewilliams@gmail.com')

  console.log("All users");

  const allUsers=await fetchAllUsers();

  console.log(allUsers);


} catch (e) {
  console.log("Error",e)
}  
}

async function testAllQueries(){
  await testBasicQueries()
}

testAllQueries()