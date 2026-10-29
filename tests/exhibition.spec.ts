import { test, expect } from '@playwright/test';
import { reflectionText, restoreReflection, storageKey } from '../src/data/reflection';
import { references } from '../src/data/book';
test('reflection templates, safe recovery and verified references',()=>{
 expect(reflectionText(['Kindness','Fairness','Courage']).choice).toBe('I choose kindness, fairness and courage.');
 expect(reflectionText(['Listening']).intention).toBe('I want to listen before judging.');
 expect(restoreReflection('broken').values).toEqual([]);
 expect(restoreReflection(JSON.stringify({values:['Kindness','Kindness','fake','Fairness','Courage','Listening'],action:'x'.repeat(200),created:true}))).toEqual({values:['Kindness','Fairness','Courage'],action:'x'.repeat(140),created:true});
 expect(references.every(r=>r.verified)).toBe(true);
 expect(references.find(r=>r.id==='care')?.summary).toContain('cousin');
 expect(references.some(r=>r.pages==='18–19'||r.pages==='38–39')).toBe(false);
});
test('three scenarios, back, switching paths, finish and restart',async({page})=>{
 await page.goto('./');await page.getByRole('button',{name:'Start the 2-minute journey'}).click();
 await expect(page.getByRole('button',{name:'Next →'})).toBeDisabled();
 await page.getByRole('button',{name:'Stay quiet because you feel nervous.'}).click();
 await expect(page.getByText('Feeling nervous is understandable.',{exact:false})).toBeVisible();
 await page.getByRole('button',{name:'Next →'}).click();
 await page.getByRole('button',{name:'← Back',exact:true}).click();
 await expect(page.getByRole('button',{name:'Stay quiet because you feel nervous.'})).toHaveAttribute('aria-pressed','true');
 await page.getByRole('button',{name:'Explore deeper Read, question, discuss'}).click();
 await expect(page.getByRole('button',{name:'Stay quiet because you feel nervous.'})).toHaveAttribute('aria-pressed','true');
 await page.getByRole('button',{name:'Next →'}).click();await page.getByRole('button',{name:'Speak to them privately afterward.'}).click();await page.getByRole('button',{name:'Next →'}).click();await page.getByRole('button',{name:'Ask why the rule exists.'}).click();await page.getByRole('button',{name:'Finish →'}).click();
 await expect(page.getByRole('heading',{name:'Different situations. Different choices.'})).toBeVisible();
 await page.getByRole('button',{name:'Restart',exact:true}).click();await expect(page.getByRole('button',{name:'Next →'})).toBeDisabled();
});
test('reflection limit, persistence, PNG, copy, edit and reset',async({page,context})=>{
 await context.grantPermissions(['clipboard-read','clipboard-write']);await page.goto('./');
 for(const name of ['Kindness','Fairness','Courage'])await page.getByRole('button',{name:new RegExp(name)}).click();
 await expect(page.getByRole('button',{name:/Listening/})).toBeDisabled();
 await page.getByLabel('What’s one small action').fill('I will listen before judging.');await page.getByRole('button',{name:'Create my reflection'}).click();
 await page.reload();await expect(page.getByText('I choose kindness, fairness and courage.',{exact:true})).toBeVisible();
 const downloadEvent=page.waitForEvent('download');await page.getByRole('button',{name:'Download PNG'}).click();const download=await downloadEvent;await download.saveAs('output/playwright/reflection.png');
 const fs=await import('node:fs/promises');const png=await fs.readFile('output/playwright/reflection.png');expect(png.readUInt32BE(16)).toBe(1080);expect(png.readUInt32BE(20)).toBe(1350);
 await page.getByRole('button',{name:'Copy text',exact:true}).click();await expect(page.getByRole('status')).toHaveText('Reflection copied.');expect(await page.evaluate(()=>navigator.clipboard.readText())).toContain('I will listen before judging.');
 await page.getByRole('button',{name:'Edit choices'}).click();await expect(page.getByRole('button',{name:/Kindness/})).toBeFocused();
 await page.getByRole('button',{name:'Create my reflection'}).click();await page.getByRole('button',{name:'Reset',exact:true}).click();expect(await page.evaluate(key=>localStorage.getItem(key),storageKey)).toBeNull();
 await page.reload();await expect(page.getByRole('button',{name:'Create my reflection'})).toBeDisabled();
});
test('storage denial, clear control and optional action',async({page})=>{
 await page.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new Error('Storage denied');}});});
 await page.goto('./');await page.getByRole('button',{name:/Understanding/}).click();await page.getByRole('button',{name:'Create my reflection'}).click();await expect(page.getByText('I choose understanding.',{exact:true})).toBeVisible();await expect(page.getByText('Browser storage is unavailable.',{exact:false})).toBeVisible();await page.getByRole('button',{name:'Clear my saved reflection'}).click();await expect(page.getByRole('button',{name:'Create my reflection'})).toBeDisabled();
});
test('deeper evidence, keyboard, base path, mobile layouts and screenshots',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));const failures:string[]=[];page.on('response',r=>{if(r.status()>=400)failures.push(r.url());});
 await page.goto('./');await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Skip to content'})).toBeFocused();await page.keyboard.press('Enter');
 await page.getByRole('button',{name:'Explore deeper Read, question, discuss'}).click();
 await page.locator('.theme summary').first().focus();await page.keyboard.press('Enter');await expect(page.locator('.theme').first()).toHaveAttribute('open','');
 await page.locator('.look-closer>summary').click();await page.getByText('See the book evidence').first().click();await expect(page.getByText('In the memoir · pp. 138–139').last()).toBeVisible();
 for(const width of [375,390,768,1024,1440]){await page.setViewportSize({width,height:950});await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await expect(page.locator('h1')).toBeInViewport();await page.screenshot({path:`output/playwright/hero-${width}.png`});await page.screenshot({path:`output/playwright/desktop-${width}.png`,fullPage:true});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),`overflow at ${width}`).toBe(true);}
 expect(errors).toEqual([]);expect(failures).toEqual([]);
});
test('maximum text export, corrupted storage and reduced motion',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('./');await page.evaluate(key=>localStorage.setItem(key,'not json'),storageKey);await page.reload();await expect(page.getByRole('button',{name:'Create my reflection'})).toBeDisabled();
 for(const name of ['Understanding','Responsibility','Courage'])await page.getByRole('button',{name:new RegExp(name)}).click();
 await page.getByLabel('What’s one small action').fill('W'.repeat(140));await page.getByRole('button',{name:'Create my reflection'}).click();const pending=page.waitForEvent('download');await page.getByRole('button',{name:'Download PNG'}).click();await (await pending).saveAs('output/playwright/reflection-long.png');
 expect(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');await page.getByRole('button',{name:'Clear my saved reflection'}).click();expect(await page.evaluate(key=>localStorage.getItem(key),storageKey)).toBeNull();
});
