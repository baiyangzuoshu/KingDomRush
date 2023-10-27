
export default class Utils {
    // [start, end] 范围内的整数
    public static random_int(start:number, end:number) {
        var num = start + Math.random() * (end - start + 1); // [0, 1]
        num = Math.floor(num);
        if (num > end) {
            num = end;
        }
        
        return num;
    }
}
