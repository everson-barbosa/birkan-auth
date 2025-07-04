import { Controller, Sse, MessageEvent, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/security/auth/jwt-auth.guard';
import { CurrentUser } from 'src/security/auth/current-user.decorator';
import { UserPayload } from 'src/security/auth/jwt.strategy';
import { NotificationService } from 'src/notifications/notification.service';

@Controller('sse/notifications')
export class NotificationsController {
  constructor(private notificationService: NotificationService) {}

  @UseGuards(JwtAuthGuard)
  @Sse()
  sse(@CurrentUser() user: UserPayload): Observable<MessageEvent> {
    const userId = user.sub;

    return this.notificationService.subscribeToUser(userId);
  }
}
