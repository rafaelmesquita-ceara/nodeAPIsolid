import { IMailProvider, IMessage } from "../IMailProvider";
import nodemailer from 'nodemailer'
import Mail from "nodemailer/lib/mailer";

export class MailTrapProvider implements IMailProvider {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'e7af8ff7e9bde8',
        pass: 'b3d704608b009f'
      }
    })
  }
  async sendMail(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name : message.to.email,
        address : message.to.email
      },
      from : {
        name : message.to.email,
        address : message.to.email
      },
      subject : message.subject,
      html : message.body
    })
  }
}