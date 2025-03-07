import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const SESSION_SECRET = app.get(ConfigService).get<string>('SESSION_SECRET');
  if (!SESSION_SECRET) {
    throw new Error('Session Secret is undefined');
  }
  app.setGlobalPrefix('api');
  app.use(
    session({
      secret: SESSION_SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 60,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(process.env.PORT ?? 8080);
}

bootstrap().catch((err) => {
  console.error('Error starting the server', err);
});
