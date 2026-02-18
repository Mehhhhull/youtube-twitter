

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

async function getAllBooks(){
  try {
    const books=await prisma.book.findMany({
      include:{author:true}
    })
    return books;
  } catch (error) {
    throw error;
  }
}

async function getBookById(id) {
  try {
    const book=await prisma.book.findUnique({
      where :{id},
      include:{author:true}
    })
    if(!book){
      throw new Error('Book not found');
    }
    return book;
  } catch (error) {
    throw error;
  }
  
}

async function updateBook(id,newTitle){
  try {
    // const book=await prisma.book.findUnique({
    //   where :{id},
    //   include:{author:true}
    // })
    // if(!book){
    //   throw new Error('Book not found');
    // }

    // const updatedBook=await prisma.book.update({
    //   where:{id},
    //   data:{title:newTitle},
    //   include:{author:true}
    // })
    // return updatedBook;
    
    //using transactions
    const updatedBook=await prisma.$transaction(async(prisma)=>{
      const book=await prisma.book.findUnique({where:{id}})
      if(!book){
         throw new Error('Book not found');
      }

      return prisma.book.update({
        where:{id},
        data:{
          title:newTitle,
        },
        include:{
          author:true
        }
      })
    })

    return updatedBook;
  } catch (error) {
    throw error;
  }
}

async function deleteBook(id){
  try {
    const deletedBook=await prisma.book.delete({
      where:{id},
      include:{author:true}
    });

    return deleteBook
  } catch (error) {
    throw error
  }
}


module.exports={addBook,getAllBooks,getBookById,updateBook,deleteBook};