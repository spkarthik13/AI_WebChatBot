import React, {Component} from 'react'
import axios from 'axios/index'
import {withRouter} from 'react-router-dom'
import Message from './Message'
import Cookies from 'universal-cookie'
import {v4 as uuid} from 'uuid'
import Card from './Card'
import QuickReplies from './QuickReplies'

const cookies = new Cookies()
class Chatbot extends Component{

    textInput;
    messagesEnd;
    constructor(props) {
        super(props);

        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
        this._handleQuickReplyPayload = this._handleQuickReplyPayload.bind(this);
        this.hide = this.hide.bind(this);
        this.show = this.show.bind(this);
        this.fileUploadHandler = this.fileUploadHandler.bind(this);
        this.state = {
            messages: [],
            showBot: true,
            shopWelcomeSent: false,
            AboutUs: false,
            selectedFile: null,
            responseString: null
        }
        if(cookies.get('userID') === undefined) {
            cookies.set('userID', uuid(), {path: '/'})
        }
        console.log(cookies.get('userID'))
    }

    async df_text_query(text){
        let says = {
            speaks: 'Me',
            msg: {
                text: {
                    text: text
                }
            }
        }

        this.setState({messages: [...this.state.messages, says]}) //... to concatenate more values into new array.
        try {
        const res = await axios.post('/api/df_text_query', {text, userID: cookies.get('userID')})

        for(let msg of res.data.fulfillmentMessages) {
            says = {
                speaks: 'Bot',
                msg: msg
            }
            this.setState({messages: [...this.state.messages, says]})
        }
    }catch (e) {
        says = {
            speaks: 'Bot',
            msg:{
                text: {
                    text: "I'm having troubles right now. I will be back soon"
                }
            }
        }

        this.setState({messages: [...this.state.messages, says]})
        let that = this;
        setTimeout(function (){
            that.setState({showBot: false})
        }, 2000);
    }
}

    async df_event_query(event){
        try {
        const res = await axios.post('api/df_event_query', {event, userID: cookies.get('userID')})

        for(let msg of res.data.fulfillmentMessages){
            let says = {
                speaks: 'Bot',
                msg: msg
            }
            this.setState({messages: [...this.state.messages, says]})
        }
    }catch (e) {
        let says = {
            speaks: 'Bot',
            msg:{
                text:{
                    text: "I'm having troubles right now. Will catch you soon. Sorry for the inconvenience"
                }
            }
        }
        this.setState({messages: [...this.state.messages, says]});
        let that = this;
        setTimeout(function ()
         {
             that.setState({showBot:false})

        }, 2000)
    }
};

    async df_bot_query(text){
        let says = {
            speaks: 'Bot',
            msg: {
                text: {
                    text: text
                }
            }
        }

        this.setState({messages: [...this.state.messages, says]}) //... to concatenate more values into new array.
        const res = await axios.post('/api/df_text_query', {text, userID: cookies.get('userID')})

        for(let msg of res.data.fulfillmentMessages) {
            says = {
                speaks: 'Bot',
                msg: msg
            }
            this.setState({messages: [...this.state.messages, says]})
        }

    }

    resolveAfterXseconds(x){
        return new Promise(resolve =>{
            setTimeout(() => {
                resolve(x);
            }, x*1000);
        })
    }
    async componentDidMount(){
        this.df_event_query('welcome');
        if(window.location.pathname === '/shop' && !this.state.shopWelcomeSent){
            await this.resolveAfterXseconds(5)
            this.df_event_query('Welcome_shop')
            this.setState({shopWelcomeSent: true, showBot:true})
        }
        if(window.location.pathname === '/about' && !this.state.AboutUs){
            this.df_event_query('ABOUT_US')
            this.setState({AboutUs: true, showBot:true})
        }
        this.props.history.listen(() => {
            console.log('listening')
            if(this.props.history.location.pathname === '/shop' &&!this.state.shopWelcomeSent){
                this.df_event_query('Welcome_shop')
                this.setState({shopWelcomeSent: true, showBot:true})

            }
            if(this.props.history.location.pathname === '/about' && !this.state.AboutUs){
                this.df_event_query('ABOUT_US')
                this.setState({AboutUs: true, showBot: true})
            }
        })
    }

    componentDidUpdate(){
        this.messagesEnd.scrollIntoView({behavior: "smooth"});
        if(this.textInput) {
            this.textInput.focus();
        }
    }

    show(event){
        event.preventDefault();
        event.stopPropagation();
        this.setState({showBot:true})
    }

    hide(event){
        event.preventDefault();
        event.stopPropagation();
        this.setState({showBot:false})
    }

    _handleQuickReplyPayload(event, payload, text){
        event.preventDefault();
        event.stopPropagation();

        switch(payload){
            case 'recommend_yes':
                this.df_event_query('SHOW_RECOMMENDATIONS');
                break;
            case 'training_jeans':
                this.df_event_query('JEANS');
                break;
            // case 'jersey_yes':
            //     this.df_event_query('JERSEY_YES');    
            default:
                this.df_text_query(text);
                break;
        }
    }

    renderCards(cards) {
        return cards.map((card, i) => <Card key={i} payload={card.structValue}/>);
    }

    renderOneMessage(message, i) {

        if (message.msg && message.msg.text && message.msg.text.text) {
            return <Message key={i} speaks={message.speaks} text={message.msg.text.text}/>;
        } else if (message.msg && message.msg.payload.fields.cards) { //message.msg.payload.fields.cards.listValue.values

            return <div key={i}>
                <div className="card-panel grey lighten-5 z-depth-1">
                    <div style={{overflow: 'hidden'}}>
                        <div className="col s2">
                            <a href="/" className="btn-floating btn-large waves-effect waves-light blue">{message.speaks}</a>
                        </div>
                        <div style={{ overflow: 'auto', overflowY: 'scroll'}}>
                            <div style={{ height: 300, width:message.msg.payload.fields.cards.listValue.values.length * 270}}>
                                {this.renderCards(message.msg.payload.fields.cards.listValue.values)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        } else if (message.msg &&
        message.msg.payload &&
        message.msg.payload.fields &&
        message.msg.payload.fields.quick_replies){
            return <QuickReplies
            text = {message.msg.payload.fields.text ? message.msg.payload.fields.text : null}
            key = {i}
            replyClick = {this._handleQuickReplyPayload}
            speaks = {message.speaks}
            payload = {message.msg.payload.fields.quick_replies.listValue.values}/>
        }
    }

    renderMessages (stateMessages){
        if(stateMessages){
            return stateMessages.map((message, i)=>{
                return this.renderOneMessage(message,i)
            })
        }else{
            return null;
        }
    }

    _handleInputKeyPress(e){
        if(e.key === 'Enter'){
            this.df_text_query(e.target.value)
            e.target.value = ''
        }
    }


    fileSelectHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
        console.log(event.target.files[0])
    }

    async fileUploadHandler() {

        const formData = new FormData();

        formData.append('myImage', this.state.selectedFile, this.state.selectedFile.name);

        // var contentType = {
        //     headers:{
        //         "content-type" : "multipart/form-data"
        //     }
        // }


        // axios.post('http://localhost:3002/api/hello/image', formData, contentType
        // ).then(function(response){
        //     console.log(response.data); //response data is a string containing classification of the image.
        //     console.log(typeof(response.data)) //returns type as string 
        //     let data = response.data
            
        //     this.setState({
        //         responseString: data
        //     })
        
        // }).then(this.df_text_query(this.state.responseString))
        // .catch(function(error){
        //     console.log(error);
        // });


       const imgRes =  await axios.post('http://localhost:3002/api/hello/image', formData)

       const resp = JSON.stringify(imgRes.data)
       const cleanResp = resp.slice(1,-1)
       const commaless = cleanResp.split("/,/");
       const regex = cleanResp.match('\S+(?=,)')
       console.log(regex);
       console.log(resp)
       console.log(cleanResp)
       console.log(commaless)

       this.df_bot_query(cleanResp)


    }

    render(){
        if(this.state.showBot){
            return(
                <div style={{height: 500, width: 400, position:'absolute', bottom:0, right:0, border: '1px solid lightgrey', font: '16px Comic Sans MS'}}>
                    <nav>
                        <div className="nav-wrapper light-blue lighten-1">
                            <a href="/" className="brand-logo">E-Bot</a>
                            <ul id = "nav-mobile" className="right hide-on-med-and-down">
                                <li><a href="/" onClick={this.hide}>Hide</a></li>
                            </ul>
                        </div>
                    </nav>
                    <div id="chatbot" style={{height: 388,width: '100%', overflow: 'auto'}}>
                        {this.renderMessages(this.state.messages)}
                        <div ref = {(el) => {this.messagesEnd = el}}
                            style = {{float: 'left', clear: "both"}}>
                        </div>                        
                    
                    </div>
                    
                    
                        <div className="col s10">
                            <input ref = {(input) => {this.textInput = input}}
                                  style={{margin:0, paddingLeft: '1%', paddingRight: '1%', width: '98%'}} placeholder="Type a message :)" type = "text" onKeyPress={this._handleInputKeyPress}/>
                            <input style={{display:'none'}} 
                            type = 'file' 
                            onChange={this.fileSelectHandler}
                            ref={fileInput => this.fileInput = fileInput}></input>
                            <button className = "btn waves-effect waves-light" onClick={()=>this.fileInput.click()}> Select image <i className="material-icons right">swap_vertical_circle</i> </button>
                            <button className = "btn waves-effect waves-light mx-auto" onClick={this.fileUploadHandler}> Search product <i className="material-icons right">send</i> </button>
                        </div>

                </div>
                        
            )
        } else{
            return(
                <div style={{minHeight: 40, maxHeight: 500, width: 400, position:'absolute', bottom:0, right:0, border: '1px solid lightgrey', font: '16px Comic Sans MS'}}>
                    <nav>
                        <div className="nav-wrapper">
                            <a href="/" className="brand-logo">E-Bot</a>
                            <ul id = "nav-mobile" className="right hide-on-med-and-down">
                                <li><a href="/" onClick={this.show}>Show</a></li>
                            </ul>
                        </div>
                    </nav>

                    <div ref={(el) => {this.messagesEnd = el;}}
                         style = {{float: "left", clear: "both"}}>
                    </div>

                </div>
            )

        }
    }
}

export default withRouter(Chatbot)