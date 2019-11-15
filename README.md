# Test SQS and Lambda Locally

I suppose your local AWS SQS and Lambda are up and running and you have created a SQS queue. First clone this repo and go the cloned repository:

```bash
$ git clone https://github.com/sh4hids/test-sqs-and-lambda-locally.git
$ cd test-sqs-and-lambda-locally
```

Run `npm i` to install `lambda-local` and `sqs-consumer`.

Then go to the `my-sqs-message` folder on a separate terminal window or tab. Run `npm i` to install necessary dependencies (i.e. `aws-sdk`, `koa`).

Run `npm start` to run the `koa` server (it will trigger our SQS send message call, this is just an example.).

Finally, on the other terminal tab run `npm start` to start the SQS listener.

Now if you send a get request to `http://localhost:8888` you'll see your lambda function has been triggered.
