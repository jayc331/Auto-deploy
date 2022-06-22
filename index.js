const config = require("./config.json");

module.exports = class Main {

    constructor() {
        this.config = config;
        this.utils = new (require("./Utils"))(this);
        
        this.start();
    }

    async start() {
        this.utils.validate_config(this.config).catch(console.error)
        .then(() => {
            setInterval(() => { this.utils.scan() }, 5_000);
        })
    }

}()
