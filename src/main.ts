import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { config } from "dotenv";

async function main() {
  config();
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT, () =>
    console.log("Servidor rodando na porta 3333")
  );
}
main();
