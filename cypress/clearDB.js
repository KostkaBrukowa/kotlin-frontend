(async function () {
  const { Client } = require('pg');
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres_demo',
    password: 'admin',
    port: 5432,
  });
  await client.connect();

  await client.query(
    `
            TRUNCATE TABLE
                bulk_payment_messages,
                payment_messages,
                expense_messages,
                party_messages,
                party_user,
                friends,
                bulk_payments,
                expenses,
                notifications,
              parties ,
              party_requests ,
              payments,
              users `,
  );
  await client.end();
})();
