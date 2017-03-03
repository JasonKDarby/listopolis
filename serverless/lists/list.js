export const listLists = (userId, client, callback) => {

    console.log(`Scanning for lists with userId=${userId}.`);

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        FilterExpression: 'userId = :uid',
        ExpressionAttributeValues: {
            ':uid': userId
        }
    };

    client.scan(params, (error, result) => {
        if(error) {

            console.error(error);
            callback(new Error('Unable to fetch lists.'));
        } else {

            const lists = [];
            result.Items.forEach((item) => lists.push({id: item.id, title: item.title}));

            callback(null, lists);
        }
    });
};