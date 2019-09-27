const lambdaLocal = require("lambda-local");
const { Consumer } = require("sqs-consumer");

const app = Consumer.create({
  queueUrl: "http://localhost:4576/queue/test-sqs",
  handleMessage: async message => {
    const body = JSON.parse(message.Body);

    const jsonPayload = {
      Records: [
        {
          body: message.Body,
          messageAttributes: {
            messageType: {
              stringValue: message.MessageAttributes.messageType.StringValue
            }
          }
        }
      ]
    };

    lambdaLocal
      .execute({
        event: jsonPayload,
        lambdaPath: "./my-lambda-function/index.js", //your lambda function path
        timeoutMs: 3000,
        envfile: "./my-lambda-function/.env" //your lambda function env
      })
      .then(function(done) {
        console.log(done);
      })
      .catch(function(err) {
        console.error(err);
      });
  },
  messageAttributeNames: ["All"]
});

app.on("error", err => {
  console.error(err.message);
});

app.on("processing_error", err => {
  console.error(err.message);
});

app.start();
