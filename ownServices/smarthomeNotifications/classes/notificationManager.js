const notifier = require("node-notifier")

class NotificationsManager{
    constructor(mqttManager){
        this.notifications = [];
        this.mqttManager = mqttManager;
    };

    newNotification(msg){
        msg = new Notification(msg)
        this.aktivMsg = msg;
        notifier.notify({
            title: `[MQTT Notification] ${msg.title}`,
            message: msg.message,
            sound: msg.sound
        },this.callbackCaller.bind(this));
        
        this.notifications.push(msg)
    }
    callbackCaller(err,response, metadata){
        
        this.aktivMsg.callback(err,response,metadata,this.mqttManager)
    }
}

class Notification{

    /**
     * 
     * @param {Object} object 
     * callback can be used to remotely call a function or get a reply Log4J greets everyone here so be careful pls
     */
    constructor(object){
       
        object = importFunction(object)
        this.title = object.title
        this.message = object.message
        this.sound = object.sound  
        if(object.callback){
            this.callback = object.callback
        } else{
            this.callback = (err,response,metadata,mqttManager)=>{}
        }
        
    }

   
}

function importFunction(string){
    
    var ret = JSON.parse(string, function(key, value) {
        if (typeof value === "string" &&
            value.startsWith("/Function(") &&
            value.endsWith(")/")) {
          value = value.substring(10, value.length - 2);
          return (0, eval)("(" + value + ")");
        }
        return value;
      });
      return ret;
}
module.exports = NotificationsManager