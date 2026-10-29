export function Portrait() {
  return <svg className="portrait" viewBox="0 0 560 640" role="img" aria-labelledby="portrait-title"><title id="portrait-title">A symbolic woman between a closed architectural space and an open arch: restricted choices and possibility. Not a portrait of Sharifa.</title>
    <defs><clipPath id="frame"><path d="M0 0H560V640H0Z"/></clipPath><clipPath id="left"><path d="M0 0H280V640H0Z"/></clipPath><clipPath id="right"><path d="M280 0H560V640H280Z"/></clipPath></defs>
    <g clipPath="url(#frame)"><path fill="#C7D0C2" d="M0 0h560v640H0z"/><path fill="#263F3B" d="M0 0h280v640H0z"/>
    <path d="M314 640V218a108 108 0 0 1 216 0v422" fill="#E8D9C5"/><circle cx="427" cy="207" r="64" fill="#F6F1E8"/>
    <path d="M314 408 560 337v303H314Z" fill="#B7C3AE"/><path d="M314 525 560 403v237H314Z" fill="#9AAE9A"/>
    <g stroke="#82958A" fill="none" strokeWidth="1"><path d="M37 640V192a185 185 0 0 1 370 0M67 640V192a155 155 0 0 1 310 0M97 640V192a125 125 0 0 1 250 0"/><path d="M0 295h280M0 345h280M0 395h280"/></g>
    <path d="M110 640c5-93 38-145 64-195-19-47-25-94-20-142 6-83 46-146 124-146 84 0 122 73 126 145 4 58-13 106-27 143 41 50 72 113 80 195Z" fill="#A85C49"/>
    <path d="M110 640c5-93 38-145 64-195-19-47-25-94-20-142 6-83 46-146 124-146 84 0 122 73 126 145 4 58-13 106-27 143 41 50 72 113 80 195Z" fill="#657D6C" clipPath="url(#left)"/>
    <path d="M280 213c-46 0-72 49-72 112 0 64 28 116 72 140 44-24 72-76 72-140 0-63-26-112-72-112" fill="#E8D9C5"/>
    <path d="M280 213c-46 0-72 49-72 112 0 64 28 116 72 140V213" fill="#B9BBA5"/>
    <path d="m280 289-8 68 18 3m-49 35q39 16 77-1M220 313q16-10 32 0m54 0q16-10 31 0" stroke="#665E4D" strokeWidth="2" fill="none"/>
    <path d="M207 239c-32 80-34 178-3 271l76 130M352 239c32 80 34 178 3 271l-75 130M174 445l106 195 97-195" stroke="#E8D9C5" strokeOpacity=".6" strokeWidth="1.5" fill="none"/>
    <g clipPath="url(#left)" stroke="#263F3B" strokeWidth="9" opacity=".78"><path d="M59 0v640M129 0v640M199 0v640M269 0v640"/></g><path d="M280 0v640" stroke="#F6F1E8" strokeWidth="2"/>
    <path d="M454 85h45m-22-22v45" stroke="#F6F1E8" strokeWidth="1.5"/>
    </g></svg>;
}
export function SymbolArt({kind=0}:{kind?:number}) {
 const paths = [<><path d="M30 94V39a30 30 0 0 1 60 0v55M60 9v85M30 54h60"/><path d="m61 21 22 13v48L61 94Z" fill="var(--sand)"/></>,<><path d="M19 28q22-10 41 3 19-13 41-3v61q-21-10-41 3-19-13-41-3Z"/><path d="M60 31v61M29 43l20 4m-20 9 20 4m22-13 20-4m-20 17 20-4"/></>,<><path d="M17 77 40 57l20 13 21-13 22 20M40 57l10-8 19 11 12-3M39 77l21 16 21-16"/><circle cx="37" cy="30" r="12"/><circle cx="83" cy="30" r="12"/></>,<><path d="M26 98V19h68v79M43 98V31l34-12v79Z"/><path d="M59 60h4M14 98h92"/></>,<><ellipse cx="60" cy="52" rx="34" ry="43"/><path d="M41 96h38M60 95v10M50 76V62c-16-13-12-36 2-37 20-2 23 19 15 29l10 7-13 3v12"/></>];
 return <svg className="symbol" viewBox="0 0 120 112" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[kind%5]}</svg>;
}
export function ValueIcon({index}:{index:number}){
 const shapes=[<path d="M12 20 3.5 11.5C-1 5 7 1 12 7c5-6 13-2 8.5 4.5Z"/>,<><path d="M12 3v18M5 21h14M4 6h16M5 6 1 14h8L5 6Zm14 0-4 8h8l-4-8Z"/></>,<><path d="M5 19 19 5M6 5h13v13"/></>,<><path d="M8 9a5 5 0 0 1 10 0c0 5-6 5-6 10a3 3 0 0 1-6 0M11 10a2 2 0 0 1 4 0c0 2-3 3-3 5"/></>,<><circle cx="9" cy="12" r="7"/><circle cx="15" cy="12" r="7"/></>,<><path d="m12 2 8 4v7c0 4-8 9-8 9S4 17 4 13V6Z"/><path d="m8 12 3 3 5-6"/></>];
 return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{shapes[index]}</svg>;
}
