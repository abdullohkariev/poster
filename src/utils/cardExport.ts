import { reflectionText, type Reflection } from '../data/reflection';
export async function downloadCard(reflection:Reflection){
 await document.fonts.ready;
 await Promise.all([document.fonts.load('500 96px "Cormorant Garamond"'),document.fonts.load('italic 36px "Cormorant Garamond"'),document.fonts.load('400 30px Inter')]);
 const canvas=document.createElement('canvas');canvas.width=1080;canvas.height=1350;
 const context=canvas.getContext('2d');if(!context)throw new Error('Canvas unavailable');const ctx:CanvasRenderingContext2D=context;
 ctx.fillStyle='#F6F1E8';ctx.fillRect(0,0,1080,1350);
 ctx.strokeStyle='#263F3B';ctx.lineWidth=2;ctx.strokeRect(48,48,984,1254);
 ctx.fillStyle='#263F3B';ctx.font='500 22px Inter, sans-serif';ctx.fillText('A PERSONAL REFLECTION',100,126);
 ctx.font='500 96px "Cormorant Garamond", Georgia, serif';ctx.fillText('WHO ARE YOU?',100,270,880);
 ctx.strokeStyle='#A85C49';ctx.beginPath();ctx.moveTo(100,334);ctx.lineTo(980,334);ctx.stroke();
 const text=reflectionText(reflection.values);
 function wrap(text:string,y:number,size:number,line:number,family:string){ctx.font=`${size}px ${family}`;let row='';for(const word of text.split(/\s+/)){if(ctx.measureText(row+word).width>860&&row){ctx.fillText(row.trim(),100,y);y+=line;row='';}if(ctx.measureText(word).width>860){for(const char of word){if(ctx.measureText(row+char).width>860){ctx.fillText(row,100,y);y+=line;row='';}row+=char;}row+=' ';}else row+=word+' ';}if(row)ctx.fillText(row.trim(),100,y);return y+line;}
 let y=wrap(text.choice,430,56,64,'"Cormorant Garamond", Georgia, serif');
 y=wrap(text.intention,y+35,30,44,'Inter, sans-serif');
 if(reflection.action.trim()){ctx.fillStyle='#8b4838';ctx.font='500 20px Inter, sans-serif';ctx.fillText('MY SMALL ACTION',100,y+38);ctx.fillStyle='#263F3B';wrap(reflection.action.trim(),y+85,27,39,'Inter, sans-serif');}
 ctx.fillStyle='#263F3B';ctx.font='italic 36px "Cormorant Garamond", Georgia, serif';ctx.fillText('Your choices help shape who you become.',100,1175);
 ctx.font='20px Inter, sans-serif';ctx.fillText('Inspired by the themes of Sharifa Sharif’s story.',100,1243);
 const blob=await new Promise<Blob>((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('Export failed')),'image/png'));
 const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='who-i-choose-to-be.png';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
