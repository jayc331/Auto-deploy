# Auto-deploy

This is ideal for developers on a schedule. Any changes pushed to a repo will be automatically fetched by the program, saving you time which is better spent elsewhere. In theory, it is also compatible with near enough every language, just edit the setup and start commands in the config.

## Example

![2KVraXIhRBik8BVrGTLf-Q](https://user-images.githubusercontent.com/105918957/175129644-bd18363c-b210-495c-834a-be82b28ac61f.png)

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
    "frequency": 5
}
```
3. Start the script using [NodeJS](https://nodejs.org/en/download/)
```
node index.js
```
