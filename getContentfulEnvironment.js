const contentfulManagement = require("contentful-management");

module.exports = function () {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: 'CFPAT-i6uyRr8ToDC8S-K0f-u925MqoWrHVzfjrqpg0fbPTZE',
  });

  return contentfulClient
    .getSpace('mz67fdwejs5a')
    .then((space) => space.getEnvironment('master'));
};
