

const {createUserTable}=require('./concepts/basic-queries')

//test basic quaries
async function testBasicQueries(){
try {
  // await createUserTable()
} catch (e) {
  console.log("Error",e)
}  
}

async function testAllQueries(){
  await testBasicQueries()
}

testAllQueries()