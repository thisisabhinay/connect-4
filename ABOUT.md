# About Project

## Intro

This demo represents what I envisioned for a fully functioning MVP (Minimum Viable Product) of Connect 4, based on the requirements I was provided. I wanted to build upon a concept that delivers the best possible user experience within the constraints of the limited but core set of requirements.

Furthermore, I wanted to keep the experience light-hearted, arcade-like, and fun; therefore, I went with the look and feel of retro-style video games.

## Home Page

![Home Page](https://raw.githubusercontent.com/thisisabhinay/connect-4/refs/heads/main/assets/1-min.png)

Enter the new game session details, such as the names of both players and the number of rows and columns in the Connect4 board. Upon clicking the "Start New Game" button, the player is redirected to the game session page.

## Game Session

![Game Board](https://raw.githubusercontent.com/thisisabhinay/connect-4/refs/heads/main/assets/2-min.png)

Each game session has a dedicated Connect4 board. I tried to improve the interaction for a better gameplay experience. Instead of inserting a coin at the top and waiting for it to fall into place, I made user interaction more responsive by implementing click-based interaction and limiting it to only valid slots. This results in a faster and smoother gameplay experience.

## Game Mechanics and Win Detection

![Player Indication](https://raw.githubusercontent.com/thisisabhinay/connect-4/refs/heads/main/assets/3-min.png)

Each player is represented by a dedicated character, and a speech bubble appears at the top signaling the active player.

![Win Condition 1](https://raw.githubusercontent.com/thisisabhinay/connect-4/refs/heads/main/assets/4-min.png)
![Win Condition 2](https://raw.githubusercontent.com/thisisabhinay/connect-4/refs/heads/main/assets/5-min.png)
![Win Condition 3](https://raw.githubusercontent.com/thisisabhinay/connect-4/refs/heads/main/assets/6-min.png)

This board checks for all four win conditions:

- Vertical
- Horizontal
- Diagonal
- Reverse Diagonal

![Draw Case](https://raw.githubusercontent.com/thisisabhinay/connect-4/refs/heads/main/assets/7-min.png)

The game also handles the draw case.

## Session Management and Persistence

As you can see from the shareable link, we are now not only persisting the active session but also keeping a record of all game sessions and have made them readily available to play through.

![Share Link](https://raw.githubusercontent.com/thisisabhinay/connect-4/refs/heads/main/assets/8-min.png)
![Session Access](https://raw.githubusercontent.com/thisisabhinay/connect-4/refs/heads/main/assets/9-min.png)

Just copy the link and paste it in any browser to access that game session. Furthermore, users can play multiple games inside each session by resetting the game at the end.

## Future Plans

Why I added "reset gaming session" functionality:

- As stated, I wanted to build the most complete experience possible for the player within these requirements
- A gaming leaderboard is one crucial part of that experience
- I couldn't finish it by the time of making this video as it's not strictly within but overlaps with the core requirements I was given, so I deprioritized it
- I will be picking that up next (this project is not over for me yet)
- After that, I want to create a true multiplayer experience using web sockets where players can engage in text chat while gaming
- This is not on the priority list for now

## Navigation and User Experience Features

![Resume Session](https://raw.githubusercontent.com/thisisabhinay/connect-4/refs/heads/main/assets/10-min.png)
![Resume Button](https://raw.githubusercontent.com/thisisabhinay/connect-4/refs/heads/main/assets/10B-min.png)

Now if you exit back to the home screen from an active session, you can see a "Resume last session" button being shown for quickly navigating to the last played session on the device.

## Backend

![Backend](https://raw.githubusercontent.com/thisisabhinay/connect-4/refs/heads/main/assets/11-min.png)
![JSON Server](https://raw.githubusercontent.com/thisisabhinay/connect-4/refs/heads/main/assets/12-min.png)

The backend is prototyped using JSON server, as you can see our current game session is persisted there as a JSON document.

Additionally, the interface is fully responsive and can be viewed comfortably on tablets and mobile devices.
