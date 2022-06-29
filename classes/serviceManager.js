const child_process = require("child_process");
const JLCD = require("../jlcd");

/**
 *
 */
class ServiceManager {
  constructor(services, ownServices, functions) {
    this.services = this.loadServices(services);
    this.ownServices = this.loadOwnServices(ownServices);
  }
  loadServices(services) {
    var retArr = [];
    services.forEach((f) => {
      retArr.push(new Service(f));
    });
    return retArr;
  }
  loadOwnServices(ownServices) {
    var retArr = [];
    ownServices.forEach((f) => {
      retArr.push(new OwnService(f));
    });
    return retArr;
  }
  start(service) {
    this.services.forEach((e) => {
      if (e.name == service) {
        console.log(`${service} started`);
        e.startPoint = e.startPoint || "index.js";
        var path = `./services/${service}/${e.startPoint}`;
        var child = child_process.fork(path);
        e.child = child;
        e.started = true;
      }
    });
  }
  stop(service) {
    this.services.forEach((e) => {
      if (e.name == service) {
        e.child.kill();
        console.log("Stopping service " + service);
      }
    });
  }
}

class Service {
  constructor(inpObj) {
    this.name = inpObj.name;
    this.port = inpObj.port;
    this.started = false;
  }
}
class OwnService extends Service {
  constructor(inpObj) {
    super(inpObj);
    this.paths = inpObj.paths;
  }
}
module.exports = ServiceManager;
