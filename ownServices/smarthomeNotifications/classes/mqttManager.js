const mqtt = require('mqtt');
const NotificationsManager = require("./notificationManager")



class MQTTManager {
    constructor(){
        console.log("test")
        this.notificationsManager = new NotificationsManager(this);
        this.client = mqtt.connect("mqtt://localhost");
        this.client.on("connect",()=>{
            this.setListners()
        })
        
        
    }

    setListners(){
        this.client.subscribe("newMSG")

        this.client.on("message",(topic,msg)=>{
            
            
            this.notificationsManager.newNotification(msg)
        })
    }
}

module.exports = MQTTManager;