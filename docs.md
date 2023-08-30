
# magic-graph web app documentation

This document provides step-by-step instructions on how to run magic-graph frontend alone. Before running the app, you will need to install its dependencies and set up a `.env` file with a `REACT_APP_GITHUB_API_TOKEN` field. The token will be used for accessing the GitHub API.

## Installation

### Prerequisites

Before proceeding, make sure you have the following installed on your machine:

1.  Node.js (version 14 or above)
2.  npm (Node Package Manager)

### Cloning the repository

First, you need to clone the Git repository that contains the magic-graph app. If you already have the codebase, you can skip this step.

```bash
git clone https://github.com/memgraph/magic-graph.git
```
```bash
cd frontend 
```

### Installing dependencies

Once you have the codebase on your local machine you can install the required dependencies using npm:

```bash
npm install
``` 

### Generating the GitHub API Token

To access the GitHub API and get more available requests per hour, you need to create a personal access token. You can create one by following the steps below:

1.  Go to [GitHub Personal Access Tokens](https://github.com/settings/tokens) settings page.
2.  Click on "Generate new token."
3.  Provide a descriptive note for the token (e.g., "magic-graph GitHub API Token").
4.  Click "Generate token" at the bottom.

**Note**: Ensure that you save the generated token in a safe place. It will not be shown again.

### Generating the News API token

To access NewsAPI and retrieve theme-related articles for your repository, you'll need to generate a [NewsAPI](https://newsapi.org/) token. Follow these steps:

1. Go to the NewsAPI website and sign in or create an account.
2. Once logged in, navigate to your account settings or dashboard.
3. Copy your API key.

**Note**: It's important to securely store the generated token. Treat it as a sensitive credential, as it provides access to the NewsAPI. Keep it confidential and avoid sharing it publicly.

### Creating the .env file

In the root directory of your project (frontend folder), create a new file called `.env` (if it doesn't already exist). This file will store your environment variables, including the GitHub API token.

Open the `.env` file in a text editor and add the following line:

```bash
REACT_APP_GITHUB_API_TOKEN=YOUR_GENERATED_GITHUB_TOKEN
REACT_APP_NEWS_API_TOKEN=YOUR_GENERATED_NEWSAPI_TOKEN
```

Replace `YOUR_GENERATED_GITHUB_TOKEN` and `YOUR_GENERATED_NEWSAPI_TOKEN` with the actual tokens you generated in previous steps.

### Starting the development server

With the dependencies installed and the `.env` file configured, you are ready to start the development server and run the app:

```bash
npm start
``` 
This command will compile the TypeScript code and launch the app in your default web browser. If it doesn't open automatically, you can visit `http://localhost:3000` in your browser to access the running app.