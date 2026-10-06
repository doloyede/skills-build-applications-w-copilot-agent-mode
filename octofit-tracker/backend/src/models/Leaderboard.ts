import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true },
  },
  { timestamps: true }
);

const Leaderboard = model('Leaderboard', leaderboardSchema);

export default Leaderboard;
export { Leaderboard };