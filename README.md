# Follow Focus

*By Irina Amzashvili - [visit Follow Focus](https://follow-focus.herokuapp.com/)*

*[Wiki Pages](https://github.com/IrinaAmzashvili/follow-focus/wiki)*

**Table of Contents**
- [Summary](#Summary)
- [Structure Overview](#Structure-Overview)
- [Primary Features](#Primary-Features)
- [Conclusion and Future Features](#Conclusion-and-Future-Features)

![Banner](https://user-images.githubusercontent.com/79552414/128668760-93467036-2104-4b79-89c0-0935f4f4fe32.png)

## Summary

Follow Focus is a subscription based site where users can learn how to dance a variety of swing dances. Once signed up, users gain access to a wide range of video tutorials they can watch and learn from. Users may:
- Create an account, Log in, and Log out
- Experience the site without signing up by logging in as a demo member or a demo content creator
- Discover video dance tutorials to learn from
- Navigate to the `/tutorials` page to view all available tutorials with the ability to filter by dance style or level
- Navigate to a single tutorial page to watch the video, read comments, and create, edit, and delete their own comments
- Navigate to the "About Us" page to learn about the Follow Focus organization and its mission statement

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
![signup](https://user-images.githubusercontent.com/79552414/128668183-a94670cf-7e8c-4b4a-9fe9-1c58ed6c07a2.png)

### Splash Page
The splash page is display for logged out users and unregistered members.
![Splash Page](https://user-images.githubusercontent.com/79552414/128668141-d620837c-5064-4cd5-9806-d55e40ff0c71.png)

### Tutorials Page
All tutorials available to the logged in user are displayed on the tutorials page. Only 16 videos are displayed at a time and the user can navigate to the next and previous pages of tutorials if applicable. Users may use the search bar to search for videos by title.
![Tutorials Page](https://user-images.githubusercontent.com/79552414/128669049-edc75243-891f-4295-845a-2410b685da72.png)
![image](https://user-images.githubusercontent.com/79552414/128669154-706c4660-9ac2-4cbe-85b4-a04c43c7e558.png)

### Filter Tutorials
Tutorials can be filtered by dance styles and levels. If no options are selected, the "All" option is automatically checked.
![filter](https://user-images.githubusercontent.com/79552414/128669256-8004cac2-8cbd-4f06-9021-3f9eb9afba6f.png)

### Individual Tutorial Page
Users can navigate to a specific tutorial page to watch the tutorial as well as create, read, update, and delete comments.
![tutorial page](https://user-images.githubusercontent.com/79552414/128669510-4a2aec0d-529a-44a9-b4f7-da0285c8bfa0.png)
![comments](https://user-images.githubusercontent.com/79552414/128669672-a5001629-a925-42b5-a3ca-8532724c8a44.png)

### Content Creator
Content creators have the ability to create, edit, and delete tutorials.

![create](https://user-images.githubusercontent.com/79552414/128669857-409a9e83-2b21-45ff-b52c-fc2c364fb00d.png)
![delete](https://user-images.githubusercontent.com/79552414/128669891-470b7943-b347-4678-8a26-c502361c5710.png)

## Conclusion and Future Features
<!-- Follow Focus is a collaboration between myself and my sister, Natalia Eristavi. -->
**Next Steps:**
- subscription tiers
- monthly user subscription
- payment system using square or paypal libraries
