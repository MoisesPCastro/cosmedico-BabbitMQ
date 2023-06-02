import { Channel, connect } from "amqplib";
import { IProdutoModelValidation } from "../cosmetico/cosmetico.resource";

export default class MessageChannel {
  async createMessageChannel(): Promise<Channel> {
    try {
      const connection = await connect(process.env.AMQP_SERVER);
      const channel = await connection.createChannel();
      await channel.assertQueue(process.env.QUEUE_NAME);
      console.log("Connected to RabbitMQ: cosmetico_queue");
      return channel;
    } catch (err) {
      console.log("Error while trying to connect to RabbitMQ");
      console.log(err);
      return null;
    }
  }

  async sendToQueue(
    messageChannel: Channel,
    produto: IProdutoModelValidation
  ): Promise<void> {
    const produtoJson = JSON.stringify(produto);
    messageChannel.sendToQueue(
      process.env.QUEUE_NAME,
      Buffer.from(produtoJson)
    );
    console.log("Created message RabbotMQ");
  }
}
