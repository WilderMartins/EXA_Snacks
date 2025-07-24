const aws = require('aws-sdk');

class MailService {
  constructor() {
    this.ses = new aws.SES({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

  async sendOtp(to, otp) {
    const params = {
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: `Seu código de acesso é: ${otp}`,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Seu código de acesso para o Quiosque',
        },
      },
      Source: process.env.MAIL_FROM,
    };

    return this.ses.sendEmail(params).promise();
  }
}

module.exports = new MailService();
