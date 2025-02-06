const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
const sns = new AWS.SNS();
const s3 = new AWS.S3();

const BUCKET_NAME = process.env.SHOPS_BUCKET;
const SNS_TOPIC_ARN = process.env.SHOP_LOGS_TOPIC;

exports.handler = async (event) => {
  try {
    const createShopDto = JSON.parse(event.body);

    const newShop = {
      id: uuidv4(),
      name: createShopDto.name,
      income: createShopDto.income,
      openedAt: createShopDto.openedAt,
      location: createShopDto.location,
    };

    const params = {
      Bucket: BUCKET_NAME,
      Key: `shops/${newShop.id}.json`,
      Body: JSON.stringify(newShop),
      ContentType: 'application/json',
    };

    await s3.putObject(params).promise();

    await sns.publish({
      Message: JSON.stringify({ shop: newShop, operation: 'CREATE' }),
      TopicArn: SNS_TOPIC_ARN,
    }).promise();

    return {
      statusCode: 201,
      body: JSON.stringify(newShop),
    };
  } catch (error) {
    console.error('Error creating shop:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};
