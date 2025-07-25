const fs = require('fs').promises;
const path = require('path');

const settingsFilePath = path.resolve(__dirname, '..', 'config', 'settings.json');

class SettingsController {
  async show(req, res) {
    try {
      const settings = await fs.readFile(settingsFilePath, 'utf-8');
      return res.json(JSON.parse(settings));
    } catch (error) {
      if (error.code === 'ENOENT') {
        return res.json({});
      }
      return res.status(500).json({ error: 'Failed to read settings' });
    }
  }

  async store(req, res) {
    const { aws_access_key_id, aws_secret_access_key, aws_region, mail_from, sidebar_color } = req.body;
    try {
      await fs.writeFile(
        settingsFilePath,
        JSON.stringify({ aws_access_key_id, aws_secret_access_key, aws_region, mail_from, sidebar_color }, null, 2)
      );
      return res.status(200).send();
    } catch (error) {
      return res.status(500).json({ error: 'Failed to save settings' });
    }
  }
}

module.exports = new SettingsController();
