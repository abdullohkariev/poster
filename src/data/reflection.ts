import { scenarios } from './scenarios';
export const values=['Kindness','Fairness','Courage','Listening','Understanding','Responsibility'] as const;
export type Value=typeof values[number];
export type ReflectionStyle='listener'|'supporter'|'questioner'|'advocate'|'protector';
export interface ReflectionState{values:Value[];action:string;created:boolean;answers:(number|null)[]}
export interface StyleDefinition{id:ReflectionStyle;title:string;idea:string;action:string;accent:string;surface:string}
export interface ReflectionResult{primary:StyleDefinition;secondary:StyleDefinition;values:Value[];title:string;interpretation:string;choiceSentence:string;suggestedAction:string;closing:string}
export const storageKey='who-are-you:reflection:v2';
export const emptyReflection:ReflectionState={values:[],action:'',created:false,answers:[null,null,null]};
export const styles:Record<ReflectionStyle,StyleDefinition>={
 listener:{id:'listener',title:'THE LISTENER',idea:'You prefer to understand someone’s experience before making a judgment.',action:'Ask one thoughtful question, then give the other person time to answer.',accent:'#686C70',surface:'#E4E0DA'},
 supporter:{id:'supporter',title:'THE SUPPORTER',idea:'You look for practical ways to support people who are treated unfairly.',action:'Offer one useful form of help and ask whether it is wanted.',accent:'#9A4B42',surface:'#F3F0EB'},
 questioner:{id:'questioner',title:'THE QUESTIONER',idea:'You question assumptions and look for evidence before accepting a claim.',action:'When a claim seems unfair, ask what evidence supports it and whose view is missing.',accent:'#842F35',surface:'#E4E0DA'},
 advocate:{id:'advocate',title:'THE ADVOCATE',idea:'You value speaking up for fairness when it is safe to do so.',action:'Use a calm sentence to name an unfair pattern and suggest one fairer option.',accent:'#1D2022',surface:'#F3F0EB'},
 protector:{id:'protector',title:'THE THOUGHTFUL PROTECTOR',idea:'You consider risks and seek safe ways to help.',action:'Identify a trusted person who can help when a situation feels unsafe or uncertain.',accent:'#5D6864',surface:'#E4E0DA'}
};
const order:ReflectionStyle[]=['listener','supporter','questioner','advocate','protector'];
const valueWeights:Record<Value,Partial<Record<ReflectionStyle,number>>>={Kindness:{supporter:2,listener:1},Fairness:{questioner:2,advocate:1},Courage:{advocate:2,protector:1},Listening:{listener:2,supporter:1},Understanding:{listener:2,questioner:1},Responsibility:{protector:2,advocate:1}};
export function joinWords(words:string[]):string{return words.length<2?words.join(''):words.length===2?words.join(' and '):`${words.slice(0,-1).join(', ')} and ${words.at(-1)}`;}
export function computeResult(answers:(number|null)[],selected:Value[]):ReflectionResult{
 const scores=Object.fromEntries(order.map(id=>[id,0])) as Record<ReflectionStyle,number>;
 answers.forEach((answer,index)=>{if(answer===null)return;const weights=scenarios[index]?.options[answer]?.weights||{};order.forEach(id=>scores[id]+=weights[id]||0);});
 selected.forEach(value=>order.forEach(id=>scores[id]+=valueWeights[value][id]||0));
 const ranked=[...order].sort((a,b)=>scores[b]-scores[a]||order.indexOf(a)-order.indexOf(b));
 const primary=styles[ranked[0]],secondary=styles[ranked[1]];
 const chosen=selected.length?joinWords(selected.map(v=>v.toLowerCase())):'careful reflection';
 const answered=answers.map((answer,index)=>answer===null?null:scenarios[index].options[answer]).filter((x):x is NonNullable<typeof x>=>Boolean(x));
 const signal=answered[0]?.takeaway||'Your choices show that thoughtful responses can take more than one form.';
 return{primary,secondary,values:selected,title:`${primary.title} + ${secondary.title.replace('THE ','')}`,interpretation:`${primary.idea} ${secondary.idea.replace('You ','You also ')}`,choiceSentence:`One choice that shaped this reflection: ${signal}`,suggestedAction:primary.action,closing:`Your selected values—${chosen}—can guide how you respond without asking you to ignore safety or uncertainty.`};
}
export function restoreReflection(raw:string|null):ReflectionState{try{const p=JSON.parse(raw||'null');if(!p)return{...emptyReflection,answers:[...emptyReflection.answers]};const selected=[...new Set((Array.isArray(p.values)?p.values:[]).filter((v:unknown)=>values.includes(v as Value)))].slice(0,3) as Value[];const answers=(Array.isArray(p.answers)?p.answers:[]).slice(0,3).map((v:unknown,i:number)=>Number.isInteger(v)&&Number(v)>=0&&Number(v)<scenarios[i].options.length?Number(v):null);while(answers.length<3)answers.push(null);return{values:selected,action:typeof p.action==='string'?p.action.slice(0,140):'',created:p.created===true,answers};}catch{return{...emptyReflection,answers:[...emptyReflection.answers]};}}
