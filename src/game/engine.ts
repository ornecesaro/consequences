import { endings, events } from './content'
import type { Choice, Event, GameState } from './types'

export const initialState:GameState={money:20,reputation:50,bossTrust:50,coworkerTrust:50,stress:20,information:0}
export const clamp=(n:number)=>Math.max(0,Math.min(100,n))
export function meets(state:GameState,conditions?:Choice['conditions']){return !conditions||Object.entries(conditions).every(([key,range])=>{const value=state[key as keyof GameState];return (range?.min===undefined||value>=range.min)&&(range?.max===undefined||value<=range.max)})}
export function applyEffects(state:GameState,effects:Choice['effects']){const next={...state};for(const [key,delta] of Object.entries(effects)){const k=key as keyof GameState;next[k]=k==='information'?Math.max(0,next[k]+delta):clamp(next[k]+delta)}return next}
export function eventById(id:string):Event|undefined{return events.find(e=>e.id===id)}
export function scoreRun(state:GameState,decisions:number){const decisionBonus=Math.min(24,decisions*3);const risk=state.stress>=70?10:state.stress<=35?6:0;return Math.max(0,Math.round(state.reputation*.7+state.bossTrust*.45+state.coworkerTrust*.3+state.information*7+Math.max(0,100-state.stress)*.2+decisionBonus+risk))}
export function getNarrativeEnding(state:GameState,score:number){if(state.information>=5&&state.bossTrust<45)return endings.find(e=>e.id==='collapse')!;if(state.bossTrust>=70&&state.reputation>=65)return endings.find(e=>e.id==='promotion')!;return score>=70?endings.find(e=>e.id==='promotion')!:score>=35?endings.find(e=>e.id==='survivor')!:endings.find(e=>e.id==='hr')!}
