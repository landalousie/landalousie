const obfuscatePassword = (message: string) => {
  return message.replace(
    /password:\s?\\\\\\\".*\\\\\\\"/,
    'password: \\"******\\"'
  );
};

export const parseMessage = (message: string) => {
  const messageAsString = JSON.stringify(message);
  return obfuscatePassword(messageAsString);
};
