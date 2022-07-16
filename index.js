const mqtt = require("mqtt");
const Client = require("./classes/client");

const mqttClient = mqtt.connect("mqtt://localhost");
const client = new Client();
mqttClient.on("connect", () => {
  console.log("Connected to MQTT server");
  mqttClient.publish("/login/", JSON.stringify(client)); // Login to the Server
  mqttClient.subscribe(`/clients/${client.name}/#`); // everything that belongs to this client
  mqttClient.subscribe(`/allClients/restart`); // Call to resend data to the Server
});

mqttClient.on("message", handleMessages);
//client.serviceManager.start("webTestServer")
function handleMessages(topic, message) {
  topic = topic.split("/").pop();

  switch (topic) {
    case "start":
      client.start(message); // start a Service
      break;
    case "stop":
      client.stop(message); // stop a Service
      break;
    case "restart":
      console.log("[Service] Resending data to server..."); // When the Server crashed or restarted the client will automatically reconnect
      mqttClient.publish("/login/", JSON.stringify(client));
      break;
    case "ping":
      mqttClient.publish("/ping", client.name);
      break;
  }
}
