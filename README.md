# MOVIEHACK

## Description

Be able to browse movies and TV shows. Store favorite movies and TV Shows. 

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **sign in** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
-  **home view** - As a user I can see all the movies and tv shows available so that I can choose which ones I want to watch
- **movie view** - As a user I want to see all the movies available so that I can choose which ones I want to watch
-  **TV show view** - As a user I want to see all the TV shows available so that I can choose which ones I want to watch
- **movie detail** - As a user I want to see the movie or TV show detail 
- **favorite content** - As a user I want to be able to bookmark my favorite movies

## Backlog

List of other features outside of the MVPs scope

- Upload profile picture
- Add Switch from Dark Mode to Light Mode
- Add Movie Recommender System 
- Add social media so user can recommend movie to friends

## ENDPOINTS

ROOT ENPOINT            LANDING PAGE  
SIGNIN ENDPOINT       SIGN-IN PAGE  
SIGNUP ENDPOINT      SIGN-UP PAGE  
HOME ENDPOINT         HOME PAGE  
MOVIE ENDPOINT        MOVIE PAGE  
TVSHOW ENDPOINT    TV SHOW PAGE  
LIST ENDPOINT            LIST PAGE  
INFO ENDPOINT           INFO PAGE

## ROUTES:

Using Restful Guidelines 

- GET / 
  - renders the homepage
- GET /auth/signup
  - redirects to / if user logged in
  - renders the signup form
- POST /auth/signup
  - redirects to / if user logged in
  - body:
    - first name
    - last name
    - email
    - password
- GET /auth/login
  - redirects to / if user logged in
  - renders the login form (with flash msg)
- POST /auth/login
  - redirects to / if user logged in
  - body:
    - email
    - password
- POST /auth/logout
  - body: (empty)

## API

We are using omdbAPI

## Models

User model
 
```
Email: String
password: String
```

Model model

```
Title: String
Year: String
Rated: String
Released: String
Genre: String
Director: String
Writer: String
Actors: String
Plot: String
Language: String
Country: String
Awards: String
Poster: String
Ratings: String
Type: String
``` 

## Links

### Trello

[Link to your trello board](https://trello.com) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)

