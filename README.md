# Auto-deploy

This is ideal for developers on a schedule. Any changes pushed to a repo will be automatically fetched by the program, saving you time which is better spent elsewhere. In theory, it is also compatible with near enough every language, just edit the setup and start commands in the config.

## Example

![image](https://user-images.githubusercontent.com/105918957/175330044-fed8608e-e3c2-4b8d-9ab6-48b0fedcef71.png)

## Installation

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
    "frequency": 5,
    "verbose": false
}
```
3. Start the script using [NodeJS](https://nodejs.org/en/download/)
```
node index.js
```
