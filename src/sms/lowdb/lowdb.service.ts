import { JSONFilePreset } from 'lowdb/node';
import { Low } from 'lowdb/lib/core/Low';
import { Injectable } from '@nestjs/common';

interface SMS {
  id: string;
  to: string;
  message: string;
  createdAt: string;
}

interface Data {
  sms: SMS[];
}

const defaultData: Data = { sms: [] };

@Injectable()
export class LowdbService {
  private db!: Low<Data>;

  constructor() {
    this.initialize();
  }

  async initialize() {
    this.db = await JSONFilePreset('lowdb-sms.json', defaultData);
  }

  async create(sms: SMS) {
    this.db.data.sms.push(sms);
  }
}
