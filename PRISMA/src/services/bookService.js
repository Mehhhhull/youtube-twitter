

const {PrismaClient}=require('@prisma/client');
const prisma=new PrismaClient();

async function addBook(title,authorId,publishedData){try {
  const newlyCreatedBook=await prisma.book.create({
    data:{
      title,
      publishedData,
      author:{
        connect:{id:authorId}
      },include:{author:true}
    }
    
  })
  return newlyCreatedBook;
} catch (error) {
  console.error('Error adding book:', error); 
  throw error;
}}

module.exports={addBook};