const app = require("./app");
const pool = require("./config/db");

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await pool.query("SELECT NOW()");
        console.log("✅ PostgreSQL Connected Successfully");

        app.listen(PORT, () => {
            console.log(`🚀 Royal Vision Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("❌ Database Connection Failed");
        console.error(err.message);
    }
}

startServer();