[![react](https://img.shields.io/badge/React-61DBFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![typescript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![styledcomponents](https://img.shields.io/badge/styled_components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white)](https://styled-components.com/)

[![github](https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/)
[![docker](https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

# RUNE - Repository Understanding, Navigation and Exploration

This document provides step-by-step instructions on how to run the rune frontend alone. Before running the app, you will need to install its dependencies and set up a `.env` file with a `REACT_APP_GITHUB_API_TOKEN` and an optional `REACT_APP_NEWS_API_TOKEN` field. The tokens will be used for accessing the GitHub API and the News API.

## Disclaimer

> **Warning**
> It is recommended that you have access to GPT-4 via the OpenAI API. GPT-3.5 will probably fail to make correct knowledge graphs from your data.
> Since we still don't have access to GPT-4 OpenAI API, although we made our account a month ago and generated >1$ in billing a week ago,
> the `init_repo`, `update_file` and `add_file` endpoints are still untested. We initialized knowledge graphs manually, through ChatGPT.
> **Here be dragons.**

## Development

If you made changes to the code, do:
1. ```docker build -t patrikkukic/bor:latest .```
2. ```docker push patrikkukic/bor:latest```

## Installation

### Prerequisites

Before proceeding, make sure you have the following installed on your machine:

1.  Node.js (version 14 or above)
2.  npm (Node Package Manager)

### Cloning the repository

First, you need to clone the Git repository that contains the rune app. If you already have the codebase, you can skip this step.

```bash
git clone https://github.com/memgraph/rune.git
```
```bash
cd rune 
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

### Installing and running RUNE

If you want to run RUNE locally, do:

1. ```npm install```


2. ```npm start``` 
    
    This command will compile the TypeScript code and launch the app in your default web browser. If it doesn't open automatically, you can visit `http://localhost:3000` in your browser to access the running app.


If you want to run RUNE via Docker, do:

```bash
docker compose up
```

