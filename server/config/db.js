const dbUser = process.env.dbUser || 'prototype';
const dbPass = process.env.dbPass || 'prototype';

module.exports = {
  url: `mongodb://${dbUser}:${dbPass}@ds133746.mlab.com:33746/prototype`
};
