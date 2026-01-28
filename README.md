DATABASE-> use try-catch or promices in database cause problem can come anytime, 
DB is always is in other continent , use async await 


Access Token is short lived and is not stored in DB.
Refresh  Token is long lived ,stored in db.
When access token expires , the frontend sends the refresh token to the backend to validate user(login), once again!!!!