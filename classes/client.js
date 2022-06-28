const os = require("os");
const system = require("./filesystemManager");
const ServiceManager = require("./serviceManager");

class Client {
  constructor() {
    this.name = `${os.userInfo().username}-client`;
    this.ip = system.getIp();

    this.services = system.getServices();
    this.ownServices = system.getOwnServices();
    this.functions = system.getFunctions();

    this.serviceManager = new ServiceManager(
      this.services,
      this.ownServices,
      this.functions
    );
  }

  /**
   *
   * @param {String} service
   */
  start(service) {
    this.serviceManager.start(service);
  }
  stop(service) {
    this.serviceManager.stop(service);
  }
}
module.exports = Client;
