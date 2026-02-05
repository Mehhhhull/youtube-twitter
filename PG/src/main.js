

const {insertUser,createUserTable,fetchAllUsers, updateUserInfo,deleteInfo}=require('./concepts/basic-queries');
const { getUsersWhere, getSortedUser, getPaginatedUsers } = require('./concepts/filtering-sorting');
const { createPostsTable } = require('./concepts/relationships');

//test basic quaries
// async function testBasicQueries(){
// try {
//   // await createUserTable()

//   //Insert new Users
//   await insertUser('Zxy','zkyngh@gmail.com')
//   // await insertUser('John Sina','johnsina@gmail.com')
//   // await insertUser('Jane Smith','janesmith@gmail.com')
//   // await insertUser('Bob Johnson','bobjohnson@gmail.com')
//   // await insertUser('Alice Williams','alicewilliams@gmail.com')

//   // console.log("All users");
// // const allUsers=await fetchAllUsers();
// // console.log(allUsers);

// // const updatedUser=await updateUserInfo('Mehul Kumar Singh','mks@gmail.com');
// // console.log("Updated User:",updatedUser);

// // const deletedUser=await deleteInfo('John Sina');
// // console.log("Deleted User:",deletedUser);


// } catch (e) {
//   console.log("Error",e)
// }  
// }

async function testRelationshipQueries(){
  try {
    await createPostsTable()

  } catch (e) {
    console.error("Error",error);
  }
}

// async function testFilterAndSortQueries() {
//   try {
//     //get users with a username starting with z
//     // const zFilteredUsers=await getUsersWhere("username LIKE 'Z%'")
//     // console.log(zFilteredUsers)

//     // const sortedUsers=await getSortedUser('created_at','DESC')
//     // console.log(sortedUsers);

//     const paginatedUsers=await getPaginatedUsers(2,0)
//     console.log(paginatedUsers);
//   } catch (error) {
//     console.log("Error",error);
//   }
// }



async function testAllQueries(){
  // await testBasicQueries()
  // await testFilterAndSortQueries()
   await testRelationshipQueries()
}

testAllQueries()