"use strict";
cc._RF.push(module, 'f6804T6gwhDhIJypOCmAkSr', 'EmojiParser');
// Scripts/demo/EmojiParser.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
var EmojiParser = /** @class */ (function (_super) {
    __extends(EmojiParser, _super);
    function EmojiParser() {
        var _this = _super.call(this) || this;
        EmojiParser.TAGS.forEach(function (element) {
            _this._handlers[":" + element] = _this.onTag_Emoji;
        });
        return _this;
    }
    EmojiParser.prototype.onTag_Emoji = function (tagName, end, attr) {
        return "<img src='" + fgui.UIPackage.getItemURL("Chat", tagName.substring(1).toLowerCase()) + "'/>";
    };
    EmojiParser.TAGS = ["88", "am", "bs", "bz", "ch", "cool", "dhq", "dn", "fd", "gz", "han", "hx", "hxiao", "hxiu"];
    return EmojiParser;
}(fgui.UBBParser));
exports.default = EmojiParser;

cc._RF.pop();