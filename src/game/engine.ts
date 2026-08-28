import { endings, events } from './content'
import type { Choice, Event, GameState } from './types'

export const initialState: GameState = { money:20,reputation:50,bossTrust:50,coworkerTrust:50,stress:20,information:0 }
export const clamp = (n:number) => Math.max(0,Math.min(100,n))
export function meets(state:GameState, conditions?: Choice['conditions']) { return !conditions || Object.entries(conditions).every(([key,range]) => { const value=state[key as keyof GameState]; return (!range?.min || value>=range.min) && (!range?.max || value<=range.max) }) }
export function applyEffects(state:GameState,effects:Choice['effects']) { const next={...state}; for(const [key,delta] of Object.entries(effects)) { const k=key as keyof GameState; next[k]=k==='information'?Math.max(0,next[k]+delta):clamp(next[k]+delta) } return next }
export function eventById(id:string):Event|undefined { return events.find(e=>e.id===id) }
export function chooseNext(state:GameState,current:Event,choice:Choice) { if(choice.nextEvent) return choice.nextEvent; const candidates=events.filter(e=>e.id!==current.id && meets(state,e.condition)); return candidates[Math.floor(Math.random()*candidates.length)]?.id ?? 'end' }
export function scoreRun(state:GameState, decisions:number) { return Math.max(0, Math.round(state.reputation*0.7 + state.bossTrust*0.45 + state.coworkerTrust*0.3 + state.information*7 + Math.max(0,100-state.stress)*0.2 + decisions*8)) }
export function getEnding(score:number) { return endings.find(e=>score>=e.minScore && (e.maxScore===undefined || score<=e.maxScore)) ?? endings[endings.length-1] }
