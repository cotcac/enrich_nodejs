exports.name = 'ABC';
exports.name1 = 'ABCD';

const printName = function(name) {
    console.log('hello ' + name);
}
exports.print_name = printName;