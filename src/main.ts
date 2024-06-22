import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { setupExceptionFilters } from './common/app/setupExceptionFilters';
import { setupPipes } from './common/app/setupPipes';
import { setupSwagger } from './common/app/setupSwagger';
import { ConfigService } from '@nestjs/config';
import { Environment } from './common/constants/environment';
import { AppEnvironment } from './common/constants/app-environment';

process.env.TZ = 'UTC';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: true,
  });

  const configService = app.get(ConfigService);
  const environment = configService.get<AppEnvironment>(
    Environment.ENVIRONMENT,
  );
  const port = configService.get(Environment.PORT);

  app.enableCors();

  setupPipes(app);
  setupExceptionFilters(app);

  if (environment === AppEnvironment.DEVELOPMENT) {
    setupSwagger(app);
  }

  await app.listen(port);

  return {
    port,
    environment,
  };
}

bootstrap().then(({ port, environment }) => {
  console.log('-----------------------------------------------------------');
  console.log(`   API (${environment}) started on port ${port}`);
  console.log('-----------------------------------------------------------');
});
