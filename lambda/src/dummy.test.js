import LambdaTester from 'lambda-tester';
import Dummy from './dummy';

test('dummy test', () => {
    return LambdaTester(Dummy.dummyHandler)
        .event({key1: "1", key2: "2", key3: "3"})
        .expectSucceed(
            (result) => {
                console.log(result);
                expect(result).toBe("Hello World");
            });
});