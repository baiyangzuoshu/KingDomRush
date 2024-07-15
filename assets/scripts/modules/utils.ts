var utils = {
    // [start, end] 范围内的整数
    random_int: function(start, end) {
        var num = start + Math.random() * (end - start + 1); // [0, 1]
        num = Math.floor(num);
        if (num > end) {
            num = end;
        }
        
        return num;
    },
    
    
};

module.exports = utils;