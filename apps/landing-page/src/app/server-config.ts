import { z } from 'zod';

const Config = z.object({
  GOOGLE_ANALYTICS_ID: z.string(),
  EMAIL_PASSWORD: z.string().min(1, 'Email password is required'),
});

const config = Config.parse(process.env);

export const serverConfig = config;
