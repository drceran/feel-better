## May 15, 2023

Today we completed our wire frames and have started working on creating issues for the different endpoints and topics we chose to work on.
Today we completed our wire frames and have started working on creating issues for the different endpoints and topics we chose to work on.

## May 16, 2023


## May 17, 2023

I did need to rework through the docker-compose file to really understand what was going on there. I did find out how we can host everything on just plain old 8000 instead of the 8080.

I also found the big mistake I was making with the Beekeeper Studio's default database field.

## May 18, 2023

merged and pushed to main. studying FastAPI and learning how to create routers and queries.

## May 20, 2023

finished building the queries and routers for appointments and messages. Pushed to main!

## May 21, 2023

Added CORS to main and I'm beginning to study encryptions and authorizations for users.

## May 22, 2023

Learning about authentication and how to apply it to the app!

## May 23, 2023

updated appointments and messages with authentication for the user end points.

## May 24, 2023

updated package.json and corrected the node_modules folder. Learned more about Redux

## May 25, 2023

Working on git issues and merge conflicts with the team. Updated Docker compose yaml.

So I've been able to make the Journal List and Form pages, but I wasn't able to implement user authentication/token to allow the logged in user to view entries or use the form because I couldn't carry over the authentication token/cookie... I'll learn that tomorrow! 

## June 2, 2023

I've spent the last few days trying to figure out how to finish the authentications and I finally did it! I also learned how to better manage the state with redux. 
I am also going to follow up on the other endpoints to ensure that they work as intended. 

Spent a lot more time flushing out the rest of the front-end points for Journals and completed them!

## June 5, 2023

Helped Melody with some errors she was having trouble with on the appointments CRUD front end pages. Helped Esra fix an error with the Logout component. Worked with Martey in learning how to apply the "?" in different components to allow components to load only once they have their data. 

## June 6, 2023
worked on trying to make sure that all of the endpoints didn't use the "ID" for said objects in the database. I thought that it was restful api to avoid usage of that information to help be more secure and use less variety in the URLS to show simplicity. Turns out I am wrong and spent a lot of time trying to work on setting the journals up for such an unnecessary URL path. So I only updated the user profile and anything to do with the profile to help keep the user data secure. 

## June 7, 2023
The app was having issues with the data not being cleared after logging out or creating new journal entries. Looks like it is working now!
