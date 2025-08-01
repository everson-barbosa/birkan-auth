import { z } from 'zod';

export const envSchema = z.object({
  MAIL_HOST: z.string(),
  MAIL_PORT: z.coerce.number(),
  MAIL_USER: z.string(),
  MAIL_PASS: z.string(),
  MAIL_FROM: z.string().email(),
  DATABASE_URL: z.string().url(),
  FRONT_END_MAGIC_LINK: z.string().url(),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  PORT: z.coerce.number().optional().default(3333),
  KAFKA_BROKERS: z.string().transform((value) => value.split(',')),
  KAFKA_GROUP_ID: z.string(),
});

export type Env = z.infer<typeof envSchema>;
