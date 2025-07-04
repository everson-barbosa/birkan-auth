import { Injectable } from '@nestjs/common';
import { Subject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

interface Notification {
  userId: string;
  data: any;
}

@Injectable()
export class NotificationService {
  private notifications$ = new Subject<Notification>();

  sendNotification(userId: string, data: any) {
    this.notifications$.next({ userId, data });
  }

  subscribeToUser(userId: string): Observable<{ data: any }> {
    return this.notifications$.pipe(
      filter(notification => notification.userId === userId),
      map(notification => ({ data: notification.data }))
    );
  }
}
