require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const fs = require('fs/promises');
const path = require('path');
const db = require('./db');

async function runSqlFile(filePath, label) {
  const sql = await fs.readFile(filePath, 'utf8');

  console.log(`Running ${label}...`);
  await db.query(sql);
  console.log(`${label} completed.`);
}

async function setupDatabase() {
  try {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const seedPath = path.join(__dirname, 'seed.sql');

    await runSqlFile(schemaPath, 'schema.sql');
    await runSqlFile(seedPath, 'seed.sql');

    console.log('Database setup finished successfully.');
  } catch (err) {
    console.error('Failed:', err);
  } finally {
    await db.end();
  }
}

setupDatabase();