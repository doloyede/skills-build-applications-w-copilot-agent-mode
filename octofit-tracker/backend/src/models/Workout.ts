import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
  },
  { timestamps: true }
);

const Workout = model('Workout', workoutSchema);

export default Workout;
export { Workout };