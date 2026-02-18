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

async function deleteAuthor(id){
  try {
    const deletedAuthor=await prisma.author.delete({
      where:{id},
      include:{books:true}
    })

    return deletedAuthor
  } catch (error) {
    console.error(error);
    
  }
}

module.exports={addAuthor,deleteAuthor};