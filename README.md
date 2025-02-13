# News Aggregator

A React.js and TypeScript-powered news aggregator that pulls articles from multiple sources, allowing users to search, filter, and personalize their news feed. This project follows best development practices and is fully containerized with Docker.

## Project Features

- Article Search & Filtering – Users can search for articles by keyword and filter them by date, category, and source.

- Personalized News Feed – Users can customize their feed by selecting preferred sources, categories, and authors.

- Responsive Design – Optimized for mobile and desktop viewing.

- Containerized with Docker – Easily deployable with a Dockerfile and clear setup instructions.

## Data Sources
This project integrates with various news APIs, including:

- [NewsAPI](https://newsapi.org/) 
- [The Guardian API](https://open-platform.theguardian.com/)
- [New York Times API](https://developer.nytimes.com/)

## Dependencies & Useful Documentation

- [Node.js and npm](https://nodejs.org/en/)(Would recommend using [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) to manage)
  - Node.JS = 18.16.0 
  - npm = 9.6.7
- [React JS](https://reactjs.org/)
- [Docker](https://www.docker.com/) :whale:

## Installing and Starting the Project

If this is your first time installing and running BITE, here's a step-by-step guide that should help you along:

1.  Clone the project from GitHub using SSH into your source folder: `git clone https://github.com/tinashegabriel/news-aggregator.git`
2.  Change directories to News Aggregator root directory from source folder where you cloned: `cd news-aggregator`
3.  Run `nvm use` to switch to the correct node version v18.16.0
4.  Run `npm i` in the root folder. If you get errors Run `npm ci --legacy-peer-deps` or `npm i --legacy-peer-deps`
5.  Run `npm run build` in the root folder.

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the docker console.


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
