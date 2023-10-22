"use strict";
cc._RF.push(module, '4f77fuF75NN94jUGBWq744F', 'util');
// FrameWork/Utils/util.ts

"use strict";
// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.util = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var util = /** @class */ (function () {
    function util() {
    }
    /**
     * !#zh 拷贝object。
     */
    util.clone = function (sObj) {
        if (sObj === null || typeof sObj !== "object") {
            return sObj;
        }
        var s = {};
        if (sObj.constructor === Array) {
            s = [];
        }
        for (var i in sObj) {
            if (sObj.hasOwnProperty(i)) {
                s[i] = this.clone(sObj[i]);
            }
        }
        return s;
    };
    /**
     * 将object转化为数组。
     */
    util.objectToArray = function (srcObj) {
        var resultArr = [];
        // to array
        for (var key in srcObj) {
            if (!srcObj.hasOwnProperty(key)) {
                continue;
            }
            resultArr.push(srcObj[key]);
        }
        return resultArr;
    };
    /**
     * !#zh 将数组转化为object。
     */
    util.arrayToObject = function (srcObj, objectKey) {
        var resultObj = {};
        // to object
        for (var key in srcObj) {
            if (!srcObj.hasOwnProperty(key) || !srcObj[key][objectKey]) {
                continue;
            }
            resultObj[srcObj[key][objectKey]] = srcObj[key];
        }
        return resultObj;
    };
    // 根据权重,计算随机内容
    util.getWeightRandIndex = function (weightArr, totalWeight) {
        var randWeight = Math.floor(Math.random() * totalWeight);
        var sum = 0;
        for (var weightIndex = 0; weightIndex < weightArr.length; weightIndex++) {
            sum += weightArr[weightIndex];
            if (randWeight < sum) {
                break;
            }
        }
        return weightIndex;
    };
    /**
     * 从n个数中获取m个随机数
     * @param {Number} n   总数
     * @param {Number} m    获取数
     * @returns {Array} array   获取数列
     */
    util.getRandomNFromM = function (n, m) {
        var array = [];
        var intRd = 0;
        var count = 0;
        while (count < m) {
            if (count >= n + 1) {
                break;
            }
            intRd = this.getRandomInt(0, n);
            var flag = 0;
            for (var i = 0; i < count; i++) {
                if (array[i] === intRd) {
                    flag = 1;
                    break;
                }
            }
            if (flag === 0) {
                array[count] = intRd;
                count++;
            }
        }
        return array;
    };
    util.getRandomInt = function (min, max) {
        var r = Math.random();
        var rr = r * (max - min + 1) + min;
        return Math.floor(rr);
    };
    util.getStringLength = function (render) {
        var strArr = render;
        var len = 0;
        for (var i = 0, n = strArr.length; i < n; i++) {
            var val = strArr.charCodeAt(i);
            if (val <= 255) {
                len = len + 1;
            }
            else {
                len = len + 2;
            }
        }
        return Math.ceil(len / 2);
    };
    /**
     * 判断传入的参数是否为空的Object。数组或undefined会返回false
     * @param obj
     */
    util.isEmptyObject = function (obj) {
        var result = true;
        if (obj && obj.constructor === Object) {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    result = false;
                    break;
                }
            }
        }
        else {
            result = false;
        }
        return result;
    };
    util.formatNum = function (num) {
        // 0 和负数均返回 NaN。特殊处理。
        if (num <= 0) {
            return '0';
        }
        var k = 1000;
        var sizes = ['', '', 'K', 'M', 'B'];
        var i = Math.round(Math.log(num) / Math.log(k));
        return parseInt((num / (Math.pow(k, i - 1 < 0 ? 0 : i - 1))).toString(), 10) + sizes[i];
    };
    /**
     * 判断是否是新的一天
     * @param {Object|Number} dateValue 时间对象 todo MessageCenter 与 pve 相关的时间存储建议改为 Date 类型
     * @returns {boolean}
     */
    util.isNewDay = function (dateValue) {
        // todo：是否需要判断时区？
        var oldDate = new Date(dateValue);
        var curDate = new Date();
        var oldYear = oldDate.getFullYear();
        var oldMonth = oldDate.getMonth();
        var oldDay = oldDate.getDate();
        var curYear = curDate.getFullYear();
        var curMonth = curDate.getMonth();
        var curDay = curDate.getDate();
        if (curYear > oldYear) {
            return true;
        }
        else {
            if (curMonth > oldMonth) {
                return true;
            }
            else {
                if (curDay > oldDay) {
                    return true;
                }
            }
        }
        return false;
    };
    util.getPropertyCount = function (o) {
        var n, count = 0;
        for (n in o) {
            if (o.hasOwnProperty(n)) {
                count++;
            }
        }
        return count;
    };
    /**
     * 返回一个差异化数组（将array中diff里的值去掉）
     * @param array
     * @param diff
     */
    util.difference = function (array, diff) {
        var result = [];
        if (array.constructor !== Array || diff.constructor !== Array) {
            return result;
        }
        var length = array.length;
        for (var i = 0; i < length; i++) {
            if (diff.indexOf(array[i]) === -1) {
                result.push(array[i]);
            }
        }
        return result;
    };
    //public method for encoding
    util.base64encode = function (input) {
        var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var output = "", chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;
        input = this.utf8Encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            }
            else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                keyStr.charAt(enc3) + keyStr.charAt(enc4);
        }
        return output;
    };
    // private method for UTF-8 encoding
    util.utf8Encode = function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    };
    util.base64Decode = function (input) {
        var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var output = "";
        var chr1;
        var chr2;
        var chr3;
        var enc1;
        var enc2;
        var enc3;
        var enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = keyStr.indexOf(input.charAt(i++));
            enc2 = keyStr.indexOf(input.charAt(i++));
            enc3 = keyStr.indexOf(input.charAt(i++));
            enc4 = keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = this.utf8Decode(output);
        return output;
    };
    util.utf8Decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = 0;
        var c1 = 0;
        var c2 = 0;
        var c3 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    };
    util.remove = function (array, predicate) {
        var result = [];
        var indexes = [];
        array.forEach(function (item, index) {
            if (predicate(item)) {
                result.push(item);
                indexes.push(index);
            }
        });
        this.basePullAt(array, indexes);
        return result;
    };
    util.basePullAt = function (array, indexes) {
        var length = array ? indexes.length : 0;
        var lastIndex = length - 1;
        var previous;
        while (length--) {
            var index = indexes[length];
            if (length === lastIndex || index !== previous) {
                previous = index;
                Array.prototype.splice.call(array, index, 1);
            }
        }
        return array;
    };
    util.stringToArray = function (string) {
        // 用于判断emoji的正则们
        var rsAstralRange = '\\ud800-\\udfff';
        var rsZWJ = '\\u200d';
        var rsVarRange = '\\ufe0e\\ufe0f';
        var rsComboMarksRange = '\\u0300-\\u036f';
        var reComboHalfMarksRange = '\\ufe20-\\ufe2f';
        var rsComboSymbolsRange = '\\u20d0-\\u20ff';
        var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
        var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + ']');
        var rsFitz = '\\ud83c[\\udffb-\\udfff]';
        var rsOptVar = '[' + rsVarRange + ']?';
        var rsCombo = '[' + rsComboRange + ']';
        var rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')';
        var reOptMod = rsModifier + '?';
        var rsAstral = '[' + rsAstralRange + ']';
        var rsNonAstral = '[^' + rsAstralRange + ']';
        var rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}';
        var rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]';
        var rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*';
        var rsSeq = rsOptVar + reOptMod + rsOptJoin;
        var rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';
        var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');
        var hasUnicode = function (val) {
            return reHasUnicode.test(val);
        };
        var unicodeToArray = function (val) {
            return val.match(reUnicode) || [];
        };
        var asciiToArray = function (val) {
            return val.split('');
        };
        return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
    };
    // 模拟传msg的uuid
    util.simulationUUID = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };
    util.trim = function (str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    };
    /**
     * 判断当前时间是否在有效时间内
     * @param {String|Number} start 起始时间。带有时区信息
     * @param {String|Number} end 结束时间。带有时区信息
     */
    util.isNowValid = function (start, end) {
        var startTime = new Date(start);
        var endTime = new Date(end);
        var result = false;
        if (startTime.getDate() + '' !== 'NaN' && endTime.getDate() + '' !== 'NaN') {
            var curDate = new Date();
            result = curDate < endTime && curDate > startTime;
        }
        return result;
    };
    util.getDeltaDays = function (start, end) {
        start = new Date(start);
        end = new Date(end);
        var startYear = start.getFullYear();
        var startMonth = start.getMonth() + 1;
        var startDate = start.getDate();
        var endYear = end.getFullYear();
        var endMonth = end.getMonth() + 1;
        var endDate = end.getDate();
        start = new Date(startYear + '/' + startMonth + '/' + startDate + ' GMT+0800').getTime();
        end = new Date(endYear + '/' + endMonth + '/' + endDate + ' GMT+0800').getTime();
        var deltaTime = end - start;
        return Math.floor(deltaTime / (24 * 60 * 60 * 1000));
    };
    util.getMin = function (array) {
        var result = null;
        if (array.constructor === Array) {
            var length = array.length;
            for (var i = 0; i < length; i++) {
                if (i === 0) {
                    result = Number(array[0]);
                }
                else {
                    result = result > Number(array[i]) ? Number(array[i]) : result;
                }
            }
        }
        return result;
    };
    util.formatTwoDigits = function (time) {
        return (Array(2).join("0") + time).slice(-2);
    };
    util.formatDate = function (date, fmt) {
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    /**
     * 获取格式化后的日期（不含小时分秒）
     */
    util.getDay = function () {
        var date = new Date();
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    };
    util.formatName = function (name, limit) {
        limit = limit || 6;
        var nameArray = this.stringToArray(name);
        var str = '';
        var length = nameArray.length;
        if (length > limit) {
            for (var i = 0; i < limit; i++) {
                str += nameArray[i];
            }
            str += '...';
        }
        else {
            str = name;
        }
        return str;
    };
    /**
     * 格式化钱数，超过10000 转换位 10K   10000K 转换为 10M
     */
    util.formatMoney = function (money) {
        var arrUnit = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y', 'B', 'N', 'D'];
        var strValue = '';
        for (var idx = 0; idx < arrUnit.length; idx++) {
            if (money >= 10000) {
                money /= 1000;
            }
            else {
                strValue = Math.floor(money) + arrUnit[idx];
                break;
            }
        }
        if (strValue === '') {
            strValue = Math.floor(money) + 'U'; //超过最大值就加个U
        }
        return strValue;
    };
    util.formatValue = function (value) {
        var arrUnit = [];
        var strValue = '';
        for (var i = 0; i < 26; i++) {
            arrUnit.push(String.fromCharCode(97 + i));
        }
        for (var idx = 0; idx < arrUnit.length; idx++) {
            if (value >= 10000) {
                value /= 1000;
            }
            else {
                strValue = Math.floor(value) + arrUnit[idx];
                break;
            }
        }
        return strValue;
    };
    /**
     * 根据剩余秒数格式化剩余时间 返回 HH:MM:SS
     * @param {Number} leftSec
     */
    util.formatTimeForSecond = function (leftSec, withoutSeconds) {
        if (withoutSeconds === void 0) { withoutSeconds = false; }
        var timeStr = '';
        var sec = leftSec % 60;
        var leftMin = Math.floor(leftSec / 60);
        leftMin = leftMin < 0 ? 0 : leftMin;
        var hour = Math.floor(leftMin / 60);
        var min = leftMin % 60;
        if (hour > 0) {
            timeStr += hour > 9 ? hour.toString() : '0' + hour;
            timeStr += ':';
        }
        else {
            timeStr += '00:';
        }
        timeStr += min > 9 ? min.toString() : '0' + min;
        if (!withoutSeconds) {
            timeStr += ':';
            timeStr += sec > 9 ? sec.toString() : '0' + sec;
        }
        return timeStr;
    };
    /**
     *  根据剩余毫秒数格式化剩余时间 返回 HH:MM:SS
     *
     * @param {Number} ms
     */
    util.formatTimeForMillisecond = function (ms) {
        var second = Math.floor(ms / 1000 % 60);
        var minute = Math.floor(ms / 1000 / 60 % 60);
        var hour = Math.floor(ms / 1000 / 60 / 60);
        // let strSecond = second < 10 ? '0' + second : second;
        // let strMinute = minute < 10 ? '0' + minute : minute;
        // let strHour = hour < 10 ? '0' + hour : hour;
        // return `${strSecond}:${strMinute}:${strHour}`;
        return { 'hour': hour, 'minute': minute, 'second': second };
    };
    /**
     * TODO 需要将pako进行引入，目前已经去除了压缩算法的需要，如需要使用需引入库文件
     * 将字符串进行压缩
     * @param {String} str
     */
    util.zip = function (str) {
        var binaryString = pako.gzip(encodeURIComponent(str), { to: 'string' });
        return this.base64encode(binaryString);
    };
    /**
     * todo 目前已经去除了压缩算法的需要，如需要使用需引入库文件
     * 将数据进行解压
     * @param {String} b64Data
     */
    util.unZip = function (b64Data) {
        var strData = this.base64Decode(b64Data);
        // Convert binary string to character-number array
        var charData = strData.split('').map(function (x) { return x.charCodeAt(0); });
        // Turn number array into byte-array
        var binData = new Uint8Array(charData);
        // // unzip
        var data = pako.inflate(binData);
        // Convert gunzipped byteArray back to ascii string:
        strData = String.fromCharCode.apply(null, new Uint16Array(data));
        return decodeURIComponent(strData);
    };
    /**
     * 数据加密
     * @param {String} str
     */
    util.encrypt = function (str) {
        var b64Data = this.base64encode(str);
        var n = 6;
        if (b64Data.length % 2 === 0) {
            n = 7;
        }
        var encodeData = '';
        for (var idx = 0; idx < (b64Data.length - n + 1) / 2; idx++) {
            encodeData += b64Data[2 * idx + 1];
            encodeData += b64Data[2 * idx];
        }
        encodeData += b64Data.slice(b64Data.length - n + 1);
        return encodeData;
    };
    /**
     * 数据解密
     * @param {String} b64Data
     */
    util.decrypt = function (b64Data) {
        var n = 6;
        if (b64Data.length % 2 === 0) {
            n = 7;
        }
        var decodeData = '';
        for (var idx = 0; idx < b64Data.length - n; idx += 2) {
            decodeData += b64Data[idx + 1];
            decodeData += b64Data[idx];
        }
        decodeData += b64Data.slice(b64Data.length - n + 1);
        decodeData = this.base64Decode(decodeData);
        return decodeData;
    };
    util.rand = function (arr) {
        var arrClone = this.clone(arr);
        // 首先从最大的数开始遍历，之后递减
        for (var i = arrClone.length - 1; i >= 0; i--) {
            // 随机索引值randomIndex是从0-arrClone.length中随机抽取的
            var randomIndex = Math.floor(Math.random() * (i + 1));
            // 下面三句相当于把从数组中随机抽取到的值与当前遍历的值互换位置
            var itemIndex = arrClone[randomIndex];
            arrClone[randomIndex] = arrClone[i];
            arrClone[i] = itemIndex;
        }
        // 每一次的遍历都相当于把从数组中随机抽取（不重复）的一个元素放到数组的最后面（索引顺序为：len-1,len-2,len-3......0）
        return arrClone;
    };
    /**
     * 获得开始和结束两者之间相隔分钟数
     *
     * @static
     * @param {number} start
     * @param {number} end
     * @memberof Util
     */
    util.getOffsetMimutes = function (start, end) {
        var offSetTime = end - start;
        var minute = Math.floor((offSetTime % (1000 * 60 * 60)) / (1000 * 60));
        return minute;
    };
    /**
     * 返回指定小数位的数值
     * @param num
     * @param idx
     */
    util.formatNumToFixed = function (num, idx) {
        if (idx === void 0) { idx = 0; }
        return Number(num.toFixed(idx));
    };
    util.lerp = function (targetValue, curValue, ratio) {
        if (ratio === void 0) { ratio = 0.25; }
        var v = curValue;
        if (targetValue > curValue) {
            v = curValue + (targetValue - curValue) * ratio;
        }
        else if (targetValue < curValue) {
            v = curValue - (curValue - targetValue) * ratio;
        }
        return v;
    };
    util = __decorate([
        ccclass
    ], util);
    return util;
}());
exports.util = util;

cc._RF.pop();