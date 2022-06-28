const mqtt = require("mqtt");
const Client = require("./classes/client");

const mqttClient = mqtt.connect("mqtt://localhost");
const client = new Client();
mqttClient.on("connect", () => {
  console.log("Connected to MQTT server");
  mqttClient.publish("/login/", JSON.stringify(client));
  mqttClient.subscribe(`/clients/${client.name}/#`);
});

mqttClient.on("message", handleMessages);
//client.serviceManager.start("webTestServer")
function handleMessages(topic, message) {
  topic = topic.split("/").pop();

  switch (topic) {
    case "start":
      client.start(message);
      break;
    case "stop":
      client.stop(message);
      break;
  }
}
