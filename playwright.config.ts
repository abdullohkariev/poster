import { defineConfig } from '@playwright/test';
import { existsSync } from 'node:fs';
const localBrowser='C:/Users/User/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe';
export default defineConfig({testDir:'./tests',fullyParallel:false,workers:1,reporter:'list',use:{baseURL:'http://127.0.0.1:4173/poster/',headless:true,launchOptions:{executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE||(existsSync(localBrowser)?localBrowser:undefined)}},webServer:{command:`${process.platform==='win32'?'npm.cmd':'npm'} run preview -- --port 4173`,url:'http://127.0.0.1:4173/poster/',reuseExistingServer:true}});
