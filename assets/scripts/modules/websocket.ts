type CmdHandler = {
    [key: string]: (cmd: any) => void;
};

export class WebSocketManager {
    private sock: WebSocket | null = null;
    private cmd_handler: CmdHandler | null = null;

    private _on_opened(event: Event): void {
        console.log("ws connect server success");
    }

    private _on_recv_data(event: MessageEvent): void {
        if (!this.cmd_handler) {
            return;
        }

        const cmd = JSON.parse(event.data);
        if (!cmd) {
            return;
        }

        const cmd_type = cmd[0];
        if (this.cmd_handler[cmd_type]) {
            this.cmd_handler[cmd_type](cmd);
        }
    }

    private _on_socket_close(event: CloseEvent): void {
        if (this.sock) {
            this.close();
        }
    }

    private _on_socket_err(event: Event): void {
        console.log("WebSocket error", event);
        this.close();
    }

    public connect(url: string): void {
        this.sock = new WebSocket(url);

        this.sock.onopen = this._on_opened.bind(this);
        this.sock.onmessage = this._on_recv_data.bind(this);
        this.sock.onclose = this._on_socket_close.bind(this);
        this.sock.onerror = this._on_socket_err.bind(this);
    }

    public send(body: string): void {
        if (this.sock) {
            this.sock.send(body);
        }
    }

    public send_object(obj: any): void {
        if (this.sock && obj) {
            const str = JSON.stringify(obj);
            if (str) {
                this.sock.send(str);
            }
        }
    }

    public close(): void {
        if (this.sock !== null) {
            this.sock.close();
            this.sock = null;
        }
    }

    public register_cmd_handler(cmd_handlers: CmdHandler): void {
        this.cmd_handler = cmd_handlers;
    }
}

// Example usage:
// const websocketManager = new WebSocketManager();
// websocketManager.connect("ws://127.0.0.1:8000/ws");

export default WebSocketManager;
