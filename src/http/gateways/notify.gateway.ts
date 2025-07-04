import { Injectable } from "@nestjs/common";
import { Subject } from "rxjs";

@Injectable()
export class NotifyGateway {
  private notifications$ = new Subject<string>()

  get stream() {
    return this.notifications$.asObservable();
  }

  emit(message: string) {
    this.notifications$.next(message);
  }
}