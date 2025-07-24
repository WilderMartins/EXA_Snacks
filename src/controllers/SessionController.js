const jwt = require('jsonwebtoken');
const { addMinutes } = require('date-fns');
const User = require('../models/User');
const authConfig = require('../config/auth');
const MailService = require('../services/MailService');


class SessionController {
  async storeOtp(req, res) {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otp_expires_at = addMinutes(new Date(), 5);

    await user.update({ otp, otp_expires_at });


    try {
      await MailService.sendOtp(email, otp);
    } catch (error) {
      console.error('Failed to send OTP email', error);
      return res.status(500).json({ error: 'Failed to send OTP email' });
    }


    return res.status(200).send();
  }

  async store(req, res) {
    const { email, otp } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (user.otp !== otp || new Date() > user.otp_expires_at) {
      return res.status(401).json({ error: 'Invalid OTP' });
    }

    await user.update({ otp: null, otp_expires_at: null });

    const { id, name, role } = user;

    return res.json({
      user: {
        id,
        name,
        email,
        role,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

module.exports = new SessionController();
