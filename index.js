const { access, rm } = require("fs/promises")
const { exec, fork } = require("child_process");
const path = require("path");

const config = require("./config.json");

let app;

const dir = `${path.dirname(require.main.filename).replaceAll("\\", "/")}/`;
const repo_dir = dir + "repo/";

start();

async function start() {

    validate_config(config)
        
        .then(() => scan())
        
        .catch(console.error);

}

async function sleep(ms) {

    return new Promise((resolve) => setTimeout(resolve, ms));

}


async function get_version(cwd = repo_dir, remote = false) {

    return execute(`git rev-parse --short --verify ${remote ? "origin/" : ""}${config.branch}`, { cwd });

}


async function validate_config() {

    const repo = config.repo.match(/(https?:\/{2}github\.com\/.+?\/([^\/]+))\/?/);

    if (!config.repo) throw new Error("[@] Github repository not provided!")

    else config.repo = repo[1];

    if (!config.branch) throw new Error("[@] Github branch not provided!");

    if (!config.start) throw new Error("[@] Start command not provided!");

    if (!config.setup) console.warn("[!] Setup command not provided.");

    if (config.frequency > 1000) console.warn("[!] The scan frequency should be in seconds. The value provided is VERY HIGH!");

    return true;
}


async function match_version(cwd = repo_dir) {

    await execute("git remote update", { cwd })
        
        .catch((res) => console.log("[-] " + res.split("\n")[1].trim()));

    const remote = await get_version(cwd, true), local = await get_version(cwd, false);
    
    return remote === local;
}


async function match_origin(cwd = repo_dir) {

    const origin = await execute("git remote get-url origin", { cwd })
    
        .catch(console.error);

    return config.repo === origin;

}


async function fork_app(cwd = repo_dir) {

    if (app && !app?.killed) return console.warn("[!] App has already been terminated.");

    console.log("[.] Preparing environment.");

    await execute("npm install", { cwd })

        .then(() => {

            if (config.verbose) console.log("[+] Environment avaialble for use.")

        })
    
        .catch(console.warn);

    console.log("[.] Initialising child process.");

    return app = fork(cwd, config.start.split(/ +/g)).addListener("spawn", () =>  console.log("[+] Process spawned successfully."));

}


async function clone(repo = config.repo, cwd = dir) {

    return execute(`git clone ${repo} repo`, { cwd });

}


function execute(command, options = {}) {

    return new Promise((resolve, reject) => {

        if (config.verbose) console.log("Executing:", command)

        exec(command, options,
            
            (err, stdout, stderr) => {

                if (err) reject(err);

                else if (stderr) reject(stderr);

                else resolve(stdout.trim());

            });

    });

}


function remove_dir(dir = repo_dir) {

    return new Promise(async (resolve, reject) => {

        rm(dir, { recursive: true, force: true },

            (err) => {

                if (err) reject(err);

            })

            .then(() => resolve(true))

    })

}


function repo_exists(dir = repo_dir) {

    return new Promise((resolve) => {

        access(dir)
        
            .then(() => resolve(true))

            .catch(() => {

                console.warn("[!] Repository folder not found.");

                resolve(false);

            });

    })

}


async function reset_app() {

    if (app && !app.killed) {

        console.log("[.] Attempting app termination.");

        if (app.kill()) {
            
            if (config.verbose) console.log("[+] App terminated successfully.");

        }

        else throw new Error("[@] Something went wrong while terminating app.");

    }

    if (config.verbose) console.log("[.] Removing remaining files.");

    await remove_dir()

        .then(() => {
            
            if (config.verbose) console.log("[+] Outdated files removed.");
            
        })

        .catch(new Error);

    console.log("[.] Cloning up-to-date repository.");

    await clone(config.repo)

        .catch(() => {
            
            if (config.verbose) console.log("[+] Repository cloned successfully.")
            
        })

}


async function scan() {

    if (!await repo_exists()) await reset_app();

    else if (!await match_origin() || !await match_version()) await reset_app();

    else if (config.verbose) console.debug("[+] Your branch is on the latest commit.")

    if (!app || app.killed) await fork_app();

    return sleep(config.frequency * 1000)
    
        .then(() => scan());

}
