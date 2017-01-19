const lambdalocal = require('lambda-local');

it('fakes lambda', () => {
    lambdalocal.execute({
        event: { "key1": "value1", "key2": "value2", "key3": "value3" },
        lambdaPath: __dirname+'/lambda.js'
    });
});