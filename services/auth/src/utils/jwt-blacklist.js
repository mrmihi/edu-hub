import { redis } from '@app/redis';

export class Blacklist {
  constructor() {
    throw new Error('Blacklist is a singleton class. Use Blacklist.has() or Blacklist.add() to interact with the blacklist');
  }

  static async has(token) {
    return !!(await redis.get(`access-token-blacklist:${token}`));
  }

  static add(token) {
    return redis.set(`access-token-blacklist:${token}`, '1', 3600);
  }
}
