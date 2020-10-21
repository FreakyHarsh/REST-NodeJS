let environment = {
    development: {
        port: 3000,
        environmentName: 'development'
    },
    production: {
        port: 5000,
        environmentName: 'production'
    }
};

// environment.development = {
//     port: 3000,
//     environmentName: 'development'
// };

// environment.production = {
//     port: 5000,
//     environmentName: 'production'
// };

let currentEnvMode = typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : 'ff';
console.log(currentEnvMode);
let envToExport = typeof environment[currentEnvMode] === 'object' ? environment[currentEnvMode] : environment.development;

module.exports = envToExport;
