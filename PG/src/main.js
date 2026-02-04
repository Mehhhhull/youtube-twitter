

const {insertUser,createUserTable,fetchAllUsers, updateUserInfo,deleteInfo}=require('./concepts/basic-queries')

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

  // console.log("All users");
// const allUsers=await fetchAllUsers();
// console.log(allUsers);

// const updatedUser=await updateUserInfo('Mehul Kumar Singh','mks@gmail.com');
// console.log("Updated User:",updatedUser);

// const deletedUser=await deleteInfo('John Sina');
// console.log("Deleted User:",deletedUser);


} catch (e) {
  console.log("Error",e)
}  
}

async function testFilterAndSortQueries{
  try {
    
  } catch (error) {
    console.log("Error",error);
  }
}

async function testAllQueries(){
  await testBasicQueries()
}

testAllQueries()