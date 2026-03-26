const fs = require('fs');

function updatePage(filename, propsName, functionName) {
  try {
    let code = fs.readFileSync(filename, 'utf8');
    
    // Add to interface
    code = code.replace(new RegExp(`(interface ${propsName} {[\\s\\S]*?)(})`), `$1  onNavigateToSettings?: () => void;\n$2`);
    
    // Add to props destructuring
    code = code.replace(new RegExp(`(export default function ${functionName}\\(\\{ [\\s\\S]*?)(}: ${propsName}\\))`), `$1, onNavigateToSettings $2`);
    
    // Add onClick to Settings button
    const oldBtnReg = /<button className="flex flex-col items-center gap-1 text-gray-400">\s*<Settings className="w-6 h-6" \/>\s*<span className="text-xs">Settings<\/span>\s*<\/button>/;
    const newBtn = `<button\n            onClick={onNavigateToSettings}\n            className="flex flex-col items-center gap-1 text-gray-400 transition-colors hover:text-gray-600"\n          >\n            <Settings className="w-6 h-6" />\n            <span className="text-xs">Settings</span>\n          </button>`;
    
    if (oldBtnReg.test(code)) {
        code = code.replace(oldBtnReg, newBtn);
    } else {
        console.warn(`Could not find button pattern in ${filename}.`);
    }
    
    fs.writeFileSync(filename, code);
  } catch(e) { console.error(e) }
}

updatePage('src/app/components/HomePage.tsx', 'HomePageProps', 'HomePage');
updatePage('src/app/components/ConnectionsPage.tsx', 'ConnectionsPageProps', 'ConnectionsPage');
updatePage('src/app/components/ActivitiesPage.tsx', 'ActivitiesPageProps', 'ActivitiesPage');
updatePage('src/app/components/CalendarPage.tsx', 'CalendarPageProps', 'CalendarPage');
updatePage('src/app/components/DataPage.tsx', 'DataPageProps', 'DataPage');

// App.tsx update
try {
  let app = fs.readFileSync('src/app/App.tsx', 'utf8');
  if(!app.includes("SettingsPage")) {
      app = app.replace("import DataPage from './components/DataPage';", "import DataPage from './components/DataPage';\nimport SettingsPage from './components/SettingsPage';");
      app = app.replace(/'data'/g, "'data' | 'settings'");

      app = app.replace(/<HomePage([\s\S]+?)\/>/g, `<HomePage$1  onNavigateToSettings={() => setCurrentPage('settings')}\n        />`);
      app = app.replace(/<DataPage([\s\S]+?)\/>/g, `<DataPage$1  onNavigateToSettings={() => setCurrentPage('settings')}\n        />`);
      app = app.replace(/<CalendarPage([\s\S]+?)\/>/g, `<CalendarPage$1  onNavigateToSettings={() => setCurrentPage('settings')}\n        />`);
      app = app.replace(/<ConnectionsPage([\s\S]+?)\/>/g, `<ConnectionsPage$1  onNavigateToSettings={() => setCurrentPage('settings')}\n        />`);
      app = app.replace(/<ActivitiesPage([\s\S]+?)\/>/g, `<ActivitiesPage$1  onNavigateToSettings={() => setCurrentPage('settings')}\n        />`);

      const settingsRoute = `) : currentPage === 'settings' ? (
        <SettingsPage
          onNavigateToHome={() => setCurrentPage('home')}
          onNavigateToConnections={() => setCurrentPage('connections')}
          onNavigateToActivities={() => setCurrentPage('activities')}
          onNavigateToCalendar={() => setCurrentPage('calendar')}
          onNavigateToData={() => setCurrentPage('data')}
          onNavigateToLogin={() => setCurrentPage('login')}
        />
      ) : currentPage === 'full-symptom-list' ? (`;

      app = app.replace(/\) : currentPage === 'full-symptom-list' \? \(/g, settingsRoute);

      fs.writeFileSync('src/app/App.tsx', app);
      console.log('App.tsx Updated!');
  }
} catch(e) { console.error('Error on App.tsx:', e); }

console.log('Done!');
