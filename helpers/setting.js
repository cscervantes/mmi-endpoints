module.exports = {
    mysql: {
        host: "192.168.3.40",
        user: "mmdbadmin",
        password: "@9%N5V*v?4)6ufy30qtUx_=>7JG1aOznE-Y!CoA^wBp&TD",
        database: "ts_mediameter",
        //adding timeouts
        connectTimeout: 59000
    },
    mysql2: {
        host: "127.0.0.1",
        user: "root",
        password: "m3d1@m3terDb",
        database: "mmi_scraper_2020",
        //adding timeouts
        connectTimeout: 59000
    },
    mongodb : {
        production: {
            host: 'mongo1', // primary
            host2: 'mongo2', // secondary
            host3: 'mongo3', // secondary
            user: 'mongo-admin',
            db: 'mmi_scraper_2020',
            pass: 'Ew5mj4B5^sie136A423n7519H',
        },
        development: {
            host: 'localhost:27017',
            db: 'mmi_scraper_2020'
        },
        options: {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            autoIndex: false, // Don't build indexes
            // reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
            // reconnectInterval: 500, // Reconnect every 500ms
            poolSize: 10000, // Maintain up to 10 socket connections
            // If not connected, return errors immediately rather than waiting for reconnect
            bufferMaxEntries: 0,
            // connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
            connectTimeoutMS: 59000, // Give up initial connection after 10 seconds
            // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            socketTimeoutMS: 59000, // Close sockets after 45 seconds of inactivity
            family: 4 // Use IPv4, skip trying IPv6
        }
    }
}