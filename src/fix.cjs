const fs = require('fs');
const path = require('path');

// We are now safely inside /src directory, so targeted path is simply app/components or app
const directoryPath = 'app';

function walkDir(dir) {
    let results = [];
    if(!fs.existsSync(dir)) {
        console.error("Critical: Directory not found: " + dir);
        return results;
    }
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walkDir(file));
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            results.push(file);
        }
    });
    return results;
}

try {
    const files = walkDir(directoryPath);
    let modifiedCount = 0;
    console.log("Found files count:", files.length);

    files.forEach(file => {
       let content = fs.readFileSync(file, 'utf8');
       
       if(content.includes('[var(--theme-')) {
           let newContent = content;
           newContent = newContent.split('[color:var(--theme-').join('[var(--theme-');
           
           newContent = newContent.split('[var(--theme-primary)]').join('[color:var(--theme-primary)]');
           newContent = newContent.split('[var(--theme-secondary)]').join('[color:var(--theme-secondary)]');
           newContent = newContent.split('[var(--theme-dark)]').join('[color:var(--theme-dark)]');
           newContent = newContent.split('[var(--theme-extra-dark)]').join('[color:var(--theme-extra-dark)]');
           
           if (content !== newContent) {
               fs.writeFileSync(file, newContent);
               modifiedCount++;
           }
       }
    });

    console.log(`Successfully mapped colors in ${modifiedCount} files!`);
} catch(e) {
    console.error("Script execution failed:", e.message);
}
