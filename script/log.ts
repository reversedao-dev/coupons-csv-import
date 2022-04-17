const fs = require('fs');

export function LogResponse(data: any, filePath: string): void {
    filePath = filePath.slice(1, filePath.length );
    console.log(`Saving log at ${filePath}`)
    fs.writeFileSync(`${filePath}/log.json`, JSON.stringify(data), 'utf-8', (err: any) => {
        if (err) console.log('Error in logging response', err);
    });    
}
