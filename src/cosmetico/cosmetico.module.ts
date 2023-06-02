import { Module } from '@nestjs/common';
import { CosmedicoService } from './cosmetico.service';
import { CosmedicoController } from './cosmetico.controller';
import { DatabaseModule } from 'src/database/database.module';
import { cosmeticoProvider } from './cosmetico.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [CosmedicoController],
  providers: [CosmedicoService, MessageChannel, ...cosmeticoProvider],
})
export class CosmedicoModule {}
