# JOURNAL JOTTER

A platform to create personal diaries and schedule appointments with therapists.
Project is deployed to: https://team-feeling-good.gitlab.io/module3-project-gamma/

## DEVELOPERS

-Melody Oberg
-Esra Ceran
-Daniel Ahdoot
-David Plaskett

##Design
Journal Jotter is a wellness application to stay in touch yourself and professional help in one place. Clients can have access to functionalities of being able to lock or share your diary with your therapist, track your mood, and listen to music on Spotify while journaling. Everyone has access to see blog posts posted by our therapists and a link for hotlines. We provide packages for you to purchase to be able to message and create appointments with therapists. Clients can see their available balance displayed on their homepage. As a therapist user, therapists are able to see their available income, see their client's journals if shared, post/edit/delete resources, and message clients.
This project is was built using FastApi for our backend and React/Redux Tool Kit to build our frontend.

##Wireframe
![backend-wireframe](docs/project-wireframe.png)

## How To Run Our Application

Open your docker application and do the following while it starts up:

-Open terminal and git clone: https://gitlab.com/team-feeling-good/module3-project-gamma.
-Change your directory to our project folder by running the command "cd module3-project-gamma"
-In the module3-project-gamma directory, run the following commands one by one: - docker volume create postgres-data - docker volume create pg-admin - docker-compose build - docker-compose up

Open your google chrome browser and type in localhost:3000/ to view our frontend and localhost:8000/docs to see FastAPI backend docs and please wait for the page to load.

## React Routers

<details>
<summary>Landing Page: http://localhost:3000/</summary>
Gives a brief description of Journal Jotter's features.
</details>
<details>
<summary>Signup Page: http://localhost:3000/signup</summary>
Sign up as a client or therapist user
</details>
<details>
<summary>Login Page: http://localhost:3000/login</summary>
Log into your account.
</details>
<details>
<summary>Home Page: http://localhost:3000/home/</summary>
As a client, you'll be able to see list of recent journal entries, upcoming appointments, your current available balance, and a spotify player.
As a therapist, you'll be able to see your client's shared journal entries, upcoming appointments, and your available income.
</details>
<details>
<summary>Profile Page: http://localhost:3000/jotters/</summary>
As a client, you'll have a profile page with the ability to have a profile picture, an about me, an email, and a name that is all editable.
As a therapist, you'll have a profile page requiring your first and last name, email, number, location, certificates/college, profile picture, and an about me.
</details>
<details>
<summary>Journal List Page: http://localhost:3000/journals/</summary>
As a client you're able to see your most recent entries and mood tracker with a search bar functionality and Spotify player. You can create a journal entry, lock, and delete an entry.
As a therapist, you'll be able to see a list of clients' shared entries.
</details>
<details>
<summary>Messages Page: http://localhost:3000/messages/</summary>
As a client, you're able to see a list of recent messages and being able to create a message. It is going to cost you to send a message so you'll be able to see your available balance aftering sending.
As a therapist, you're able to see a list of recent messages and being able to create a message. You are able to see available income.
</details>
<details>
<summary>Appointments Page: http://localhost:3000/appointments/</summary>
As a client, you are able to see a list of upcoming appointments. You can create an appointment selecting a dropdown menu of our therapists. It will cost to create an appointment and available balance will be updated. Clients are able to cancel and reschedule appointments.
As a therapist, you can see a list of upcoming appointments, can cancel appointments, and can see available income.
</details>
<details>
<summary>Resources Page: http://localhost:3000/resources/</summary>
As an unauthorized user, you are able to see a list of resources created by our therapists and a hotline link.
As a client, you are able to see a list of resources and a list of our therapists.
As a therapist, you are able to see a list of resources and therapists, and can view a resource form, edit, and delete.
</details>
<details>
<summary>Pricing Page: http://localhost:3000/pricing/</summary>
As a client, you are able to see a list of packages to select to be able to communicate with therapists and set up appointments.
</details>

## FastAPI Endpoints

<details>
<summary>Account & Authorization</summary>
<details>
<summary>POST /api/accounts/ - Create an account</summary>
{
    "first_name": "dave",
    "last_name": "p",
    "email": "dave@dave.com",
    "type": "client",
    "phone_number": "string",
    "city": "string",
    "state": "string",
    "certificates": "string",
    "graduated_college": "string",
    "profile_picture": "string",
    "about_me": "string",
    "password": "string"
}
</details>
<details>
<summary>POST /token - Login & Logout</summary>
Enter email and password to login and execute to log out.
</details>
<details>
<summary>GET /token - Get Token</summary>
Can execute to get a token after logging in
</details>
</details>

<details>
<summary>Journals</summary>
<details>
<summary>DELETE /journals/{journal_id} - Delete A Journal</summary>
Enter journal ID and execute
</details>
<details>
<summary>PUT /journals/{journal_id} - Edit A Journal</summary>
Enter journal ID and revise body:
{
  "user_id": 0,
  "body": "string",
  "name": "string",
  "date_time": "2023-06-08T08:21:23.498Z",
  "is_private": true,
  "mood": "happy"
}
</details>
<details>
<summary>GET /journals/{journal_id} - Get A Journal's Details</summary>
Enter journal id and execute to get details of a specific journal
</details>
<details>
<summary>GET /journals/ - Get All Journals </summary>
</details>
</details>

<details>
<summary>Messages</summary>
<details>
<summary>DELETE /messages/{message_id} - Delete A Message</summary>
Enter message_id and execute.
</details>
<details>
<summary>PUT /messages/{message_id} - Edit A Message</summary>
Enter message id and revise body:
{
  "user_id": 0,
  "recipient": 0,
  "subject": "string",
  "body": "string",
  "cost": 0
}
</details>
<details>
<summary>GET /messages/{message_id} - Get One Message</summary>
Enter message id and execute
</details>
<details>
<summary>POST /messages - Create A Message</summary>
{
  "user_id": 0,
  "recipient": 0,
  "subject": "string",
  "body": "string",
  "cost": 0
}
</details>
<details>
<summary>GET /messages - Get All Messages</summary>
Execute
</details>
</details>

<details>
<summary>Resources</summary>
<details>
<summary>DELETE /resources/{resources_id} - Delete A Resource</summary>
Enter resource id and execute
</details>
<details>
<summary>PUT /resources/{resource_id} - Edit A Resource</summary>
Enter resource id and revise body:
{
  "title": "string",
  "body": "string",
  "writer": 0,
  "picture": "string",
  "url_link": "string"
}
</details>
<details>
<summary>GET /resources/{resource_id} - Get One Resource </summary>
Enter resource id and execute
</details>
<details>
<summary>CREATE /resources - Create A Resource</summary>
{
  "title": "tester",
  "body": "testing",
  "writer": 1,
  "picture": "string",
  "url_link": "string"
}
</details>
<details>
<summary>GET /resources/ - Get All Resources</summary>
Execute
</details>
</details>

<details>
<summary>Jotters</summary>
<details>
<summary>DELETE /jotters/{jotter_id} - Delete A Jotter</summary>
Enter journal ID and execute
</details>
<details>
<summary>PUT /jotters/{jotter_id} - Edit A Jotter</summary>
Enter jotter ID and revise body:
{
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "type": "client",
  "phone_number": "string",
  "city": "string",
  "state": "string",
  "certificates": "string",
  "graduated_college": "string",
  "profile_picture": "string",
  "about_me": "string",
  "password": "string"
}
</details>
<details>
<summary>GET /jotters/{jotter_id} - Get A Jotter's Details</summary>
Enter jotter id and execute to get details of a specific jotter
</details>
<details>
<summary>GET /jotters/ - Get All jotters </summary>
Execute
</details>
<details>
<summary>CREATE /jotters - Create A Jotter</summary>
{
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "type": "client",
  "phone_number": "string",
  "city": "string",
  "state": "string",
  "certificates": "string",
  "graduated_college": "string",
  "profile_picture": "string",
  "about_me": "string",
  "password": "string"
}
</details>
</details>

<details>
<summary>Appointments</summary>
<details>
<summary>DELETE /appointments/{appointment_id} - Delete An Appointment</summary>
Enter appointment id and execute
</details>
<details>
<summary>PUT /appointments/{appointment_id} - Edit An Appointment </summary>
Enter appointment id and revise body:
{
  "user_id": 0,
  "therapist_id": 0,
  "appointment_date": "2023-06-08",
  "appointment_time": "string",
  "cost": 0
}
</details>
<details>
<summary>GET /appointments/{appointment_id} - Get One Appointment</summary>
Enter appointment id and execute
</details>
<details>
<summary>CREATE /appointments/ - Create An Appointment</summary>
{
  "user_id": 0,
  "therapist_id": 0,
  "appointment_date": "2023-06-08",
  "appointment_time": "string",
  "cost": 0
}
</details>
<details>
<summary>GET /appointments/ - Get All Appointments For User</summary>
Execute
</details>
<details>
<summary>GET /therapistappointments/{therapist_id} - Get All Appointments for Therapist</summary>
Execute
</details>
</details>

## Directories

<details>
<summary>Therapy</summary>

Our therapy directory holds our backend microservice.

In our migrations folder, we create SQL tables for users, appointments, resources, and messages.

In our queries folder, we handle all CRUD operations for each of our models and connect to our database using "pool.py".

In our routers folder, we organize an endpoint for each operation.

We have an authenticator file to handle authentication in our backend.

</details>
<details>
<summary>GHI</summary>

Our GHI directory handles our frontend.

We have a src directory that holds all of our components, stores, and css.

</details>
