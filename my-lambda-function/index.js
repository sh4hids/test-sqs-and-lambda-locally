const messageTypes = {
  SAY_HELLO: "SAY_HELLO"
};

module.exports.handler = async event => {
  try {
    const { body, messageAttributes } = event;
    let response;

    let messageBody, messageType;

    event.Records.forEach(record => {
      const { body, messageAttributes } = record;

      messageBody = JSON.parse(body);
      messageType = messageAttributes.messageType
        ? messageAttributes.messageType.stringValue
        : null;
    });

    switch (messageType) {
      case messageTypes.SAY_HELLO:
        response = { type: messageTypes.SAY_HELLO, payload: messageBody };
        break;

      default:
        console.log("message type not found");
        throw new Error("message type not found");
    }

    return response;
  } catch (error) {
    throw error;
  }
};
