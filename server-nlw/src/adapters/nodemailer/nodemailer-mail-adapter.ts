import nodemailer from 'nodemailer';
import { MailAdapter, SendaMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "5ea3cf5125be47",
    pass: "3833ea5383555d"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendaMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <userTeste1218@gmail.com>',
      to: 'Alisson Lucas <alissonlucas1821@gmail.com>',
      subject,
      html: body
    });
  }
}