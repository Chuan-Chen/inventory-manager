# Intro
- Inventory Management system. 
- Intergrated with Open WEBUI with Ollama3 support. 
- run ```npm run dev``` to start client and server

# Server enviroment variables
- Setup server enviorment variables before running
```
MONGO_URI = ""
PORT = 3000
GITHUB_OAUTH_CLIENT_ID = ""
GITHUB_OAUTH_CLIENT_SECRET = ""
ACCESS_TOKEN_SECRET = 
REFRESH_ACCESS_TOKEN_SECRET = 
OPEN_WEBUI_JWT = 
NODEMAILER_APP_PASSWORD = 
```

NODEMAILER_APP_PASSWORD is used for contact me section of the app.


# Issues
- [ ] Currently on http1 needs to update to -> http2 for 100 concurrent SSE connections
- [ ] Implementing backend AI compability using llama3, self-hosted
