import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    profile: {
      age: Number,
      fitnessGoal: String,
    },
  },
  { timestamps: true }
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true },
  },
  { timestamps: true }
);

const workoutSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
  },
  { timestamps: true }
);

export const User = model('User', userSchema);
export const Team = model('Team', teamSchema);
export const Activity = model('Activity', activitySchema);
export const LeaderboardEntry = model('LeaderboardEntry', leaderboardSchema);
export const Workout = model('Workout', workoutSchema);