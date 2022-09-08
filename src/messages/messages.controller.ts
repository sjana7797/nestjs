import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('/messages')
export class MessagesController {
  constructor(public messagesService: MessagesService) {}

  /**
   * *Use to get the messages from the database
   */
  @Get()
  getMessagesList() {
    return this.messagesService.findAll();
  }

  /**
   * *Use to get the message from the database
   */
  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    const message = await this.messagesService.findOne(id);
    if (!message) {
      throw new NotFoundException(`Message not found with id ${id}`);
    }
    return message;
  }

  /**
   * *Use to post the message to the database
   */
  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return this.messagesService.createMessage(body.content);
  }
}
