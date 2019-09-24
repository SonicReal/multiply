let a = '80';
let b = '20';

function getCascade(a, b) {
    const cascade = [];
    for (let i = b.length - 1; i >= 0; i--) {
        let buf = 0;
        let part = '';
        for (let j = a.length - 1; j >= 0; j--) {
            let mul = (parseInt(b[i], 10) * parseInt(a[j], 10) + buf).toString();
            part = part + mul[mul.length - 1];
            buf = parseInt(mul[mul.length - 2]) || 0;
        }
        if (buf) {
            part = part + buf;
        }
        cascade.push(Array(b.length - i).join(' ') + part);
    }
    return cascade;
}


module.exports = function multiply(first, second) {
    if (second.length > first.length) {
        let tmp = second;
        second = first;
        first = tmp;
    }
    const a = first;
    const b = second;
    const cascade = getCascade(a, b);
    let result = '';
    let buf = 0;
    for (let i = 0; i < cascade[cascade.length - 1].length; i++) {
        let sum = 0;
        for (let j = 0; j < cascade.length; j++) {
            let num = cascade[j][i] ? parseInt(cascade[j][i]) : 0;
            sum += (num || 0) + buf;
            buf = 0;

        }
        let string_sum = sum.toString();
        result = result + string_sum[string_sum.length - 1];
        buf = Math.floor(sum / 10);
    }
    if (buf) {
        result += buf.toString();
    }
    return result.split('').reverse().join('');

}
