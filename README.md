# <div style="text-align: center; display: flex; justify-content: center; align-items: center;">![alt text](https://github.com/Chuan-Chen/inventory-manager/blob/main/logo.png?raw=true "Shelfy") <br><b>Shelfy</b></br> </div>
- Inventory Management system. 
- Intergrated with Ollama3 support. 
- run ```npm run dev``` to start client and server

# Server enviroment variables
- Setup server enviorment variables before running.
```js
MONGO_URI = ""
PORT = 3000
GITHUB_OAUTH_CLIENT_ID = ""
GITHUB_OAUTH_CLIENT_SECRET = ""
ACCESS_TOKEN_SECRET = 
REFRESH_ACCESS_TOKEN_SECRET = 
OPEN_WEBUI_JWT = 
NODEMAILER_APP_PASSWORD = 
```
------------------
NODEMAILER_APP_PASSWORD and NODEMAILER_APP_USERNAME ([ref](https://www.nodemailer.com/smtp/)) is used for contact me section of the app.


``` js
const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.NODEMAILER_APP_USERNAME,
        pass: process.env.NODEMAILER_APP_PASSWORD
    } 
})
```
------------------
# Client enviroment variables
- Setup Client enviorment variables before running.
``` js
VITE_APP_BACKEND_API = "http://localhost:3000"
```


-----------------
# Demo

![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png)

![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png)

![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png)

![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png)

![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png)

![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png)
