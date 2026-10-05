import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      Workout.deleteMany({}),
      User.deleteMany({}),
    ]);

    const [maya, jordan, priya, theo] = await User.insertMany([
      {
        name: 'Maya Johnson',
        email: 'maya.johnson@example.com',
        profile: { age: 29, fitnessGoal: 'Run a sub-25-minute 5K' },
      },
      {
        name: 'Jordan Lee',
        email: 'jordan.lee@example.com',
        profile: { age: 34, fitnessGoal: 'Build strength for climbing' },
      },
      {
        name: 'Priya Shah',
        email: 'priya.shah@example.com',
        profile: { age: 27, fitnessGoal: 'Improve endurance and mobility' },
      },
      {
        name: 'Theo Martinez',
        email: 'theo.martinez@example.com',
        profile: { age: 41, fitnessGoal: 'Train consistently three days a week' },
      },
    ]);

    await Team.insertMany([
      { name: 'Cardio Crew', members: [maya._id, priya._id] },
      { name: 'Strength Squad', members: [jordan._id, theo._id] },
    ]);

    await Activity.insertMany([
      {
        user: maya._id,
        type: 'Outdoor run',
        durationMinutes: 36,
        caloriesBurned: 340,
        completedAt: new Date('2026-09-28T14:30:00.000Z'),
      },
      {
        user: jordan._id,
        type: 'Bouldering session',
        durationMinutes: 75,
        caloriesBurned: 510,
        completedAt: new Date('2026-09-29T18:15:00.000Z'),
      },
      {
        user: priya._id,
        type: 'Spin class',
        durationMinutes: 45,
        caloriesBurned: 420,
        completedAt: new Date('2026-09-30T12:00:00.000Z'),
      },
      {
        user: theo._id,
        type: 'Strength training',
        durationMinutes: 50,
        caloriesBurned: 380,
        completedAt: new Date('2026-10-01T16:45:00.000Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      { user: jordan._id, points: 1240, rank: 1 },
      { user: maya._id, points: 1185, rank: 2 },
      { user: priya._id, points: 1040, rank: 3 },
      { user: theo._id, points: 920, rank: 4 },
    ]);

    await Workout.insertMany([
      {
        name: '5K Pace Builder',
        description: 'Intervals and tempo efforts for runners improving race pace.',
        difficulty: 'Intermediate',
        durationMinutes: 42,
      },
      {
        name: 'Climber Core Circuit',
        description: 'Grip, pull, and core work for climbing strength.',
        difficulty: 'Advanced',
        durationMinutes: 38,
      },
      {
        name: 'Mobility Reset',
        description: 'Low-impact mobility flow for recovery days.',
        difficulty: 'Beginner',
        durationMinutes: 25,
      },
      {
        name: 'Three-Day Strength Base',
        description: 'Full-body foundational lifts for weekly consistency.',
        difficulty: 'Intermediate',
        durationMinutes: 55,
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
