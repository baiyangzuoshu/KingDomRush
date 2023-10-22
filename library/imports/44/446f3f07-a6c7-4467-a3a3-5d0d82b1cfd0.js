"use strict";
cc._RF.push(module, '446f38HpsdEZ6OjXQ2Csc/Q', 'ChatDemo');
// Scripts/demo/ChatDemo.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIBase_1 = require("../../FrameWork/ui/UIBase");
var EmojiParser_1 = require("./EmojiParser");
var Message = /** @class */ (function () {
    function Message() {
        this.sender = null;
        this.senderIcon = null;
        this.msg = null;
        this.fromMe = false;
    }
    return Message;
}());
var ChatDemo = /** @class */ (function (_super) {
    __extends(ChatDemo, _super);
    function ChatDemo() {
        var _this = _super.call(this) || this;
        _this._list = null;
        _this._input = null;
        _this._emojiSelectUI = null;
        _this._messages = new Array();
        _this._emojiParser = new EmojiParser_1.default();
        return _this;
    }
    ChatDemo.prototype.onLoad = function () {
        this.loadMainGUI("Chat", "Main");
        this.guiMakeFullScreen();
        this._list = this.getGUIChild("list").asList;
        this._list.setVirtual();
        this._list.itemProvider = this.getListItemResource.bind(this);
        this._list.itemRenderer = this.renderListItem.bind(this);
        this._input = this.getGUIChild("input1").asTextInput;
        this._input.on(fgui.Event.Submit, this.onSubmit, this);
        this.buttonAddClickEvent("btnSend1", this.onClickSendBtn, this);
        this.buttonAddClickEvent("btnEmoji1", this.onClickEmojiBtn, this);
        this._emojiSelectUI = this.createGUIObject("EmojiSelectUI").asCom;
        this._emojiSelectUI.getChild("list").on(fgui.Event.CLICK_ITEM, this.onClickEmoji, this);
    };
    ChatDemo.prototype.addMsg = function (sender, senderIcon, msg, fromMe) {
        var isScrollBottom = this._list.scrollPane.isBottomMost;
        var newMessage = new Message();
        newMessage.sender = sender;
        newMessage.senderIcon = senderIcon;
        newMessage.msg = msg;
        newMessage.fromMe = fromMe;
        this._messages.push(newMessage);
        if (newMessage.fromMe) {
            if (this._messages.length == 1 || Math.random() < 0.5) {
                var replyMessage = new Message();
                replyMessage.sender = "FairyGUI";
                replyMessage.senderIcon = "r1";
                replyMessage.msg = "Today is a good day. [:gz]";
                replyMessage.fromMe = false;
                this._messages.push(replyMessage);
            }
        }
        if (this._messages.length > 100)
            this._messages.splice(0, this._messages.length - 100);
        this._list.numItems = this._messages.length;
        if (isScrollBottom)
            this._list.scrollPane.scrollBottom();
    };
    ChatDemo.prototype.getListItemResource = function (index) {
        var msg = this._messages[index];
        if (msg.fromMe)
            return "ui://Chat/chatRight";
        else
            return "ui://Chat/chatLeft";
    };
    ChatDemo.prototype.renderListItem = function (index, item) {
        var msg = this._messages[index];
        if (!msg.fromMe)
            item.getChild("name").text = msg.sender;
        var path = this.getGUIItemURL(msg.senderIcon);
        console.log(msg.senderIcon, path);
        item.icon = this.getGUIItemURL(msg.senderIcon);
        item.getChild("msg").text = this._emojiParser.parse(msg.msg);
    };
    ChatDemo.prototype.onClickSendBtn = function () {
        var msg = this._input.text;
        if (!msg)
            return;
        this.addMsg("Creator", "r0", msg, true);
        this._input.text = "";
    };
    ChatDemo.prototype.onClickEmojiBtn = function (evt) {
        fgui.GRoot.inst.showPopup(this._emojiSelectUI, evt.initiator, false);
    };
    ChatDemo.prototype.onClickEmoji = function (item) {
        this._input.text += "[:" + item.text + "]";
    };
    ChatDemo.prototype.onSubmit = function () {
        this.onClickSendBtn();
    };
    ChatDemo = __decorate([
        ccclass
    ], ChatDemo);
    return ChatDemo;
}(UIBase_1.default));
exports.default = ChatDemo;

cc._RF.pop();