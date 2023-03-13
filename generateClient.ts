import * as fs from 'fs';
import * as path from 'path';

const typeMaps = {
    "INT": "number",
    "TINYINT(1)": "boolean",
    "VARCHAR(64)": "string"
}

const sqlDir = path.resolve('sql');
const outputFile = `C:\\Users\\damlu\\Documents\\midis\\university-system-course-client\\src\\lib\\api\\index.ts`;


let generatedScript = `
const baseUrl = 'http://localhost:5050/';
function request(method: string, ...args: any[]): Promise<any[]> {
    return fetch(baseUrl + method, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(args)
    }).then(res=>res.json());
}

// Procedures

`

for (const sqlFile of fs.readdirSync(sqlDir)) {

    const content = fs.readFileSync(path.join(sqlDir, sqlFile), 'utf-8');

    if (content.startsWith("-- skip")) continue;

    generatedScript += '/// ' + sqlFile + "\n";

    const procedures = content.matchAll(/CREATE PROCEDURE `(?<procedure>.*)`\((?<args>.*)\)/gm);

    for (const procedure of procedures) {
        const procedureName = procedure[1];
        const procedureArgs = [];
        if (procedure[2]) {
            procedure[2].split(",").forEach(arg => {
                let [, name, type] = arg.trim().split(" ");
                name = name.replaceAll('`', '');
                type = typeMaps[type];
                procedureArgs.push({
                    name, type
                })
            });
        }

        generatedScript += `export function ${procedureName}(${procedureArgs.map(arg => `${arg.name}: ${arg.type}`).join()}){\n`;
        generatedScript += `\treturn request('${procedureName}', [${procedureArgs.map(arg => `${arg.name}`).join()}] );\n`
        generatedScript += "}\n";

    }

}

fs.writeFileSync(outputFile, generatedScript);

