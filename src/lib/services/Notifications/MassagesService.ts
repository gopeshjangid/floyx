import * as signalR from '@microsoft/signalr'
import { EventEmitter } from 'events'

import { ApiEndpoint } from '@services/ApiEndpoints'
import { authService } from '@services/Auth/AuthService'
import { requestService } from '@services/Request/RequestService'
import { tokenService } from '@services/TokenService'

class MessageService {
  private connection: signalR.HubConnection | undefined
  private messages: any[] = []
  public publisher = new EventEmitter()
  public unreadTotal = 0

  constructor() {
    this.init()
    tokenService.onNewToken.on('TOKEN', this.init.bind(this))
  }

  public getNotifications = () => {
    return this.messages
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
      .withUrl(ApiEndpoint.BasePath + '/chathub', {
        accessTokenFactory: () => {
          const token = tokenService.getToken()
          return token !== null ? token : ''
        },
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build()

    this.connection.start().catch((err) => console.log(err))

    this.connection.on('AppendMessage', (msg) => {
      this.publisher.emit('messages', msg)
    })
    this.connection.on('ReceiveMessage', (msg) => {
      this.reloadAll()
      this.publisher.emit('messages', msg)
    })
  }

  private init() {
    if (authService.isLoggedIn()) {
      this.connect()
    }
  }

  public sendMessage = (userId: string, text: any) => {
    return this.connection?.invoke('SendMessage', userId, text)
  }

  public markAsRead(id: any) {
    return requestService.post(ApiEndpoint.GetMessages + '/read/' + id).success(() => {
      this.reloadAll()
    })
  }

  public reloadAll() {
    return requestService.get(ApiEndpoint.GetMessages).success((resp) => {
      this.messages = resp.data
      this.unreadTotal = 0
      resp.data.forEach((element: any) => {
        this.unreadTotal += element.unreadCount
      })
      this.publisher.emit('threads', this.messages)
    })
  }

  public loadMessages(userName: string, createdDate: any | undefined) {
    let url = ApiEndpoint.GetMessages + '/' + userName
    if (createdDate) {
      url += '?createdDate=' + createdDate
    }
    return requestService.get(url).success((resp) => {
      return resp.data
    })
  }
}

export const messageService = new MessageService()
