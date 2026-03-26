const fs = require('fs');

function rep(file, oldStr, newStr) {
    try {
        let text = fs.readFileSync(file, 'utf8');
        if (text.includes(oldStr)) {
            text = text.replace(oldStr, newStr);
            fs.writeFileSync(file, text);
            console.log(`Successfully patched: ${file}`);
        } else {
            console.log(`Could not find target string in ${file}`);
        }
    } catch (e) {
        console.error(`Error processing ${file}: ${e.message}`);
    }
}

// 1. SettingsPage
rep('../components/SettingsPage.tsx', 
    '<h1 className="text-xl font-bold flex-1 text-center pr-8">Settings</h1>',
    '<h1 className="text-xl font-bold absolute left-1/2 -translate-x-1/2">Settings</h1>\n        <button className="text-gray-500 hover:text-[color:var(--theme-primary)] transition-colors relative p-1 mt-0.5">\n          <Bell className="w-5 h-5" />\n          <span className="absolute top-1.5 right-1 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>\n        </button>'
);

// 2. ActivitiesPage
rep('../components/ActivitiesPage.tsx',
    '<h1 className="text-xl mx-auto font-semibold pr-6">Activities</h1>',
    '<h1 className="text-xl font-semibold absolute left-1/2 -translate-x-1/2 text-center w-full pointer-events-none">Activities</h1>\n        <button className="text-gray-500 hover:text-[color:var(--theme-primary)] transition-colors relative z-10">\n          <Bell className="w-6 h-6" />\n          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>\n        </button>'
);
rep('../components/ActivitiesPage.tsx',
    '<header className="bg-white px-4 py-4 flex items-center shadow-sm pb-2">',
    '<header className="bg-white px-4 py-4 flex items-center shadow-sm pb-2 justify-between w-full">'
);

// 3. CalendarPage
rep('../components/CalendarPage.tsx',
    '<h1 className="text-2xl mx-auto pr-6">Calendar</h1>',
    '<h1 className="text-2xl font-semibold absolute left-1/2 -translate-x-1/2 w-full text-center pointer-events-none">Calendar</h1>\n          <button className="text-gray-500 hover:text-[color:var(--theme-primary)] transition-colors relative z-10">\n            <Bell className="w-6 h-6" />\n            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>\n          </button>'
);
rep('../components/CalendarPage.tsx',
    '<div className="flex items-center mb-6">',
    '<div className="flex items-center justify-between mb-6">'
);

// 4. DataPage
rep('../components/DataPage.tsx',
    '<h1 className="text-2xl mx-auto pr-6">Data Overview</h1>',
    '<h1 className="text-2xl font-semibold absolute left-1/2 -translate-x-1/2 w-full text-center pointer-events-none">Data Overview</h1>\n          <button className="text-gray-500 hover:text-[color:var(--theme-primary)] transition-colors relative z-10">\n            <Bell className="w-6 h-6" />\n            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-[#F5F1E8]"></span>\n          </button>'
);
rep('../components/DataPage.tsx',
    '<div className="flex items-center">',
    '<div className="flex items-center justify-between">'
);

// 5. DoctorHomePage
try {
    let d = fs.readFileSync('../components/DoctorHomePage.tsx', 'utf8');
    d = d.replace("import { LogOut, Home, Users, ListChecks, CheckSquare, Settings, ChevronRight, AlertTriangle, Circle } from 'lucide-react';", 
               "import { LogOut, Home, Users, ListChecks, CheckSquare, Settings, ChevronRight, AlertTriangle, Circle, Bell } from 'lucide-react';");
    d = d.replace('<div className="px-5 py-5 pb-2">', 
               '<div className="px-5 py-5 pb-2 flex justify-between items-center">');
    d = d.replace(/Log out\r?\n\s*<\/button>/, 
               'Log out\n        </button>\n        <button className="text-gray-500 hover:text-[color:var(--theme-primary)] transition-colors relative -mr-1">\n          <Bell className="w-6 h-6" />\n          <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full border border-[#FDFBF7]"></span>\n        </button>');
    fs.writeFileSync('../components/DoctorHomePage.tsx', d);
    console.log("Successfully patched: ../components/DoctorHomePage.tsx")
} catch(e) {
    console.log("Error with DoctorHomePage: ", e.message);
}

console.log('Script injection complete');
