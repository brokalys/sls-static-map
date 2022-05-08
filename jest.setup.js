jest.mock('aws-sdk', () => {
  const DynamoDB = jest.fn();
  DynamoDB.DocumentClient = jest.fn().mockReturnValue({
    batchGet: jest.fn().mockReturnValue({ promise: jest.fn() }),
    put: jest.fn().mockReturnValue({ promise: jest.fn() }),
  });

  return {
    DynamoDB,
    SQS: jest.fn().mockReturnValue({
      sendMessage: jest.fn().mockReturnValue({ promise: jest.fn() }),
    }),
  };
});

jest.mock('axios');

process.env.CACHE_DYNAMODB_TABLE_NAME = 'dynamo-table-name';

// Fake API key
process.env.BUGSNAG_KEY = '8b93fbfe33771146a3769536ead44162';
