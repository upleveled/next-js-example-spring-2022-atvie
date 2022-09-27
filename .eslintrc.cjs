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
            databaseUrl:
              'postgres://next_js_example_spring_2022:next_js_example_spring_2022@localhost:5432/next_js_example_spring_2022',

            // The name of the variable that holds the connection:
            tagName: 'sql',

            // Transform data
            // fieldTransform: 'camel',

            // Postgres.js type should be an array, so we add an extra "[]" after the generated type:
            transform: '${type}[]',
          },
        ],
      },
    ],
  },
};
