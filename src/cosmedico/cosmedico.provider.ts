import { Provider } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Produtos } from './cosmedico.entity';

const cosmedicoRepository: Provider<Repository<Produtos>> = {
  provide: 'COSMEDICO_REPOSITORY',
  useFactory: (dataSouce: DataSource) => {
    return dataSouce.getRepository(Produtos);
  },
  inject: ['DATA_SOURCE_MYSQL'],
};

export const cosmedicoProvider: Provider[] = [cosmedicoRepository];
