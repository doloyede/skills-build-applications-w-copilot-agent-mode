import express from 'express';
import './config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';
const allowedOrigins = new Set(['http://localhost:5173', 'http://127.0.0.1:5173']);
if (codespaceName) {
  allowedOrigins.add(`https://${codespaceName}-5173.app.github.dev`);
}

app.use((request, response, next) => {
  const origin = request.headers.origin;
  if (origin && allowedOrigins.has(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Vary', 'Origin');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }
  if (request.method === 'OPTIONS') {
    response.sendStatus(204);
    return;
  }
  next();
});

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', baseUrl });
});

app.get('/api/users/', async (_request, response, next) => {
  try {
    const users = await User.find().sort({ name: 1 });
    response.json(users);
  } catch (error) {
    next(error);
  }
});

app.get('/api/teams/', async (_request, response, next) => {
  try {
    const teams = await Team.find().populate('members').sort({ name: 1 });
    response.json(teams);
  } catch (error) {
    next(error);
  }
});

app.get('/api/activities/', async (_request, response, next) => {
  try {
    const activities = await Activity.find().populate('user').sort({ completedAt: -1 });
    response.json(activities);
  } catch (error) {
    next(error);
  }
});

app.get('/api/leaderboard/', async (_request, response, next) => {
  try {
    const leaderboard = await LeaderboardEntry.find().populate('user').sort({ rank: 1 });
    response.json(leaderboard);
  } catch (error) {
    next(error);
  }
});

app.get('/api/workouts/', async (_request, response, next) => {
  try {
    const workouts = await Workout.find().sort({ difficulty: 1, name: 1 });
    response.json(workouts);
  } catch (error) {
    next(error);
  }
});

app.use(
  (error: Error, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
);

app.listen(port, () => {
  console.log(`OctoFit API listening at ${baseUrl}`);
});