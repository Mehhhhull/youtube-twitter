const {PrismaClient}=require('@prisma/client');
const prisma=new PrismaClient();

async function addAuthor(name){
  try {
    const newlyCreatedAuthor=await prisma.author.create({
      data:{
        name
      }
    })
    return newlyCreatedAuthor;
  } catch (error) {
    console.error('Error adding author:', error);
    throw error;
  }
}

module.exports={addAuthor};