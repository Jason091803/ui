const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src/app');

function walkDir(dir) {
    let results = [];
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

const files = walkDir(directoryPath);

files.forEach(file => {
   let content = fs.readFileSync(file, 'utf8');
   
   let changed = false;
   if(content.includes('#6B46C1')) { content = content.replace(/#6B46C1/g, 'var(--theme-primary)'); changed = true; }
   if(content.includes('#5a3ba3')) { content = content.replace(/#5a3ba3/g, 'var(--theme-secondary)'); changed = true; }
   if(content.includes('#4c2c8f')) { content = content.replace(/#4c2c8f/g, 'var(--theme-dark)'); changed = true; }
   if(content.includes('#4A148C')) { content = content.replace(/#4A148C/g, 'var(--theme-extra-dark)'); changed = true; }
   
   if(changed) {
       fs.writeFileSync(file, content);
   }
});

let indexCssPath = path.join(__dirname, 'src', 'index.css');
if (fs.existsSync(indexCssPath)) {
    let cssContent = fs.readFileSync(indexCssPath, 'utf8');
    if(!cssContent.includes('--theme-primary')) {
        cssContent = `
:root {
  --theme-primary: #6B46C1;
  --theme-secondary: #5a3ba3;
  --theme-dark: #4c2c8f;
  --theme-extra-dark: #4A148C;
}
` + cssContent;
        fs.writeFileSync(indexCssPath, cssContent);
    }
}
console.log('Colors Successfully Refactored to Variables!');
