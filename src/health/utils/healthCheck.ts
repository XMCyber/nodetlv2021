import * as os from "os";

function fetchStats(): void {

    let stats:object={};
    let freeMemMb = (os.freemem() / 1024);
    stats['freeMemMb'] = freeMemMb;
    let freeMemPercentage = (os.freemem() / os.totalmem()) * 100;
    stats['freeMemPercentage'] = freeMemPercentage;
    let nodeProcessMemUsage = process.memoryUsage();
    stats['nodeProcessMemUsage'] = nodeProcessMemUsage;
    console.log(stats);

}

fetchStats()