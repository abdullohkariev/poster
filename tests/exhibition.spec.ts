import {test,expect} from '@playwright/test';
import {computeResult,restoreReflection,storageKey} from '../src/data/reflection';
import {references} from '../src/data/book';

test('reflection engine produces distinct, deterministic outcomes',()=>{
 const listener=computeResult([0,2,2],['Listening','Understanding']);
 const questioner=computeResult([1,1,0],['Fairness','Courage']);
 const protector=computeResult([2,3,3],['Responsibility','Courage']);
 expect(listener.primary.id).toBe('listener');expect(questioner.primary.id).toBe('questioner');expect(protector.primary.id).toBe('protector');
 expect(new Set([listener.interpretation,questioner.interpretation,protector.interpretation]).size).toBe(3);
 expect(computeResult([0,2,2],['Listening','Understanding'])).toEqual(listener);
 expect(computeResult([null,null,null],['Fairness']).primary.id).not.toBe(computeResult([null,null,null],['Kindness']).primary.id);
});
test('safe recovery and verified memoir correction',()=>{
 expect(restoreReflection('broken').answers).toEqual([null,null,null]);
 expect(restoreReflection(JSON.stringify({values:['Kindness','fake','Fairness'],answers:[99,1,2],action:'x'.repeat(200),created:true}))).toEqual({values:['Kindness','Fairness'],answers:[null,1,2],action:'x'.repeat(140),created:true});
 expect(references.every(r=>r.verified)).toBe(true);expect(references.find(r=>r.id==='care')?.summary).toContain('cousin');expect(references.some(r=>r.pages==='18–19'||r.pages==='38–39')).toBe(false);
});
test('intro plays once, can be skipped and replayed',async({page})=>{
 await page.goto('./');await expect(page.getByRole('dialog',{name:'Introduction'})).toBeVisible();await page.getByRole('button',{name:'Skip intro'}).click();await expect(page.getByRole('dialog')).toBeHidden();await page.reload();await expect(page.getByRole('dialog')).toHaveCount(0);await page.getByRole('button',{name:'Replay intro'}).click();await expect(page.getByRole('dialog')).toBeVisible();
});
test('reduced motion intro clears quickly',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('./');await expect(page.getByRole('dialog')).toBeVisible();await expect(page.getByRole('dialog')).toBeHidden({timeout:1200});
});
test('both paths and scenario progress work with clear recorded state',async({page})=>{
 await page.addInitScript(()=>sessionStorage.setItem('who-are-you:intro:seen','1'));await page.goto('./');await page.locator('.journey-options button').first().click();
 await expect(page.getByText('Chapter 1 of 3')).toBeVisible();await expect(page.getByRole('button',{name:/Next situation/})).toBeDisabled();await page.getByRole('button',{name:'Ask what evidence the group has.'}).click();await expect(page.getByText('Choice recorded')).toBeVisible();await expect(page.getByText('Fairness requires evidence, not repetition.')).toBeVisible();await page.getByRole('button',{name:/Next situation/}).click();await expect(page.getByText('Chapter 2 of 3')).toBeVisible();await page.getByRole('button',{name:'← Back'}).click();await expect(page.getByRole('button',{name:'Ask what evidence the group has.'})).toHaveAttribute('aria-pressed','true');
 await page.locator('.path-switch button').nth(1).click();await expect(page.getByText('Five ideas.')).toBeVisible();await expect(page.getByRole('button',{name:'Ask what evidence the group has.'})).toHaveAttribute('aria-pressed','true');
});
async function complete(page:import('@playwright/test').Page,choices:string[]){
 for(let i=0;i<3;i++){await page.getByRole('button',{name:choices[i]}).click();await page.getByRole('button',{name:i===2?/See what your choices suggest/:/Next situation/}).click();}
 await page.getByRole('button',{name:/Choose your values/}).click();
}
test('answers and values personalize, persist, copy, edit and clear',async({page,context})=>{
 await context.grantPermissions(['clipboard-read','clipboard-write']);await page.addInitScript(()=>sessionStorage.setItem('who-are-you:intro:seen','1'));await page.goto('./');await page.locator('.journey-options button').first().click();await complete(page,['Listen to the student privately.','Speak with the classmate privately afterward.','Ask affected students what support they want.']);
 for(const value of ['Listening','Understanding'])await page.getByRole('button',{name:new RegExp(value)}).click();await page.getByRole('button',{name:/Generate my reflection/}).click();await expect(page.getByRole('heading',{name:'THE LISTENER'})).toBeVisible();await expect(page.getByText('Secondary strength · THE SUPPORTER')).toBeVisible();await expect(page.getByText('Understanding starts by hearing what others have overlooked.',{exact:false})).toBeVisible();
 await page.reload();await expect(page.getByRole('heading',{name:'THE LISTENER'})).toBeVisible();await page.getByRole('button',{name:'Copy text'}).click();expect(await page.evaluate(()=>navigator.clipboard.readText())).toContain('THE LISTENER');await page.getByRole('button',{name:'Change answers'}).click();await expect(page.getByText('Chapter 1 of 3')).toBeVisible();await page.getByRole('button',{name:'Clear my saved reflection'}).click();expect(await page.evaluate(key=>localStorage.getItem(key),storageKey)).toBeNull();
});
test('three answer sets create visibly different result data and cards',async({page})=>{
 await page.addInitScript(()=>sessionStorage.setItem('who-are-you:intro:seen','1'));const sets=[{a:[0,2,2],v:['Listening','Understanding'],title:'THE LISTENER'},{a:[1,1,0],v:['Fairness','Courage'],title:'THE QUESTIONER'},{a:[2,3,3],v:['Responsibility','Courage'],title:'THE THOUGHTFUL PROTECTOR'}];
 for(const [i,set] of sets.entries()){await page.goto('./');await page.evaluate(({key,state})=>localStorage.setItem(key,JSON.stringify(state)),{key:storageKey,state:{answers:set.a,values:set.v,action:'',created:true}});await page.reload();await expect(page.getByRole('heading',{name:set.title})).toBeVisible();await page.locator('.reflection-card').screenshot({path:`output/playwright/result-${i}.png`});}
});
test('PNG export is 1080 × 1350 and long text remains exportable',async({page})=>{
 await page.addInitScript(()=>sessionStorage.setItem('who-are-you:intro:seen','1'));await page.goto('./');await page.evaluate(key=>localStorage.setItem(key,JSON.stringify({answers:[2,3,3],values:['Responsibility','Courage','Understanding'],action:'W'.repeat(140),created:true})),storageKey);await page.reload();const event=page.waitForEvent('download');await page.getByRole('button',{name:'Save image'}).click();const file=await event;await file.saveAs('output/playwright/reflection-v2.png');const fs=await import('node:fs/promises');const png=await fs.readFile('output/playwright/reflection-v2.png');expect(png.readUInt32BE(16)).toBe(1080);expect(png.readUInt32BE(20)).toBe(1350);
});
test('research accordions, citations and external links are correct',async({page})=>{
 await page.addInitScript(()=>sessionStorage.setItem('who-are-you:intro:seen','1'));await page.goto('./');await page.locator('.journey-options button').nth(1).click();await page.locator('.look-closer>summary').click();await page.getByText('See the book evidence').first().click();await expect(page.getByText('In the memoir · pp. 138–139').last()).toBeVisible();await page.getByText('Religion, culture & government').click();await expect(page.getByText(/Resolution 239 affirmed/)).toBeVisible();expect(await page.getByRole('link',{name:/UNESCO source/}).getAttribute('href')).toContain('unesco.org');expect(await page.getByRole('link',{name:/UNICEF/}).getAttribute('href')).toContain('unicef.org');expect(await page.getByRole('link',{name:/Resolution 239/}).getAttribute('href')).toContain('iifa-aifi.org');
});
test('mobile widths, base path, keyboard and resources are sound',async({page})=>{
 const errors:string[]=[];const failures:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)failures.push(r.url())});await page.addInitScript(()=>sessionStorage.setItem('who-are-you:intro:seen','1'));await page.goto('./');await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Skip to content'})).toBeFocused();
 for(const width of [375,390,768,1024,1440]){await page.setViewportSize({width,height:950});await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await expect(page.locator('h1')).toBeInViewport();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow at ${width}`).toBe(true);await page.screenshot({path:`output/playwright/v2-${width}.png`,fullPage:width===375});}
 expect(page.url()).toContain('/poster/');expect(errors).toEqual([]);expect(failures).toEqual([]);
});
test('localStorage denial keeps current session usable',async({page})=>{
 await page.addInitScript(()=>{sessionStorage.setItem('who-are-you:intro:seen','1');Object.defineProperty(window,'localStorage',{get(){throw new Error('denied')}})});await page.goto('./');await page.locator('.journey-options button').first().click();await page.getByRole('button',{name:'Listen to the student privately.'}).click();await expect(page.getByText('Choice recorded')).toBeVisible();
});
