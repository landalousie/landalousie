import * as crypto from 'node:crypto';
import { type CipherGCMTypes } from 'node:crypto';

const algorithm: CipherGCMTypes = 'aes-256-gcm';
const ivLength = 16;

// KEY: Must be 256 bytes (32 characters)
export const symmetricEncrypt = (text: string, key: string) => {
  if (Buffer.from(key).length !== 32) {
    throw new Error('Encryption key must be exactly 32 bytes long');
  }

  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);

  const encrypted = `${cipher.update(text, 'utf8', 'hex')}${cipher.final('hex')}`;
  const tag = cipher.getAuthTag();

  return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted}`;
};

export const symmetricDecrypt = (encrypted: string, key: string) => {
  const [ivHex, tagHex, textHex] = encrypted.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const tag = Buffer.from(tagHex, 'hex');
  const encryptedText = Buffer.from(textHex, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  decipher.setAuthTag(tag);

  return `${decipher.update(encryptedText, undefined, 'utf8')}${decipher.final('utf8')}`;
};
