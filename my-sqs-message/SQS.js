const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });
const queue = new AWS.SQS({ apiVersion: "2012-11-05" });

const sendMessageSayHello = (body, messageType = "SAY_HELLO") => {
  const messageParams = {
    MessageBody: JSON.stringify(body),
    QueueUrl: "http://localhost:4576/queue/test-sqs",
    MessageAttributes: {
      messageType: {
        DataType: "String",
        StringValue: messageType
      }
    }
  };

  const sqsRequest = queue.sendMessage(messageParams);
  const sqsPromise = sqsRequest.promise();
  return sqsPromise.then(
    data => {
      console.log("From SQS: start");
      console.log(data);
      console.log("From SQS: end");
    },
    error => {
      console.log(error);
      throw {
        status: 500,
        message: `SQS message ${messageType} failed`,
        error
      };
    }
  );
};

module.exports = {
  sendMessageSayHello
};
