const bookService=require('../services/bookService');

exports.addBook=async(req,res)=>{
  try {
    const {title,publishedDate,authorId}=req.body;
    const book=await bookService.addBook(title,new Date(publishedDate),authorId);

    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({error:error.message})
  }
}

exports.getAllBooks=async(req,res)=>{
  try {
    const books=await bookService.getAllBooks()
    res.json(books)
  } catch (error) {
    res.status(400).json({error:error.message})
  }
}

exports.getBookById=async(req,res)=>{
  try {
    const book=await bookService.getBookById(parseInt(req.params.id))//..

    if(book){
      res.json(book)
    } else{
      res.status(400).json({message:"Book not found!!"})
    }
  } catch (error) {
    res.status(400).json({error:error.message})
  }
}

exports.updateBook=async(req,res)=>{
  try {
     const {title}=req.body;
    const book=await bookService.updateBook(parseInt(req.params.id),title)

    req.json(book)
  } catch (error) {
    res.status(400).json({error:error.message})
  }
}

exports.deleteBook=async(req,res)=>{
  try {
    await bookService.deleteBook(parseInt(req.params.id))
    res.json({message:"Book Deleted"})
   
  } catch (error) {
    res.status(400).json({error:error.message})
  }
}