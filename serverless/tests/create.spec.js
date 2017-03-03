import { createList } from '../lists/create';
import { dummyList, dummyUserId } from './dummyData';

test('Create list', async () => {

    const uuidValidator = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

    let id = null;

    await createList(
        dummyUserId,
        dummyList,
        {
            put: (params, callback) => {
                expect(params.TableName).toBe(process.env.DYNAMODB_TABLE);
                expect(uuidValidator.test(params.Item.id));
                id = params.Item.id;
                expect(params.Item.title).toBe(dummyList.title);
                expect(params.Item.userId).toBe(dummyUserId);
                expect(params.Item.createdAt).toBe(params.Item.updatedAt);
                callback();
            }
        },
        (error, response) => {
            expect(error).toBeFalsy();
            expect(response.id).toBe(id);
    });
});
