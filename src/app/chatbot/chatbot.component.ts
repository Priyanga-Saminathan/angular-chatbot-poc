import { Component, OnInit, Renderer2} from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { WebsocketChat } from '../websocketChat';
import { NgForm } from '@angular/forms';
import { websocketChatArray } from '../websocketChatArray';
import { DatePipe, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  userMessage:any
  websocketChatArray:websocketChatArray[]=[]
  str:any
  changeEvent:boolean=false
  dateandtime:any
  inputbool:boolean=false
  Time:any
  DateTime:any
  flag:boolean=false
  english:boolean=false
  spanish:boolean=false
  connection:boolean=false
  connType:any
  star:boolean=false
  container:any
  sendNum:number=0
  input_text:string=''
  eochunk:boolean=false
  close:boolean=false
  enter:boolean=false
  count:any=0
  home:boolean=false
  send:boolean=false
  link:boolean=false
  error:boolean=false
  constructor(private ws:WebsocketService, private renderer:Renderer2, public datePipe:DatePipe) { }
  // currentDateandtime=this.datePipe.transform(new Date(),'MM-dd-yyyy HH:mm:ss')
 
  ngOnInit(): void {
    this.ws.openWebsocketConnection()
    this.websocketChatArray=this.ws.getChatMessage()
    console.log("response:"+this.websocketChatArray)
    this.dateandtime=new Date()
    //this.DateTime=this.ws.Date
    console.log(this.DateTime)
    this.connType=this.ws.type
    console.log(this.connType)
    this.star=this.ws.star
    console.log(this.star)
    //console.log(this.websocketChat.join())
   
   
  }
  ngAfterViewInit():void{
    this.container=document.getElementsByClassName("chat")
    this.container.scrollTop=this.container.scrollHeight
  }
 
  ngAfterContentChecked():void{
    this.connection=this.ws.conn
    console.log("ngAfterContentChecked:"+this.connection)
    this.DateTime=this.ws.DateTime
    console.log(this.DateTime)
    this.eochunk=this.ws.eochunk
    console.log(this.eochunk)
    this.star=this.ws.star
    this.connType=this.ws.type
    console.log(this.connType)
    this.count=this.ws.count
    console.log("count:"+this.count)
    this.error=this.ws.error
    this.send=this.ws.send
    this.link=this.ws.link
 
 
    // console.log("content checked closed:"+this.close)
  }
 
  // ngDoCheck(){
  //   this.websocketChat.forEach(websocket=>{
  //     this.str=websocket.message.message.chunk.join()
  //   })
  //   console.log("string"+this.str)
  // }
  ngOnChanges():void{
    this.websocketChatArray=this.ws.getChatMessage()
    console.log("response:"+this.websocketChatArray)
  }
  ngOnDestroy():void{
    this.ws.closeWebsocketConnection()
  }
  reloadPage(){
    this.home=true;
    window.location.reload();
  }
  response(event:any){
    // const messageContainer = document.querySelector('.message-container');
    // messageContainer.classList.add('display-input-textbox');
      this.userMessage=event.target.textContent
      console.log("value:"+event.target.textContent)
      this.inputbool=true
      this.flag=true
      this.Time=new Date().toLocaleString()
      console.log("Time:"+this.Time)
      if(this.userMessage=="English"){
        this.english=true
        console.log(this.english)
      }
      else{
        this.spanish=true
      }
      console.log(this.userMessage)
      const chat=new WebsocketChat("BEDROCK_CLAUDE",
   "Vector",
    "asurid",
    this.Time,
    "12345",
    "ES",
    "ES",true,this.userMessage);
    console.log(chat)
      this.ws.sendWebsocketMessage(chat)
      //this.displayMessage(this.message)
      // document.querySelector("message-container").style.display="block";
  }
  sendmessage(){
    this.userMessage=this.input_text
    console.log("submitted");
    console.log(this.userMessage)
    this.Time=new Date().toLocaleString()
    console.log("Time:"+this.Time)
    this.changeEvent=false
    this.enter=true
    const chat=new WebsocketChat("BEDROCK_CLAUDE",
   "Vector",
    "asurid",
    this.Time,
    "12345",
    "ES",
    "ES",true,this.userMessage)
    console.log(chat)
    this.ws.sendWebsocketMessage(chat)
    this.input_text=''
  }
  inputMsg(msg:any){
    if(msg.length!=0){
      this.changeEvent=true
    }
    else{
      this.changeEvent=false
    }
  }
 
  // displayMessage(msg:String){
  //   const chatDiv=document.getElementsByClassName("chat")
  //   const messageDiv=this.renderer.createElement("span")
  //   messageDiv.innerHTML=msg
  //   this.renderer.appendChild(messageDiv,chatDiv);
  // }
 
}