5/8/2023 Monday

# Monday

It is the first day our group  became together. We shared our ideas. Melody shared that she is interested in with an idea of journal.
David told us about how he likes to see different kind of sources to help people. So he thinks that if we have  page full of personalized resources it might be good.
I drafted the excalidraw our ideas and shared the link with my teammates so they also can contribute.
We started to draw a draft.

![Screenshot 2023-05-12 at 6.17.16 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ba7c4cbd-c50f-4193-8827-32eb977f717a/Screenshot_2023-05-12_at_6.17.16_PM.png)

At first, we thought it would be great to have the professional and client users separately. But then, we thought we might not handle it.
We also thought that if we have a calendar,, and a user would be able to add tasks and goals, it might be a good guide for people. But we were not able to make a concrete plan with the creating a solid relationship between these features.
For example it was not obvious the relationship between the tasks and goals and the newsfeed.
Also we had this idea of newsfeed but, we didn’t really think about if this is a social web page or not.

We worked a bit more and we created this:

![Screenshot 2023-05-16 at 12.22.24 AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e2909c93-1c9c-4581-bb6a-1c1358cc901e/Screenshot_2023-05-16_at_12.22.24_AM.png)

Melody created a login mockup for us that has a journal entry.


# Tuesday
#5/9/2023 Tuesday

I worked on the ideas about how we can make a cohesive web page last night. I did some research. I received some advice from senior engineers about the architecture of the project. According to the information I gathered, I sketched the project from scratch. I created the models and their properties. I also created front end pages and regarding APIs.

In our first meeting, I shared my ideas.  Basically I told:

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

Today I created my branch in my local. I also  created
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

I did this: try:
        # to be able to use hashed_password parameter
        info.password = hashed_password
        account = accounts.create(info)

Another thing was given in the library:
authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
Even though I added this signing key to the docker-compose.yml file, when I run this code, i am getting an error. So I added value's of the signing key to the MyAuthenticator() as a parameter,it worked. (it might be because I didn't delete all of the things in docker and build and compose up from scratch) I will try this now.

While doing get_token and create_account functions, I was getting the same error. To locate the error, I tried to figure out what part of the project may cause the error, and it was internal server error, so it supposed to related with the models. After putting a lot of print statements, I located the reason of the error. I changed the result = db.execute(""" SELECT  -all-""")  all instead of selecting the required (NOT NULL) parameters and it worked. But we cannot ask user to put all the information for just signup. I need to figure out that part.

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
