# Seneca Learning Frontend Tech Test

A knowledge test using toggles to evaluate the user's knowledge of a topic.

## Getting Started

To get started, clone the repo and run the following commands:

```bash
npm install
npm run dev
```

This will run the app on a local server.

## Assumptions

- The user is familiar with the topic and able to answer the questions (no skip functionality)
- The structure of the API response is assumed in mocks/questions.ts, if this was different it'd require a slight rework

## Limitations

- The shuffle feature currently only gurantees the previous question does not appear directly after, so you could see something like Q1, Q2, Q1
- May want to use context down the line for state management, not needed given the current requirements of the app.