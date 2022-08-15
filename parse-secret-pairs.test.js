const { parseSecretPairs } = require('./parse-secret-pairs');

describe('util function for parsing secrets input', () => {
  test('parse single key value pair', () => {
    const actual = parseSecretPairs(`KEY=VALUE`);

    expect(actual).toEqual([
      {
        key: 'KEY',
        value: 'VALUE',
      },
    ]);
  });

  test('parse key pairs', () => {
    const input = `
        KEY=VALUE
        KEY2=VALUE2==
           /ui/key3 =  VALUE3
           
    `;
    const actual = parseSecretPairs(input);

    expect(actual).toEqual([
      {
        key: 'KEY',
        value: 'VALUE',
      },
      {
        key: 'KEY2',
        value: 'VALUE2==',
      },
      {
        key: '/ui/key3',
        value: 'VALUE3',
      },
    ]);
  });
});
