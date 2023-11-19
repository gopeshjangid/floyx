import * as signalR from '@microsoft/signalr';
import { CookieValueTypes } from 'cookies-next';

import { EventEmitter } from 'events';
import { tokenService } from './tokenService';
import { ApiEndpoint } from '@/lib/API/ApiEndpoints';
import { authService } from './authService';

class MessageService {
  private connection: signalR.HubConnection | undefined;
  private messages: any[] = [];
  public publisher = new EventEmitter();
  public unreadTotal = 0;

  constructor() {
    this.init();
    tokenService.onNewToken.on('TOKEN', this.init.bind(this));
  }

  public getNotifications = () => {
    return this.messages;
  };

  private connect() {
    if (this.connection) {
      this.connection.stop().then(() => this.InitSignalR());
    } else {
      this.InitSignalR();
    }
  }

  private InitSignalR() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(ApiEndpoint.BasePath + '/chathub', {
        accessTokenFactory: () => {
          const token: CookieValueTypes = tokenService.getToken();
          return token?.toString() ?? '';
        },
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    this.connection.start().catch((err): unknown => console.error(err));

    this.connection.on('AppendMessage', msg => {
      this.publisher.emit('messages', msg);
    });
    this.connection.on('ReceiveMessage', msg => {
      this.reloadAll();
      this.publisher.emit('messages', msg);
    });
  }

  private init() {
    if (authService.isLoggedIn()) {
      this.connect();
    }
  }

  public sendMessage = (userId: string, text: any) => {
    return this.connection?.invoke('SendMessage', userId, text);
  };

  public markAsRead(id: any) {
    fetch(ApiEndpoint.GetMessages + '/read/' + id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + tokenService.getToken(),
      },
    })
      .then(response => response.json())
      .then(() => {
        this.reloadAll();
      })
      .catch(err => console.error(err));
  }

  public reloadAll() {
    fetch(ApiEndpoint.GetMessages, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + tokenService.getToken(),
      },
    })
      .then(response => response.json())
      .then(data => {
        this.messages = data.value.data;
        this.unreadTotal = 0;
        data.value.data.forEach((element: any) => {
          this.unreadTotal += element.unreadCount;
        });
        this.publisher.emit('threads', this.messages);
      })
      .catch(err => console.error(err));
  }

  public loadMessages(userName: string, createdDate: any | undefined) {
    let url = ApiEndpoint.GetMessages + '/' + userName;
    if (createdDate) {
      url += '?createdDate=' + createdDate;
    }
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + tokenService.getToken(),
      },
    })
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch(err => console.error(err));
  }
}

export const messageService = new MessageService();
