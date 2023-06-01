import { Module } from '@nestjs/common';
import { CosmedicoService } from './cosmedico.service';
import { CosmedicoController } from './cosmedico.controller';
import { DatabaseModule } from 'src/database/database.module';
import { cosmedicoProvider } from './cosmedico.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [CosmedicoController],
  providers: [CosmedicoService, MessageChannel, ...cosmedicoProvider],
})
export class CosmedicoModule {}
