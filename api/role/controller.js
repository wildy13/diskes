import Roles from './model.js';

export const getAll = async (req, res) => {
  try {
    const roles = await Roles.find({});
    res.status(200).send(roles);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const create = async (req, res) => {
  try {
    const newRole = new Roles(req.body);

    const role = await newRole.save();

    res.status(200).send(role);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send('This Role is already registered, please input another');
    } else {
      res.status(500).send(error);
    }
  }
};