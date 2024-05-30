import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { CronController } from './cron.controller';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [CronController],
  providers: [CronService],
  imports: [UserModule],
})
export class CronModule {}
