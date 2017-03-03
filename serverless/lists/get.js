export const getList = (userId, id, client, callback) => {

    console.log(`Querying for list with id=${id} and userId=${userId}.`);

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        //We have to query on userId to prevent cross user lists.
        KeyConditionExpression: 'id = :id AND userId = :uid',
        ExpressionAttributeValues: {
            ':uid': userId,
            ':id': id
        }
    };

    client.query(params, (error, result) => {
        if(error) {

            console.error(error);
            callback(new Error('Unable to fetch list.'));
        } else {

            console.log('Query returned result:', result);

            let list = null;

            if (result.Count === 1) {
                const item = result.Items[0];
                list = {
                    id: item.id,
                    title: item.title,
                    lines: item.lines
                };
            } else if(result.Count > 1) callback(new Error('Returned multiple results.'));
            else {
                //returned 0 results, address it in the handler
            }

            callback(null, list);
        }
    });
};