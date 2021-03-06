# Notes
### This website is being rebuilt in cleaner code with Heroku deployment as a goal. Currently this app can be found at https://github.com/6gav/HerokuLeagueApp

# Preview
### Main Screen
![Search Screenshot](https://i.imgur.com/lPHLWoX.png)

### Profile Screen
![Profile Screenshot](https://imgur.com/AnKmDeC.png)

### In-Game Example
![In-Game Screenshot](https://imgur.com/ovlGnso.png)

# Info
## Technology
This project was made with an express node.js backend server that completes requests to the RiotGames League of Legends API to display information about a player's account. The frontend of the project was made using ReactDOM with React-Router enabled.

## API Key
This project requires that the `API_KEY.txt` has a RiotGames API Key inside of it, this can be grabbed at https://developer.riotgames.com/ 


# Building
## Install
After pulling repo, run `npm install` in the root folder
This will install all of the node modules required to run

## Starting
### Server
After `npm install` has finished, the backend can be started by running `node server.js`
### Interface
The frontend can be started by running `npm start`


## Available Scripts
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
