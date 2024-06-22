import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const setupSwagger = (application: INestApplication) => {
  const config = new DocumentBuilder().build();

  const document = SwaggerModule.createDocument(application, config);

  SwaggerModule.setup('docs', application, document);
};
