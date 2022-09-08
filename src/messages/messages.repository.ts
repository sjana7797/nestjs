import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

@Injectable()
export class MessagesRepository {
  async findOne(id: string) {
    const messages = await getAllMessages();
    return messages[id];
  }
  async findAll() {
    const messages = await getAllMessages();
    return messages;
  }
  async createMessage(message: string) {
    const messages = await getAllMessages();
    const id = Math.floor(Math.random() * 999);
    messages[id] = {
      id,
      content: message,
    };
    await writeFile('messages.json', JSON.stringify(messages));
    return (messages[id] = {
      id,
      content: message,
    });
  }
}

async function getAllMessages() {
  try {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);
    return messages;
  } catch (error) {
    return {};
  }
}
