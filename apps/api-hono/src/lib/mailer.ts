import nodemailer from 'nodemailer';
import type { ReactElement } from 'react';
import { render } from 'react-email';
import { config } from './config.js';

const mailer = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    secure: config.SMTP_SECURE,
    auth:
        config.SMTP_USER && config.SMTP_PASS
            ? { user: config.SMTP_USER, pass: config.SMTP_PASS }
            : undefined,
});

export const shutdown = () => {
    mailer.close();
};

interface MailMessage {
    to: string;
    subject: string;
    template: ReactElement;
}

export const sendMail = async ({ to, subject, template }: MailMessage) => {
    const html = await render(template);

    try {
        await mailer.sendMail({
            from: config.SMTP_FROM,
            to,
            subject,
            html,
        });
    } catch (err) {
        console.error('Mail sending failed', err);
    }
};
