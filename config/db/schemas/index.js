"use strict";

const QueryFile = require("pg-promise").QueryFile;
const path = require("path");

module.exports = {
  users: {
    create: sql("users/create.sql"),
    insert: sql("users/insert.sql"),
    empty:  sql("users/empty.sql"),
    seed:   sql("users/seed.sql")
  },
  companies:{
    create: sql("companies/create.sql"),
    insert: sql("companies/insert.sql")
  },
  stocks:{
    create: sql("stocks/create.sql"),
    insert: sql("stocks/insert.sql")
  },
  watchlists:{
    create: sql("watchlists/insert.sql"),
    create: sql("watchlists/create.sql")
  }
};

// Helper for linking to external query files;
function sql(file) {
  const fullPath = path.join(__dirname, file); // generating full path;

  const options = {
    // minifying the SQL is always advised;
    // see also option 'compress' in the API;
    minify: true,

    // Showing how to use static pre-formatting parameters -
    // we have variable 'schema' in each SQL (as an example);
    params: {
      schema: "public" // replace ${schema~} with "public". "public" owner
    }
  };

  const qf = new QueryFile(fullPath, options);

  if (qf.error) {
    // Something is wrong with our query file :(
    // Testing all files through queries can be cumbersome,
    // so we also report it here, while loading the module:
    console.error(qf.error);
  }

  return qf;

  // See QueryFile API:
  // http://vitaly-t.github.io/pg-promise/QueryFile.html
}
