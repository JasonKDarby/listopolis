export const deleteList = (userId, id, client, callback) => {

    console.log(`Deleting list with id=${id} and userId=${userId}.`);

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            'id': id,
            'userId': userId
        }
    };

    client.delete(params, (error, result) => {
        if(error) {

            console.error(error);
            callback(new Error('Unable to delete list.'));
        } else {

            console.log('Delete returned result:', result);

            callback(null, null);
        }
    });
};