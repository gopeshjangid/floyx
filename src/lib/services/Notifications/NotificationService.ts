import { tokenService } from '@services/TokenService'
import * as signalR from '@microsoft/signalr'
import { ApiEndpoint } from '@services/ApiEndpoints'
import { EventEmitter } from 'events'
import { requestService } from '@services/Request/RequestService'
import { authService } from '@services/Auth/AuthService'

class NotificationService {
  private connection: signalR.HubConnection | undefined
  private notifications: any[] = []
  public publisher = new EventEmitter()

  constructor() {
    this.init()
    tokenService.onNewToken.on('TOKEN', this.init.bind(this))
  }

  public markAsRead(id: string) {
    requestService.post(ApiEndpoint.GetNotificationsAll + '/read/' + id).success(() => {
      this.publisher.emit('reload')
      // this.reloadAll();
    })
  }

  public markAllAsRead(notifications: any[]) {
    let done = 0
    const max = notifications.length
    notifications.forEach((item) => {
      requestService.post(ApiEndpoint.GetNotificationsAll + '/read/' + item.id).success(() => {
        done++
        if (done === max) {
          this.publisher.emit('reload')
        }
      })
    })
  }

  public getNotifications = () => {
    return this.notifications
  }

  private connect() {
    if (this.connection) {
      this.connection.stop().then(() => this.InitSignalR())
    } else {
      this.InitSignalR()
    }
  }

  private InitSignalR() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(ApiEndpoint.BasePath + '/notifications', {
        accessTokenFactory: () => {
          const token = tokenService.getToken()
          return token !== null ? token : ''
        },
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build()

    this.connection.start().catch((err) => console.log(err))

    this.connection.on('Notification', (msg) => {
      const notifications = this.notifications
      notifications.unshift(msg)
      this.publisher.emit('change', this.notifications)
    })
  }

  private init() {
    if (authService.isLoggedIn()) {
      this.connect()
    }
  }

  public reloadAll() {
    return requestService.get(ApiEndpoint.GetNotificationsAll).success((resp) => {
      this.notifications = resp.data
    })
  }
}

export const notificationService = new NotificationService()
