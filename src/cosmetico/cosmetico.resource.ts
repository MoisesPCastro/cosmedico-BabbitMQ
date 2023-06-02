import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class IProdutoModelValidation {
  @IsNotEmpty()
  name_produto: string;

  @IsNotEmpty()
  provider: string;

  @IsNotEmpty()
  categoria: string;

  @IsNotEmpty()
  value: string;

  @IsOptional()
  description?: string | null;

  @IsOptional()
  promotion?: string | null;

  @IsOptional()
  date_update?: Date | null;

  @IsOptional()
  date_create: Date;
}

export class IProdutoModel extends IProdutoModelValidation {
  id: number;
}

export type IProdutoRequest = Omit<IProdutoModel, "id">;

export interface IService {
  save(produto: IProdutoRequest): Promise<void>;
}

export interface IValidatorYup {
  validate(value: IProdutoRequest): {};
}
