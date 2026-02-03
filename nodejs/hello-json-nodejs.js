#!/usr/bin/env node

console.log("Cache-Control: no-cache");
console.log("Content-Type: application/json\n");

const date = new Date();
const ip = process.env.REMOTE_ADDR || "Unknown";

const message = {
    title: "Hello NodeJS!",
    heading: "Hello NodeJS from Sarah!",
    message: "This page was generated with NodeJS",
    time: date.toISOString(),
    IP: ip
};

console.log(JSON.stringify(message, null, 2));
