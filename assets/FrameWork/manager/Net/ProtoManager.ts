


declare const protobuf: any;

export class ProtoManager extends cc.Component {
    private static _intance: ProtoManager = null as unknown as ProtoManager;
    public static getInstance():ProtoManager{
        return ProtoManager._intance
    }
    // 协议描述文件的文本对象
    private pbTexAsset: cc.TextAsset|null = null;

    // 根据协议描述文本对象，我们生成一个动态解析的对象;
    private pb: any = null;

    public Init(pbTex: cc.TextAsset|null): void {
        this.pbTexAsset = pbTex;
        this.pb = protobuf.parse(this.pbTexAsset);
        console.log(this.pbTexAsset)
        console.log(this.pb)
    }

    onLoad(): void {
        if(ProtoManager._intance === null) {
            ProtoManager._intance = this;
        }
        else {
            this.destroy();
            return;
        }
    }

    public SerializeMsg(msgName: string, msgBody: any): Uint8Array {
        let rs = this.pb.root.lookupType(msgName);
        let msg = rs.create(msgBody);
        let buf = rs.encode(msg).finish();

        return buf;
    }

    public DeserializeMsg(msgName: string, msgBuf: Uint8Array): Object {
        let rs = this.pb.root.lookupType(msgName);
        let msg = rs.decode(msgBuf)

        return msg;
    }
}


