/**
 * This serves as a utility to cd into the client directory and run the webpack development server. 
 * This is because in Windows CMD, you can't do something like "cd client && yarn start".
 */
const args = [ 'start' ];
const opts = { stdio: 'inherit', cwd: 'client', shell: true };
require('child_process').spawn('yarn', args, opts);