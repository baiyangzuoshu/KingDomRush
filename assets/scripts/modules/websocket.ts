var websocket = {
    sock: null, 
    cmd_handler: null,
    
    _on_opened: function(event) {
        console.log("ws connect server success");
    }, 
    
    _on_recv_data: function(cmd_json) {
        if (!this.cmd_handler) {
            return;
        }
        
        var cmd = JSON.parse(cmd_json);
        if (!cmd) {
            return;
        }
        
        var cmd_type = cmd[0];
        if (this.cmd_handler[cmd_type]) {
            this.cmd_handler[cmd_type](cmd);
        }
    }, 
    
    _on_socket_close: function(event) {
        if (this.sock) {
            this.close();
        }
    }, 
    
    _on_socket_err: function(event) {
        console.log("event");
        this.close();
    }, 
    
    connect: function(url) {
        this.sock = new WebSocket(url);
        
        this.sock.onopen = this._on_opened;
        this.sock.onmessage = this._on_recv_data;
        this.sock.onclose = this._on_socket_close;
        this.sock.onerror = this._on_socket_err;
        
        
    },
    
    send: function(body) {
        if (this.sock) {
            this.sock.send(body);
        }
    }, 
    
    send_object: function(obj) {
        if (this.sock && obj) {
            var str = JSON.stringify(obj)
            if (str) {
                this.sock.send(str);    
            }
        }
    },
    
    close: function() {
        if (this.sock !== null) {
            this.sock.close();
            this.sock = null;
        }
    }, 
    
    register_cmd_handler: function(cmd_handers) {
        this.cmd_handler = cmd_handers;
    },
}

// websocket.connect("ws://127.0.0.1:8000/ws");

module.exports = websocket;

