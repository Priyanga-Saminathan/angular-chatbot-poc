export class WebsocketChat{
    //action: any
    model:string
    question: any
    service_name:string
    user_id:string
    timestamp:any
    session_id:string
    language_code:string
    query_detected_language:string
    bool:boolean
    constructor(model:string,service_name:string,user_id:string, timestamp:any, session_id:string, language_code:string, query_detected_language:string ,bool:boolean,question:any){
        //this.action=action
        this.model=model
        this.question=question
        this.service_name=service_name
        this.user_id=user_id
        this.timestamp=timestamp
        this.session_id=session_id
        this.language_code=language_code
        this.query_detected_language=query_detected_language
        this.bool=bool
    }
}