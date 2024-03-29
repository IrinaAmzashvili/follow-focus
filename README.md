# Follow Focus

<!-- *By Irina Amzashvili - [visit Follow Focus](https://follow-focus.herokuapp.com/)* -->

*[Wiki Pages](https://github.com/IrinaAmzashvili/follow-focus/wiki)*

**Table of Contents**
- [Summary](#Summary)
- [Structure Overview](#Structure-Overview)
- [Primary Features](#Primary-Features)
- [Conclusion and Future Features](#Conclusion-and-Future-Features)

![Banner](https://user-images.githubusercontent.com/79552414/128668760-93467036-2104-4b79-89c0-0935f4f4fe32.png)

## Summary

Follow Focus is a platform where users can access a wide variety of video tutorials and learn how to dance a selection of swing dances from them.

This project was a collaboration between myself and my sister, Natalia Eristavi. We are the sole content creators as well as the builders of the site, myself as the developer and Natalia as the graphic designer.

On this site, users may:

- Create an account, Log in, and Log out
- Experience the site without signing up by logging in as a demo member or a demo content creator
- Discover video dance tutorials to learn from
- Navigate to the `/tutorials` page to view all available tutorials with the ability to filter by dance style or level
- Navigate to a single tutorial page to watch the video, read comments, and create, edit, and delete their own comments
- Navigate to the "About Us" page to learn about the Follow Focus organization and its mission statement

Additionaly, super users have the ability to create, update, and delete video tutorials.

## Structure Overview
The backend of this app was built using Python and Flask integrated with SQLAlchemy to interact with a postrgreSQL database. The ReSTful convention was followed in all backend API routes. The frontend of this app was built using React and Redux. React allows for quick rerendering without requiring pages to refresh and Redux manages the application's state.

### Libraries and Technologies Used
- Python
- Flask
- SQLAlchemy
- Alembic
- PostgreSQL
- Javascript
- React
- Redux
- react-router-dom
- react-usestateref
- react-scripts
- react-player
- react-waypoint
- react-router-hash-link
- react-icons
- react-lottie
- redux-logger
- redux-thunk

## Primary Features
### User Login and Sign Up
<img src="https://user-images.githubusercontent.com/79552414/128668183-a94670cf-7e8c-4b4a-9fe9-1c58ed6c07a2.png" alt="signup modal" width="400"/>

### Splash Page
The splash page is display for logged out users and unregistered members. It displays an embedded video using the React Player library providing the user with a delightful welcome experience.

<img src="./FF-splash-page-gif.gif" alt="splash page" width="800"/>

### Tutorials Page
All tutorials available to the logged in user are displayed on the tutorials page with pagination and a search feature included. Only 16 videos are displayed at a time and the user can navigate to the next and previous pages of tutorials if applicable. Users may use the search bar to search for videos by title.
<img src="https://user-images.githubusercontent.com/79552414/128669049-edc75243-891f-4295-845a-2410b685da72.png" alt="tutorials page" width="800"/>

The backend query to get tutorials from the database takes into account any filter selections and search text, orders the resources by date, and only returns 16 tutorials at a time for faster frontend loading.

<img src="https://user-images.githubusercontent.com/79552414/133024870-6dd9a4a6-833a-4e0c-8e8e-00be665f0897.png" alt="backend query code" width="500"/>


### Filter Tutorials
Tutorials can be filtered by dance styles and levels. If no options are selected, the "All" option is automatically checked.

<img src="https://user-images.githubusercontent.com/79552414/128669256-8004cac2-8cbd-4f06-9021-3f9eb9afba6f.png" alt="filter" width="300"/>

<img src="https://user-images.githubusercontent.com/79552414/133024659-566a976e-cd9b-461f-876b-b41514dba384.png" alt="filter code" width="700"/>


### Individual Tutorial Page
Users can navigate to a specific tutorial page to watch the tutorial as well as create, read, update, and delete comments.

<img src="https://user-images.githubusercontent.com/79552414/128669510-4a2aec0d-529a-44a9-b4f7-da0285c8bfa0.png" alt="tutorail page" width="800"/>

<img src="https://user-images.githubusercontent.com/79552414/128669672-a5001629-a925-42b5-a3ca-8532724c8a44.png" alt="commments" width="800"/>


### Content Creator
Content creators have the ability to create, edit, and delete tutorials.

<img src="https://user-images.githubusercontent.com/79552414/133026101-e7c2a2d5-56df-40fc-8d7b-c85da69d3601.png" alt="edit modal" width="600"/>

<img src="https://user-images.githubusercontent.com/79552414/128669891-470b7943-b347-4678-8a26-c502361c5710.png" alt="delete confirmation modal" width="400"/>

## Conclusion and Future Features
It was a special treat getting to work with my sister on this site. We have been collaborating as dancers for about a decade now but it has always been a dream of ours to collaborate in a way that utilizes our technical skills.

**Next Steps:** We will be continuing to work on this project until it is production ready at which time it will be launched for public use. To get to that point, I will be incorporating a payment system using stripe or paypal libraries as well as creating a monthly user subscription feature.
