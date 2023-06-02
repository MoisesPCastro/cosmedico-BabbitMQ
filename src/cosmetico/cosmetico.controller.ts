import { IProdutoModelValidation, IProdutoRequest } from "./cosmetico.resource";
import { Controller, UsePipes, ValidationPipe } from "@nestjs/common";
import { Response } from "express";
import { Post, Body, Res, HttpStatus } from "@nestjs/common";
import { CosmedicoService } from "./cosmetico.service";
import MessageChannel from "../utils/MessageChannel";

interface ICosmedicoController {
  save(produto: IProdutoRequest, res: Response): Promise<Response>;
}

@Controller("cosmetico/v1/product")
export class CosmedicoController implements ICosmedicoController {
  constructor(private readonly sevice: CosmedicoService) {}

  @UsePipes(new ValidationPipe())
  @Post("/produtos")
  async save(
    @Body() produto: IProdutoModelValidation,
    @Res() res: Response
  ): Promise<Response> {
    try {
      const msgChannel = new MessageChannel();
      const messageChannel = await msgChannel.createMessageChannel();
      if (messageChannel) {
        produto.date_create = new Date();
        await msgChannel.sendToQueue(messageChannel, produto);
        return res
          .status(HttpStatus.CREATED)
          .json({ message: "Produto criado com sucesso!" });
      }
      throw new Error("Interval server error!");
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send("Interval server error!");
    }
  }
}
