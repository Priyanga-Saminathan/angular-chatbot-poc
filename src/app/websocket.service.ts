import { Injectable, Renderer2, RendererFactory2} from '@angular/core';
import { WebsocketChat } from './websocketChat';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { websocketChatArray } from './websocketChatArray';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  websocket: any
  websocketChatArray: websocketChatArray[]=[]
  count: number = 0;
  DateTime:any
  type:any
  conn:boolean=false
  eochunk:boolean=false
  star:boolean=true
  error:boolean=false
  send:boolean=false
  link:boolean=false
  private renderer:Renderer2
  constructor(rendererFactory:RendererFactory2) { 
    this.renderer=rendererFactory.createRenderer(null,null)
  }
  openWebsocketConnection(){
    this.websocket=new WebSocket('wss://mzu2kq3w7c.execute-api.us-west-2.amazonaws.com/test/');
    this.websocket.onopen=(e:any)=>{
      console.log("Websocket connected")
      console.log(e)
      this.type=e.type
      console.log("Connection type:"+this.type)
      this.conn=true
      console.log(this.conn)
    }
    this.websocket.onmessage=(event:any)=>{
      console.log("Message received from server")
      console.log(event)
      console.log("star:"+this.star)
      const response=JSON.parse(event.data)
      console.log(response.message.chunk)
      // const ar={"message":response,"bool":false}
      //console.log(JSON.stringify(this.websocketChatArray));
      this.DateTime=new Date()
      this.star=false
      if(response.message || response.message.chunk || response.message.chunk == "") {
        this.displayMessage(response.message.chunk)
      }
      else{
        this.displayMessage("Sorry, Something went wrong")
      }

      // else if(this.sconnType=='close' && this.send){
      //   chunkEle!.innerHTML="Sorry, Something went wrong"
      // }
      // else{
      //   chunkEle.innerHTML="Sorry, Something went wrong"
      // }
      if(response.message.chunk==''){
        this.eochunk=true
      }
      if(response.message=='Internal server error'){
        this.error=true
        this.eochunk=true
        console.log("error:"+this.error)
      }
      this.send=false
    }
    this.websocket.onclose=(e:any)=>{
      console.log(e)
      console.log("websocket connection closed")
      this.type=e.type
      console.log("Connection type:"+this.type)
    }

  }
  sendWebsocketMessage(chat:WebsocketChat){
    const chatt= chat
    this.websocket.send(JSON.stringify(chatt))
    const userchat={"message": chat.question,"Time":chat.timestamp,"bool":true}
    console.log("message sent to websocket")
    //console.log(chatt)
    this.websocketChatArray.push(userchat)
    this.count++;
    console.log(chatt)
    console.log(JSON.stringify(userchat))
    this.eochunk=false
    this.star=true
    this.send=true
  }
  closeWebsocketConnection(){
    this.websocket.close()
  }
  getChatMessage(){
    return this.websocketChatArray
  //   console.log(this.websocketChatArray)
   }
   getDate(){
    return this.DateTime
   }
displayMessage(msg:String){
  const chunkEle = document.getElementById('messageChunk-'+this.count);
      if (chunkEle && msg) {
        chunkEle.innerText += msg
      }
}
 
  
}
