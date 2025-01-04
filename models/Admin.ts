import { Schema, model, models } from 'mongoose';

const adminSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export default models.Admin || model('Admin', adminSchema);
