# mmi-endpoints
endpoints

- Setup
    * clone repo    
    * cd repo
    * npm install

- Production Setup
    * clone repo
    * sudo chown -R $USER:$(id -gn $USER) repo
    * npm install

- Requirements
    * linux server
    * node v12 or higher
    * npm v6 or higher
    * pm2 system process management (https://pm2.keymetrics.io/docs/usage/quick-start/)

- PM2 Startup
    *  PRODUCTION=true pm2 start bin/mmi-endpoint-server --name endpoint-server -i 3(number of cluster)