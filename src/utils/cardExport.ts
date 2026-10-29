import type { ReflectionResult,ReflectionState } from '../data/reflection';
export async function downloadCard(state:ReflectionState,result:ReflectionResult){
 await document.fonts.ready;await Promise.all([document.fonts.load('500 86px "Cormorant Garamond"'),document.fonts.load('400 28px Inter')]);
 const canvas=document.createElement('canvas');canvas.width=1080;canvas.height=1350;const context=canvas.getContext('2d');if(!context)throw new Error('Canvas unavailable');const ctx=context;
 ctx.fillStyle=result.primary.surface;ctx.fillRect(0,0,1080,1350);ctx.fillStyle=result.primary.accent;ctx.fillRect(0,0,36,1350);ctx.fillStyle='#1D2022';ctx.fillRect(36,0,1044,230);
 ctx.fillStyle='#FFFFFF';ctx.font='500 24px Inter, sans-serif';ctx.fillText('WHO ARE YOU?',94,92);ctx.font='500 76px "Cormorant Garamond", Georgia, serif';ctx.fillText(result.primary.title,94,178,880);
 ctx.fillStyle=result.primary.accent;ctx.font='600 20px Inter, sans-serif';ctx.fillText('SECONDARY STRENGTH',94,300);ctx.fillStyle='#1D2022';ctx.font='500 42px "Cormorant Garamond", Georgia, serif';ctx.fillText(result.secondary.title,94,350,880);
 function wrap(text:string,y:number,size:number,line:number,weight='400',color='#1D2022'){ctx.fillStyle=color;ctx.font=`${weight} ${size}px Inter, sans-serif`;let row='';for(const word of text.split(/\s+/)){const test=row+word+' ';if(ctx.measureText(test).width>880&&row){ctx.fillText(row.trim(),94,y);y+=line;row=''}if(ctx.measureText(word).width>880){for(const ch of word){if(ctx.measureText(row+ch).width>880){ctx.fillText(row,94,y);y+=line;row=''}row+=ch}row+=' '}else row+=word+' '}if(row)ctx.fillText(row.trim(),94,y);return y+line}
 let y=wrap(result.interpretation,440,30,45);y=wrap(result.choiceSentence,y+22,23,35,'400','#4F5559');
 ctx.fillStyle=result.primary.accent;ctx.font='600 20px Inter, sans-serif';ctx.fillText('YOUR VALUES',94,y+35);ctx.fillStyle='#1D2022';ctx.font='500 34px "Cormorant Garamond", Georgia, serif';ctx.fillText(state.values.join(' · ')||'Thoughtful reflection',94,y+82,880);
 ctx.fillStyle=result.primary.accent;ctx.font='600 20px Inter, sans-serif';ctx.fillText('ONE ACTION TO TRY',94,y+145);y=wrap(state.action.trim()||result.suggestedAction,y+192,27,40);
 ctx.fillStyle='#1D2022';ctx.font='italic 36px "Cormorant Garamond", Georgia, serif';ctx.fillText('Thoughtful choices can take more than one form.',94,1175,880);
 ctx.font='19px Inter, sans-serif';ctx.fillText('Inspired by the themes of Sharifa Sharif’s memoir.',94,1245);
 const blob=await new Promise<Blob>((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('Export failed')),'image/png'));const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='who-are-you-reflection.png';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
