import { Schema, model } from 'mongoose';
import { nanoid } from 'nanoid';

const schema = new Schema({
  _id: { type: String, default: () => nanoid(12) },
  date: { type: Date, default: Date.now},
  nik: {type: String, unique: true},
  name: String,
  address: String,
  rt: Number,
  rw: Number,
  kelurahan: String,
  kecamatan: String,
  diagnosa: String,
  rsTujuan: String
}, { timestamps: true });


export default model('RujukanProvinsi', schema, 'rujukanProvinsi');