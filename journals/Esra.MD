5/8/2023 Monday

# Monday

It is the first day our group became together. We shared our ideas. Melody shared that she is interested in with an idea of journal.
David told us about how he likes to see different kind of sources to help people. So he thinks that if we have page full of personalized resources it might be good.
I drafted the excalidraw our ideas and shared the link with my teammates so they also can contribute.
We started to draw a draft.

![Screenshot 2023-05-12 at 6.17.16 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ba7c4cbd-c50f-4193-8827-32eb977f717a/Screenshot_2023-05-12_at_6.17.16_PM.png) !/Users/esraceran/module3-project-gamma/visuals for journals/Screenshot 2023-05-12 at 6.17.16 PM.png

At first, we thought it would be great to have the professional and client users separately. But then, we thought we might not handle it.
We also thought that if we have a calendar,, and a user would be able to add tasks and goals, it might be a good guide for people. But we were not able to make a concrete plan with the creating a solid relationship between these features.
For example it was not obvious the relationship between the tasks and goals and the newsfeed.
Also we had this idea of newsfeed but, we didn’t really think about if this is a social web page or not.

We worked a bit more and we created this:

![Screenshot 2023-05-16 at 12.22.24 AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e2909c93-1c9c-4581-bb6a-1c1358cc901e/Screenshot_2023-05-16_at_12.22.24_AM.png) !/Users/esraceran/module3-project-gamma/visuals for journals/Screenshot 2023-05-16 at 12.22.24 AM.png

Melody created a login mockup for us that has a journal entry.

# Tuesday

#5/9/2023 Tuesday

I worked on the ideas about how we can make a cohesive web page last night. I did some research. I received some advice from senior engineers about the architecture of the project. According to the information I gathered, I sketched the project from scratch. I created the models and their properties. I also created front end pages and regarding APIs.

In our first meeting, I shared my ideas. Basically I told:

“3 concerns with the current design:
I think what we did was great but there are some questions in my mind, what would be the relationship in between the models.

I think, the models need to complement each other.

We have journal, we have calendar entry, but the models are unrelated with each other.

Secondly, all of the apps solve a problem they all start with  one main aim.

Fb: find your friends,

Twitter: share your ideas with the world,

Youtube, share videos, etc.

When I was thinking about what problem our app is trying to solve. I thought we are trying to help people to have a better mental health. To help people have better mental health, they need some professional help.

Third, since this is our final project, we need to create something coherent and comprehensive.  If we would do this, we will show our experience in a good way and hopefully impress some potential employers.”

![Screenshot 2023-05-16 at 12.23.12 AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/cd160ff1-6093-4c6f-bd1c-a5346eef8afe/Screenshot_2023-05-16_at_12.23.12_AM.png)
!/Users/esraceran/module3-project-gamma/visuals for journals/Screenshot 2023-05-16 at 12.23.12 AM.png

After some discussion, David also offered some ideas about how he envisioned the project. We discussed on his sketch. Eventually, we voted which project we are going to work on. We decided to move on with my design.

# Wednesday

## 5/10/2023

Today we started to work on wireframing. Melody invited us to Figma. She even created the wireframes! She is very talented.

# Thursday

## 5/11/2023

After our lecture, we decided to use PostgreSQL. Also, we started to write API endpoints for the each wireframe.

# Friday

## 5/12/2023

Today we are working on API endpoints. I realized that we needed to create user stories for each pages. So we started to do that too.

We talked a bit about MVP (minimum viable product) and stretch goals.
Also we talked about how to do the multiple user setup. Haven’t make a decision yet.

We started to create issues. Melody made us a google document page.

# Monday

## 5/15/2023

I worked on our issues and API endpoints. I worked on wireframes. I edited our endpoints and wireframes according to the feedback we received from instructors.

# Tuesday

## 5/16/2023

Today I created my branch in my local. I also created
sql table for the user ORM.

I connected to the database.

# Wednesday

## 5/17/2023

I connected to the beekeper. I also work on query and routers for get all endpoint.

# Thursday

## 5/18/2023

Today I worked on my get and put statements.

I practiced how to debug to figure out an error.

# Sunday

## 5/22/2023

Today I completed all of the endpoints for jotter ORM. I discovered pgAdmin.

# Monday

## 5/23/2023

Today I started back end authentication. I added a new column to our user table named "password". And I completed the endpoints for get post create for token login and logout.
At the beginning I created a file named queries/accounts.py as is suggested in Curtis's video. But then I realized that a lot of models were already in queries/jotters.py
So I deleted that one. Whenever I need to create a new model, I used the current ones and inherited new models from them.

There were two errors that I keep getting. One related with union types. The way fastapi works with several types. I overcome with that one by reading about it and ended up using Union using both None and the other Model or Error and the other model .

Also another thing was, create(info, hashed_password)
I had to create a new variable named "plain_password" plain_password = info.password and with that I was able to use the hashed_password parameter and also plain password parameter in the same function.
(To swap two variable in python (a,b => b,a)
c=a,
a=b,
b=c,
)

And the second one was passing two parameters in one model. The library gave us a hash_password() method and it was getting two parameters, both User model and password. Such as: try:
account = repo.create(info, hashed_password)

I did this: try: # to be able to use hashed_password parameter
info.password = hashed_password
account = accounts.create(info)

Another thing was given in the library:
authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
Even though I added this signing key to the docker-compose.yml file, when I run this code, i am getting an error. So I added value's of the signing key to the MyAuthenticator() as a parameter,it worked. (it might be because I didn't delete all of the things in docker and build and compose up from scratch) I will try this now.

While doing get_token and create_account functions, I was getting the same error. To locate the error, I tried to figure out what part of the project may cause the error, and it was internal server error, so it supposed to related with the models. After putting a lot of print statements, I located the reason of the error. I changed the result = db.execute(""" SELECT -all-""") all instead of selecting the required (NOT NULL) parameters and it worked. But we cannot ask user to put all the information for just signup. I need to figure out that part.

And I am planning to work on protected endpoints.

# Tuesday

##5/23/2023

Today, I created a new branch, and deleted my old branch. I also made some minor changes in the code that I wrote yesterday. After I recreate volumes and docker containers, the errors that I took was gone. I did protected endpoints for jotters.

# Wednesday

## 5/24/2023

I had the docker issues, and they were because I haven't restart my docker after I changed two things:
The first one is: Changing the version of package.json/ to be aligned with the docker-compose.yml/ image: node:lts-bullseye (basically we googled to see what is the compatible version for this node)
The second one is the migrations/003_resources.py/

After I recreate the volumes and restart the docker, it worked.

I will work on front end today. I will start with create a new jotter page.

# Thursday (5/25/2023)

Today I created signup form with redux and tailwind. Users are able to create an account from front-end. I need to edit a bit, because first; noone wants to fill a long form, so only things need to be required are: email and password. Once we got those information, user supposed to be login and from profile page- they can fill all the fields they want to show. Second; balance should be default 0, and we cannot ask that to a user. I realized that when looking at beekeper. I need to change that field's features from not null to null. Third; I don't check if the user using an existing email.
As far as I understand;baseQuery function arguments has a Type of request (query or mutation). And if I would change it from query to mutation, redux will copy the data and in that way, when a user type the email/ password information, redux will be able to remember and present those information in front-end. I am not 100% sure. I need to do more research on that. For now, I went with query, because it was what Melody did for login.

Also we practiced a lot with git today as a group with Martey.
What I learn about git is: first; we should never ever publish our broken code to main. If we do that, it will effect all the team. It is very time consuming. Second, there is only two reason can be there to pull from main: 1. you are done with your feature and you would like to merge but before you want to pull. 2. What your teammate made heavily effect your job, so you want to see the latest changes. That being said, (as I did today) before you complete your job, you should never ever send a merge request to the origin/main.

Here is a steps of our new workflow:
/Users/esraceran/module3-project-gamma/visuals for journals/Screenshot 2023-05-25 at 3.24.46 PM.png

# Tuesday (5/30/2023)

Today I worked on several things at the same time. Working on several things at the same time was a different approach. I would say, as long as the features you work on are related to each other, it makes sense.

I redid the navbar, as the styling was poor. I used tailwindcss, and I have to admit, it was impressive. So there are two very cool code snippets I wrote that I am very proud of; first one retrieves logged in user data, and with an if else statement, if a user is logged in, we show the profile page and logout feature. And if a user is not loggedin, we show login and setup.
The second code snippet is, a for loop for navigation, I used setNavigation to loop through the different features of a navigation element, in that way, when a developer want to add a new label in the navbar, all it needs to do is creating an object inside of the for loop I wrote.

I also did the profile page and logout feature.

Along with them I did was able to retrieve the data in the nav so that I use user's data for greetings them as it shows "Welcome user_name" in the navbar.

# Tuesday (6/10/2023)

After working on since Friday, today I have finally deployed our project. It is on air! Last week, I also created user profile page. In addition to that, I created
a form for editing profile page. It's been challenging to show already put information as placeholder. After I manage that, another challenge was updating given information in other parts of the project. Like when a user change their first_name, it was not showing up in the navbar unless I reload the page.
Another thing I needed to fix was by using Optional and checking the NULL/ NOT NULL fields, aligning the tables and the backend. In addition to that, my form is showing different fields in accordance with user type.
After those are done, I went over the tables. It turns out we needed to implement better understanding to the table. Some of the # "Down" SQL statements were broken, I fixed them. I developed my understanding about migrations and how they works. According to my research; we are supposed to never change current tables. The best practice suggests that migrations works from beginning to end by order, and every time a new table is added, the newest one is effective. But for some reason if we would like to go back to the older version, all we need to use down sql statements.
For the deployment, I cleaned our project's code.
I will work on unit testing and the balance-cost-packages functionality. When I am done with that, I will work on beautifying our project.

# Wednesday (6/11/2023)

Yesterday I worked on the backend for the packages/buy, I completed the back end, tested in the bumblebee. It was working. And today, I worked on the front end. I tested and it went well. I wrote my first test. wow. I used tailwindcss template for pricing stuff, that Daniel created last week. By using a mutation I send a request to the backend, and with the response, I can buy a package. And if we are in the process of the getting the data, the button is getting disabled. I tested using time.sleep(20), tested in the bumblebee. According to the message comes from backend, if user successfully bought the message, they are getting a notification saying: "your current balance is: this amount"
I wanted to implement the purchasing part, too. So I started to test it in the messages, but create message was giving me error. My teammate and I are gonna work on that. And once I pull from main, I will test appointments in the frontend too.

# Thursday (6/12/2023)

Today I worked fixed three things:

- [ ] Appointment page- cancel feature- after cancel it does not update the current page-
- [ ] Balance- with message and appointment- if we cannot create the new appointment or message bc of balance is not enough- the page will let us know with an alert.
- [ ] Unit tests does not success in gitlab

For the unit tests, we made some changes of the versions of the libraries we use.
For the state management, I deep dived into providetags/ invalidatetags features. I also added the current balance to the navbar, so that users can see the current balance whenever they need. There was one really helpful post in stackoverflow, it shows how you can use the tags in between the different files, I adapted that code suggested in the post, and with that I was able to fix the appointment and messages cost issues. also I fixed my friend's code, as older version was not correctly works for cacheing the data for appointments and messages. I also fixed the frontend code for messages, as it is not supposed to ask the cost of a message to the user.

I though everything was working perfectly, without error, however when I woke up, I tested again the code I pulled from main, and I encountered three issues:

- [x] When you buy a package, it is not updating the balance in navbar
- [x] Message cost - I need to bring the message cost from message.cost
- [x] You need to click twice to take you to the list of messages as you create msg
      For the first one, I used invalidate tag functionality, and with token is being invalidating, the issue is fixed. For the second one, I reread my code, since I already defining the cost of the message/ appointment in the backend, in the frontend, I only needed a value, since it is defined as not null in the db and the model. So in the front end, I only give the predefined costs of the messages/ appointments.

For the third one, I edit my friend's code, and I move the if x.isSuccess- do this, part to the outside of the handleSubmit function.

Today, I learned more about the correct way for CI/CD process from Rosheen. She mentioned for us to success for the deployment process, a person needs to test the project in the cloud after each MR. I reset our project a few times as we all created MRs today.

We also encountered issues related w/ different operating systems. It turns out cloud can act different in different environments. Our project was not very responsive in Windows and in incognito.
