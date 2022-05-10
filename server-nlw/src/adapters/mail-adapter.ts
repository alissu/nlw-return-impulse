export interface SendaMailData {
  subject: string;
  body: string;
}

export interface MailAdapter {
  sendMail: (data: SendaMailData) => Promise<void>;
}
