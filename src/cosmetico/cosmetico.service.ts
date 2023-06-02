import { Injectable, Inject } from '@nestjs/common';
import { Produtos } from './cosmetico.entity';
import { Repository } from 'typeorm';
import { IProdutoModelValidation, IService } from './cosmetico.resource';

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
