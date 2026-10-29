export const values = ['Kindness','Fairness','Courage','Listening','Understanding','Responsibility'] as const;
export type Value = typeof values[number];
export interface Reflection { values:Value[]; action:string; created:boolean }
export const storageKey = 'who-are-you:reflection:v1';
export const emptyReflection:Reflection = {values:[],action:'',created:false};
const actions:Record<Value,string> = {Kindness:'offer care in small ways',Fairness:'question unfairness',Courage:'take a safe step when something matters',Listening:'listen before judging',Understanding:'consider another person’s circumstances',Responsibility:'think about how my actions affect others'};
export function joinWords(words:string[]):string { return words.length<2 ? words.join('') : words.length===2 ? words.join(' and ') : `${words.slice(0,-1).join(', ')} and ${words.at(-1)}`; }
export function reflectionText(selected:Value[]) { return {choice:`I choose ${joinWords(selected.map(v=>v.toLowerCase()))}.`,intention:`I want to ${joinWords(selected.map(v=>actions[v]))}.`}; }
export function restoreReflection(raw:string|null):Reflection {
 try {const parsed=JSON.parse(raw||'null'); if(!parsed||!Array.isArray(parsed.values))return {...emptyReflection};
 const chosen=[...new Set(parsed.values.filter((v:unknown)=>values.includes(v as Value)))] .slice(0,3) as Value[];
 return {values:chosen,action:typeof parsed.action==='string'?parsed.action.slice(0,140):'',created:parsed.created===true&&chosen.length>0};
 }catch{return {...emptyReflection};}
}
