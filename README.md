# Next.js Example - Spring 2022

- Next.js
- Postgres.js
- Jest
- Playwright
- GitHub Actions

## Database Setup

Copy the `.env.example` file to a new file called `.env` (ignored from Git) and fill in the necessary information.

Follow the instructions from the PostgreSQL step in [UpLeveled's System Setup Instructions](https://github.com/upleveled/system-setup/blob/master/readme.md).

Then, connect to the built-in `postgres` database as administrator in order to create the database:

**Windows**

If it asks for a password, use `postgres`.

```bash
psql -U postgres
```

**macOS**

```bash
psql postgres
```

**Linux**

```bash
sudo -u postgres psql
```

Once you have connected, run the following to create the database:

```sql
CREATE DATABASE <database name>;
CREATE USER <user name> WITH ENCRYPTED PASSWORD '<user password>';
GRANT ALL PRIVILEGES ON DATABASE <database name> TO <user name>;
```

Quit `psql` using the following command:

```bash
\q
```

On Linux, you will also need to create a Linux system user with a name matching the user name you used in the database. It will prompt you to create a password for the user - choose the same password as for the database above.

```bash
sudo adduser <user name>
```

Once you're ready to use the new user, reconnect using the following command.

**Windows and macOS:**

```bash
psql -U <user name> <database name>
```

**Linux:**

```bash
sudo -u <user name> psql -U <user name> <database name>
```

### Running the migrations

To set up the structure and the content of the database, run the migrations using Ley:

```bash
yarn migrate up
```

To reverse the last single migration, run:

```bash
yarn migrate down
```

## API Design

Base URL (development): http://localhost:3000/api/

1. Reading all users: `GET /animals` ===> api/animals/index.js
2. Creating a new user: `POST /animals` ===> api/animals/index.js

3. Reading a single user: `GET /animals/:id` ===> api/animals/[animalId].js
4. Deleting a user: `DELETE /animals/:id` ===> api/animals/[animalId].js
5. Updating a user: `PUT /animals/:id` ===> api/animals/[animalId].js

## Testing 

### Update
Since the testing lecture, we recognized that `playwright` is missing in the `devDependencies`, and we deleted the `babel.config.js` and set up Jest with the Rust Compiler.
https://nextjs.org/docs/testing#setting-up-jest-with-the-rust-compiler

1. If `playwright` is not in your `devDependencies`, please run `yarn add --dev playwright`
2. Delete `babel.config.js`
3. Run `yarn add --dev jest @testing-library/react @testing-library/jest-dom`
4. Copy `jest.config.js` file. https://github.dev/upleveled/next-js-example-spring-2022/blob/main/jest.config.js

Make sure that you have all the `dependencies/devDependencies` added to your `package.json` file. 
https://github.dev/upleveled/next-js-example-spring-2022/blob/main/package.json
