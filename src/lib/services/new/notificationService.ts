import * as signalR from '@microsoft/signalr';
import { EventEmitter } from 'events';
import { tokenService } from './tokenService';
import { authService } from './authService';
import { ApiEndpoint } from '@/lib/API/ApiEndpoints';
import { CookieValueTypes } from 'cookies-next';

class NotificationService {
  private connection: signalR.HubConnection | undefined;
  private notifications: any[] = [];
  public publisher = new EventEmitter();

  constructor() {
    this.init();
    tokenService.onNewToken.on('TOKEN', this.init.bind(this));
  }

  public markAsRead(id: string) {
    return fetch(ApiEndpoint.GetNotificationsAll + '/read/' + id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: tokenService.getBearerToken() || '',
      },
      keepalive: true,
    })
      .then(response => response.json())
      .then(data => {
        // TODO: for now we are not reloading the notifications on single mark as read
        // this.publisher.emit('reload');
        return data;
      })
      .catch(error => {
        console.error('Error:', error);
        return error;
      });
  }

  public async markAllAsRead(notifications: any[]) {
    const markReadPromises = notifications.map(notification => this.markSingleAsRead(notification.id));

    try {
      const results = await Promise.allSettled(markReadPromises);
      const allSuccessful = results.every(result => result.status === 'fulfilled');

      if (allSuccessful) {
        this.publisher.emit('reload');
        return {
          success: true,
        };
      } else {
        const errors = results.filter(result => result.status === 'rejected');
        console.error('Some notifications could not be marked as read:', errors);
      }
    } catch (error) {
      console.error('Error in marking all notifications as read:', error);
    }
  }

  private async markSingleAsRead(notificationId: string) {
    const url = `${ApiEndpoint.GetNotificationsAll}/read/${notificationId}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: tokenService.getBearerToken() || '',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error in marking a notification as read:', error);
      throw error;
    }
  }

  public getNotifications = () => {
    return this.notifications;
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
      .withUrl(ApiEndpoint.BasePath + '/notifications', {
        accessTokenFactory: () => {
          const token: CookieValueTypes = tokenService.getToken();
          const returnVal = token ? token : '';
          return returnVal;
        },
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    this.connection.start().catch(err => console.error(err));

    this.connection.on('Notification', msg => {
      const notifications = this.notifications;
      notifications.unshift(msg);
      this.publisher.emit('change', this.notifications);
    });
  }

  private init() {
    if (authService.isLoggedIn()) {
      this.connect();
    }
  }

  public reloadAll() {
    return fetch(ApiEndpoint.GetNotificationsAll, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: tokenService.getBearerToken() || '',
      },
    })
      .then(response => response.json())
      .then(data => {
        this.notifications = data;
        return data;
      })
      .catch(error => {
        console.error('Error:', error);
        return error;
      });
  }
}

export const notificationService = new NotificationService();
