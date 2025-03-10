const { Client } = require('pg');
require('dotenv').config();

async function setupDatabase() {
  // Connect to default postgres database
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'postgres', // Default database
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  try {
    console.log('Connecting to PostgreSQL...');
    await client.connect();
    console.log('✅ Connected to PostgreSQL');
    
    // Create the database
    try {
      await client.query(`CREATE DATABASE "Kidzfinancial"`);
      console.log('✅ Database "Kidzfinancial" created successfully');
    } catch (err) {
      if (err.code === '42P04') {
        console.log('ℹ️ Database "Kidzfinancial" already exists');
      } else {
        console.error('❌ Error creating database:', err);
      }
    }
    
    await client.end();
    console.log('First connection closed');
    
    // Now connect to Kidzfinancial database to create tables
    const dbClient = new Client({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: 'Kidzfinancial', // Connect to the database we just created
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });
    
    await dbClient.connect();
    console.log('✅ Connected to Kidzfinancial database');
    
    // Create zoom_tokens table
    try {
      await dbClient.query(`
        CREATE TABLE IF NOT EXISTS zoom_tokens (
          id INTEGER PRIMARY KEY,
          access_token TEXT NOT NULL,
          refresh_token TEXT NOT NULL
        );
      `);
      console.log('✅ zoom_tokens table created or already exists');
      
      // Insert zoom tokens data
      await dbClient.query(`
        INSERT INTO zoom_tokens (id, access_token, refresh_token) 
        VALUES (
          1, 
          'eyJzdiI6IjAwMDAwMiIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6ImNkN2I3NjczLWQ5MTYtNDIxZi1iNzU2LTEyYTlmY2JiNTYzOSJ9.eyJ2ZXIiOjEwLCJhdWlkIjoiOTljNDk5MDk2NGQ2YjI4ZmU5OGZlZDZkNjI5ZTMxYzIzZDdiOTdmODFkNTYwMWNkOTUxYzIxMjY1OTQ5ZjRiNCIsImNvZGUiOiJXNExveUpENWJBSjJXa3hqQU51UWd5Z29icU1MUU0ySVEiLCJpc3MiOiJ6bTpjaWQ6eElqdE92ZTdUSnVRbjAxU1VmSTYxdyIsImdubyI6MCwidHlwZSI6MCwidGlkIjoxLCJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiJKTUNoYXRzR1FpS0hQMXJZaUlvVnJ3IiwibmJmIjoxNzQwNTczNjQ4LCJleHAiOjE3NDA1NzcyNDgsImlhdCI6MTc0MDU3MzY0OCwiYWlkIjoiV2xFN0FMZXZSQlMzMTR5dXF2ZXNUZyJ9.eCRHorDZueIz_dnI3NbVlVcGQCF5kNcEIn2Kkx5O30VeNUjLJQimEF-ZEMsXeiD5D5ByDdVilfal50pOFCVtCw', 
          'eyJzdiI6IjAwMDAwMiIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6ImRlY2NjNzRjLTU0NjAtNGViZS04YzNiLWZjYWFhMTZkYjhkMCJ9.eyJ2ZXIiOjEwLCJhdWlkIjoiOTljNDk5MDk2NGQ2YjI4ZmU5OGZlZDZkNjI5ZTMxYzIzZDdiOTdmODFkNTYwMWNkOTUxYzIxMjY1OTQ5ZjRiNCIsImNvZGUiOiJXNExveUpENWJBSjJXa3hqQU51UWd5Z29icU1MUU0ySVEiLCJpc3MiOiJ6bTpjaWQ6eElqdE92ZTdUSnVRbjAxU1VmSTYxdyIsImdubyI6MCwidHlwZSI6MSwidGlkIjoxLCJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiJKTUNoYXRzR1FpS0hQMXJZaUlvVnJ3IiwibmJmIjoxNzQwNTczNjQ4LCJleHAiOjE3NDgzNDk2NDgsImlhdCI6MTc0MDU3MzY0OCwiYWlkIjoiV2xFN0FMZXZSQlMzMTR5dXF2ZXNUZyJ9.GCfVbGPloweHtrMCWlYA0TEaq-9GzcUGx__t8Ln_gIq6V39wjaJgo4C6I2pfGONJD6dTqm0oJjegKlFU7tRJsA'
        ) 
        ON CONFLICT (id) 
        DO UPDATE SET 
          access_token = EXCLUDED.access_token, 
          refresh_token = EXCLUDED.refresh_token;
      `);
      console.log('✅ Zoom tokens data inserted');
    } catch (err) {
      console.error('❌ Error with zoom_tokens:', err);
    }
    
    // Create meeting_slots table
    try {
      await dbClient.query(`
        CREATE TABLE IF NOT EXISTS meeting_slots (
          id SERIAL PRIMARY KEY,
          date DATE NOT NULL,
          time VARCHAR(10) NOT NULL,
          is_booked BOOLEAN DEFAULT false
        );
      `);
      console.log('✅ meeting_slots table created or already exists');
      
      // Insert meeting slots data
      await dbClient.query(`
        INSERT INTO meeting_slots (id, date, time, is_booked)
        VALUES
          (1, '2025-03-15', '16:00:00', FALSE),
          (3, '2025-03-15', '18:00:00', FALSE),
          (2, '2025-03-09', '17:00:00', FALSE),
          (4, '2025-03-16', '19:00:00', FALSE)
        ON CONFLICT (id)
        DO UPDATE SET
          date = EXCLUDED.date,
          time = EXCLUDED.time,
          is_booked = EXCLUDED.is_booked;
      `);
      console.log('✅ Meeting slots data inserted');
    } catch (err) {
      console.error('❌ Error with meeting_slots:', err);
    }
    
    // Test database connection by querying data
    try {
      const { rows: tokenRows } = await dbClient.query('SELECT id FROM zoom_tokens');
      console.log(`✅ Zoom tokens count: ${tokenRows.length}`);
      
      const { rows: slotRows } = await dbClient.query('SELECT id FROM meeting_slots');
      console.log(`✅ Meeting slots count: ${slotRows.length}`);
    } catch (err) {
      console.error('❌ Error testing data:', err);
    }
    
    await dbClient.end();
    console.log('✅ Database setup completed successfully');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error);
  }
}

setupDatabase();