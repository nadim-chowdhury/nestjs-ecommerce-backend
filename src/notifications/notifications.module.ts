import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { NotificationLog } from './entities/notification-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationLog])],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
