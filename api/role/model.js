import { Schema, model } from 'mongoose';
import { nanoid } from 'nanoid';

const schema = new Schema({
  _id: { type: String, default: () => nanoid(12) },
  name: String,
}, { timestamps: true });


export default model('Roles', schema, 'roles');