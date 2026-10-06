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

const User = model('User', userSchema);

export default User;
export { User };