import Rujukan from './model.js';

export const getAll = async (req, res) => {
  try {
    const rujukan = await Rujukan.find({});
    res.status(200).send(rujukan);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const create = async (req, res) => {
  try {
    const newRujukan = new Rujukan(req.body);

    const rujukan = await newRujukan.save();

    res.status(200).send(rujukan);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send('This NIK is already registered, please input another');
    } else {
      res.status(500).send(error);
    }
  }
};

export const remove = async (req, res) => {
  try {
      await Promise.all(
          req.body.map(async(v) => {
              await Rujukan.findOneAndDelete({ _id: v._id })
          })
      );
      res.status(200).send(req.body);
  } catch (error) {
      res.status(500).send(error);
  }
};

export const update = async (req, res) => {
  try {
    const { 
      date, 
      nik, 
      name,
      address,
      rt,
      rw,
      kelurahan,
      kecamatan,
      diagnosa,
      rsTujuan
    } = req.body;
    const rujukan = await Rujukan.findById(req.params.id);
    Object.assign(rujukan,{
      date, 
      nik, 
      name,
      address,
      rt,
      rw,
      kelurahan,
      kecamatan,
      diagnosa,
      rsTujuan
    });

    const item = await rujukan.save();
    res.status(200).send(item);
  } catch (error) {
    res.status(500).send(error);
  }
};
