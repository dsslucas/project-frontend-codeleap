# Project for Junior Frontend Engineer - CodeCamp program

Program avaliable at [this link](https://codeleap.notion.site/Job-openings-be9610b2d137433088a7aafdeaad08b4?p=1882cc4e78394bc28656437a928582e2&pm=s)

[Link of project deployed at Vercel](https://project-frontend-codeleap.vercel.app/signup)

## What was used
- React.js
- Material UI
- Redux.js (and React-Redux)
- Axios (for backend requisitions)
- Moment (lib for show the time)
- CSS3

## How start?
- Clone this repository using `git clone`
- Access the terminal and type `npm i` for install the dependencies
- After, type `npm start`

## How it works:
- The user type your username
- The user type the title and content, and click in "Create"
- With, the user can edit and delete the post

## Improvements
- If the user press F5, the website redirect the user for the Sign In page
- Button colors change the color if the user type some thing on Inputs
- Responsivity for smaller screens

## Result

### Mobile devices (width less than 768px)

![Pages](/src/assets/mobile/page.jpg)

### Desktops (width more than 768px)
Sign In.

![Sign In](/src/assets/desktop/start.png)

Home page with POST and GET.

![Home page with POST and GET](/src/assets/desktop/post%20and%20get.png)

Edit the post published only by user.

![Edit the post](/src/assets/desktop/edit.png)

Delete the post published only by user.

![Delete the post](/src/assets/desktop/delete.png)

Alert if the user press F5 at Homepage. Doing this, the username will be released and making it impossible to use POST, DELETE and PATCH requests.

![If the user update the page at Home](/src/assets/desktop/error.png)