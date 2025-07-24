const User = require('../models/User');

class UserController {
  async store(req, res) {
    const { email } = req.body;

    if (await User.findOne({ where: { email } })) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = await User.create(req.body);

    return res.json(user);
  }

  async update(req, res) {
    const { email } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      if (await User.findOne({ where: { email } })) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    const updatedUser = await user.update(req.body);

    return res.json(updatedUser);
  }

  async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  }

  async delete(req, res) {
    const { id } = req.params;

    await User.destroy({ where: { id } });

    return res.status(204).send();
  }
}

module.exports = new UserController();
