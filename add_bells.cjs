const fs = require('fs');
const path = require('path');

function rep(file, oldStr, newStr) {
    try {
        const fullPath = path.resolve(__dirname, file);
        let text = fs.readFileSync(fullPath, 'utf8');
        text = text.replace(/\r\n/g, '\n'); // Normalize newlines
        
        if (text.includes(oldStr)) {
            text = text.replace(oldStr, newStr);
            fs.writeFileSync(fullPath, text);
            console.log(`Successfully patched: ${file}`);
        } else {
            console.log(`Could not find target string in ${file}`);
        }
    } catch (e) {
        console.error(`Error processing ${file}: ${e.message}`);
    }
}

// 1. SettingsPage
rep('src/app/components/SettingsPage.tsx', 
    '<h1 className="text-xl font-bold flex-1 text-center pr-8">Settings</h1>',
    '<h1 className="text-xl font-bold absolute left-1/2 -translate-x-1/2">Settings</h1>\n        <button className="text-gray-500 hover:text-[color:var(--theme-primary)] transition-colors relative p-1 mt-0.5">\n          <Bell className="w-5 h-5" />\n          <span className="absolute top-1.5 right-1 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>\n        </button>'
);

// 2. ActivitiesPage
rep('src/app/components/ActivitiesPage.tsx',
    '<h1 className="text-xl mx-auto font-semibold pr-6">Activities</h1>',
    '<h1 className="text-xl font-semibold absolute left-1/2 -translate-x-1/2 text-center w-full pointer-events-none">Activities</h1>\n        <button className="text-gray-500 hover:text-[color:var(--theme-primary)] transition-colors relative z-10">\n          <Bell className="w-6 h-6" />\n          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>\n        </button>'
);
rep('src/app/components/ActivitiesPage.tsx',
    '<header className="bg-white px-4 py-4 flex items-center shadow-sm pb-2">',
    '<header className="bg-white px-4 py-4 flex items-center shadow-sm pb-2 justify-between w-full">'
);

// 3. CalendarPage
rep('src/app/components/CalendarPage.tsx',
    '<h1 className="text-2xl mx-auto pr-6">Calendar</h1>',
    '<h1 className="text-2xl font-semibold absolute left-1/2 -translate-x-1/2 w-full text-center pointer-events-none">Calendar</h1>\n          <button className="text-gray-500 hover:text-[color:var(--theme-primary)] transition-colors relative z-10">\n            <Bell className="w-6 h-6" />\n            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>\n          </button>'
);
rep('src/app/components/CalendarPage.tsx',
    '<div className="flex items-center mb-6">',
    '<div className="flex items-center justify-between mb-6">'
);

// 4. DataPage
rep('src/app/components/DataPage.tsx',
    '<h1 className="text-2xl mx-auto pr-6">Data Overview</h1>',
    '<h1 className="text-2xl font-semibold absolute left-1/2 -translate-x-1/2 w-full text-center pointer-events-none">Data Overview</h1>\n          <button className="text-gray-500 hover:text-[color:var(--theme-primary)] transition-colors relative z-10">\n            <Bell className="w-6 h-6" />\n            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-[#F5F1E8]"></span>\n          </button>'
);
rep('src/app/components/DataPage.tsx',
    '<header className="bg-[#F5F1E8] px-4 py-4">\n        <div className="flex items-center">',
    '<header className="bg-[#F5F1E8] px-4 py-4">\n        <div className="flex items-center justify-between">'
);

// 5. DoctorHomePage
try {
    let file = 'src/app/components/DoctorHomePage.tsx';
    const fullPath = path.resolve(__dirname, file);
    let d = fs.readFileSync(fullPath, 'utf8');
    d = d.replace(/\r\n/g, '\n');
    d = d.replace("import { LogOut, Home, Users, ListChecks, CheckSquare, Settings, ChevronRight, AlertTriangle, Circle } from 'lucide-react';", 
               "import { LogOut, Home, Users, ListChecks, CheckSquare, Settings, ChevronRight, AlertTriangle, Circle, Bell } from 'lucide-react';");
    d = d.replace('<div className="px-5 py-5 pb-2">', 
               '<div className="px-5 py-5 pb-2 flex justify-between items-center">');
    d = d.replace(/Log out\n\s*<\/button>/, 
               'Log out\n        </button>\n        <button className="text-gray-500 hover:text-[color:var(--theme-primary)] transition-colors relative -mr-1">\n          <Bell className="w-6 h-6" />\n          <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full border border-[#FDFBF7]"></span>\n        </button>');
    fs.writeFileSync(fullPath, d);
    console.log("Successfully patched: src/app/components/DoctorHomePage.tsx")
} catch(e) {
    console.log("Error with DoctorHomePage: ", e.message);
}

console.log('Script injection complete');
