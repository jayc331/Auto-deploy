# Auto-deploy
***

This is ideal for developers deploying apps to a server who wish to save time by simpy pushing new updates to a repo, and it automatically updating the program. You can use it with programs in any language theoretically, just change the setup and start commands in the config.

1. Clone this Github repository using [Git](https://git-scm.com/download)
```
git clone https://github.com/jayc331/Auto-deploy
cd Auto-deploy
```
2. Setup `config.json`
```json
{
    "repo": "https://github.com/<user>/<project>",
    "branch": "main",
    "start": "npm run start",
    "setup": "npm install",
    "frequency": 5000
}
```
3. Start the script using [NodeJS](https://modejs.org/en/download)
```
node index.js
```
