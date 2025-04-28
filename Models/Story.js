// models/Story.js
import mongoose from 'mongoose';

const storySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who posted the story
    image: { type: String, default: '' }, // Image path
    video: { type: String, default: '' }, // Video path
    caption: { type: String, default: '' }, // Caption for the story
    expired_at: { type: Date, required: true }, // Expiration time of the story
  },
  { timestamps: true }
);

const Story = mongoose.model('Story', storySchema);

export default Story;
