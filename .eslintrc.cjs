require('dotenv-safe').config({
  path: './.env',
});

module.exports = {
  extends: ['@upleveled/upleveled'],

  plugins: ['@ts-safeql/eslint-plugin'],

  rules: {
    '@ts-safeql/check-sql': [
      'error',
      {
        connections: [
          {
            // The URL of the database:
            // databaseUrl:
            databaseUrl: `postgres://${process.env.PGUSERNAME}:${process.env.PGPASSWORD}@${process.env.PGHOST}:5432/${process.env.PGDATABASE}`,

            // The name of the variable that holds the connection:
            tagName: 'sql',

            // Transform data
            fieldTransform: 'camel',

            // Postgres.js type should be an array, so we add an extra "[]" after the generated type:
            transform: '${type}[]',
          },
        ],
      },
    ],
  },
};
