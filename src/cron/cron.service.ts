import { Injectable, Logger } from '@nestjs/common';
import * as cron from 'node-cron';
import * as moment from 'moment-timezone';
import { UserService } from '../user/user.service';
import axios from 'axios';

const fs = require('fs');

@Injectable()
export class CronService {
  private logger = new Logger('CronService');
  private messageQueueFile = 'messageQueue.json';
  private messageQueue: any[] = [];

  constructor(private readonly userService: UserService) {
    this.loadMessageQueue();
    this.scheduleBirthdayMessages();
    this.processMessageQueue();
  }

  loadMessageQueue() {
    try {
      const data = fs.readFileSync(this.messageQueueFile, 'utf8');
      this.messageQueue = JSON.parse(data);
    } catch (error) {
      this.logger.warn(
        `Failed to load message queue from file: ${error.message}`,
      );
    }
  }

  saveMessageQueue() {
    fs.writeFileSync(
      this.messageQueueFile,
      JSON.stringify(this.messageQueue),
      'utf8',
    );
  }

  scheduleBirthdayMessages() {
    cron.schedule('59 * * * *', async () => {
      try {
        const users = await this.userService.findAll();
        for (const user of users) {
          const userTimezone = user.timezone;
          const today = moment().tz(userTimezone);
          const userBirthday = moment(user.birthday_date).tz(userTimezone);
          if (
            userBirthday.date() === today.date() &&
            userBirthday.month() === today.month() &&
            today.hour() === 8 &&
            user.latest_sent_at !== today.format('YYYY')
          ) {
            this.queueMessage(
              `Hey, ${user.first_name} ${user.last_name} `,
              `it's your birthday!`,
              user.email,
            );
            user.latest_sent_at = today.format('YYYY');
            await this.userService.update(user.id, user);
          }
        }
      } catch (error) {
        this.logger.error(
          `Error scheduling birthday messages: ${error.message}`,
        );
      }
    });
  }

  queueMessage(message: string, greetings: string, email: string) {
    this.messageQueue.push({ message, greetings, email });
    this.saveMessageQueue();
  }

  processMessageQueue() {
    cron.schedule('* * * * *', () => {
      const messageItem = this.messageQueue.shift();
      if (messageItem) {
        this.sendMessage(messageItem);
        this.saveMessageQueue();
      }
    });
  }

  async sendMessage(messageItem: any) {
    const body = {
      email: messageItem.email,
      message: `${messageItem.message} ${messageItem.greetings}`,
    };
    const response = await axios.post(
      'https://email-service.digitalenvision.com.au/send-email',
      body,
    );
    console.log('response : ', response);
  }
}
