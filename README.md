# RESTful-Blog-App-with-backend
I created a blog app using Html CSS JS further more I used Semantic UI framework for styling my app for the backend i used NodeJs Express and MongoDB for my database working of app is define in the README file 

The app is working on the pattern of RESTful routing:
First i created the index page where all my blogs are displayed to the user
Second the NEW route comes in action which re directs the user to a form wheneever the user wants to create a new Blog
Third when the data is entered into form the data is processed and is being send to the blogs page via POST method
Fourth is the SHOW route tha whenever you will click a particular blogs from the blogs page it will first extract the id of that particular blog from the dattabase which you want to show and then by using the id it will render you that blog with its title,image and body content.
Fifth is the edit route when ever you are n a show route you can edit the blog and when you will click the edit button it will redirect you to a form page where the data will be already filled by that part which you want to edit and then you can edit that blog 
Sixth is the update route now you have edited that form submit the request as a put request but as we know that html supports only two methods that are get and post so we use method-override package to overcome this problem we used POST method in the form as we have to submit a request to update that form but moreover we used method as PUT which act as a query string and override will read it 
Seventh and the last is Destroy route whenever you click a particular blog you their will be a button for deleting that route and when ever you submit a delete request it will delete that object from the database.

FOR USER: you can also write html stuff in the blog content text-area like if you want to blod the text yo can use use the bold syntax etc etc.
