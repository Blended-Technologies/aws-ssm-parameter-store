module.exports.parseSecretPairs = (input) => {
  const parseLine = (line) => {
    const separatorIdx = line.indexOf('=');

    if (separatorIdx === -1) {
      throw new Error(`Cannot parse the secret pair '${line}'. Secret pairs must be of the form NAME=value.`);
    }

    return {
      key: line.substring(0, separatorIdx).trim(),
      value: line.substring(separatorIdx + 1).trim(),
    };
  };

  return input
    .split('\n')
    .filter((l) => l.trim() !== '')
    .map(parseLine);
};
