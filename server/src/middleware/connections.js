const connections = class {
    constructor(client){
        this.clients = 0;
        this.clientCount = [client]
    }
    getSize(){
        return this.clients;
    }
    push(connection){
        this.clients++;
        //this.clientCount.push(connection);
    }
    close(){
        this.clients--;
    }
}

module.exports = {

    connections
}