import { Injectable, Inject } from '@nestjs/common';
import { Produtos } from './cosmedico.entity';
import { Repository } from 'typeorm';
import { IProdutoModelValidation, IService } from './cosmedico.resource';

@Injectable()
export class CosmedicoService implements IService {
  constructor(
    @Inject('COSMEDICO_REPOSITORY')
    private readonly produtoRepository: Repository<Produtos>,
  ) {}

  async save(produto: IProdutoModelValidation): Promise<void> {
    try {
      await this.produtoRepository.save(produto);
    } catch (error) {
      console.error('server internal error!');
      throw new Error(error);
    }
  }
}
