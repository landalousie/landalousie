import { ENV } from '#core/constants';
import { Resend } from 'resend';

export const resend = new Resend(ENV.RESEND_API_KEY);
