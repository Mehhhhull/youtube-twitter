class ApiError extends Error{
  constructor(message="Something went wrong",statusCode,error=[],stack=""){
    super(message)
    this.statusCode=statusCode
    this.data=null,
    this.message=message
  }
}