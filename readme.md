
# Set up enviroment
```
cp .env.example .env
```
# How to run source code

```
npm i # to install packages
npm start # to run server
```

# For Production
```
# Install PM2
npm install -g pm2

# Run
pm2 start bin/www

## cluster
pm2 start bin/www -i max
```