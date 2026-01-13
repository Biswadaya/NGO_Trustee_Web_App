/// <reference types="node" />

console.log('Checking process...');
if (process.env.NODE_ENV) {
    console.log(`Environment: ${process.env.NODE_ENV}`);
} else {
    console.log('NODE_ENV not set');
}
console.log('Process ID:', process.pid);
