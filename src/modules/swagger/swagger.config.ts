import { DocumentBuilder } from '@nestjs/swagger';

const swaggerConfig = new DocumentBuilder()
  .setTitle('Dna Carro example')
  .setDescription('The dna carro API description')
  .setVersion('1.0')
  .build();
export { swaggerConfig };
