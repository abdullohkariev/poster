import { useEffect } from 'react';
import { Portrait } from './Art';

export function CinematicIntro({open,onFinish}:{open:boolean;onFinish:()=>void}){
 useEffect(()=>{if(!open)return;const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;const timer=window.setTimeout(onFinish,reduced?350:3900);return()=>clearTimeout(timer)},[open,onFinish]);
 if(!open)return null;
 return <div className="cinematic" role="dialog" aria-modal="true" aria-label="Introduction"><button className="intro-skip" onClick={onFinish}>Skip intro</button><div className="cinematic-title">WHO ARE YOU?</div><div className="cinematic-art"><Portrait/></div><blockquote>“Being female was like being wrapped in guilt.”<cite>Sharifa Sharif</cite></blockquote><p>When silence feels safer, who do you choose to be?</p></div>;
}
