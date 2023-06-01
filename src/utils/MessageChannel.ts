import { Channel, connect } from "amqplib";

export default class MessageChannel {
  async createMessageChannel(): Promise<Channel> {
    try {
      const connection = await connect(process.env.AMQP_SERVER);
      const channel = await connection.createChannel();
      await channel.assertQueue(process.env.QUEUE_NAME);
      console.log("Connected to RabbitMQ: cosmedico_queue");
      return channel;
    } catch (err) {
      console.log("Error while trying to connect to RabbitMQ");
      console.log(err);
      return null;
    }
  }
}
