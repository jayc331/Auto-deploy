const { exec } = require("child_process");

exec("git describe --abbrev=7 --always  --long --match v* master", (err, stdout, stderr) => {
    if (err) return console.error(err);
    else if (stderr) return console.error(stderr);
    const local = stdout.toString().trim();
    console.log(local);
    
    exec("git describe --abbrev=7 --always  --long --match v* master", (err, stdout, stderr) => {
        if (err) return console.error(err);
        else if (stderr) return console.error(stderr);
        const origin = stdout.toString().trim();
        console.log(origin);

        console.log(local === origin);
        
    })  
})