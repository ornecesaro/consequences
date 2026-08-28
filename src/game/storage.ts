import type { RunRecord } from './types'
const KEY='consequences-save-v1'
export type SaveData={coins:number;bestScore:number;history:RunRecord[];inventory:Record<string,number>}
export const defaultSave:SaveData={coins:0,bestScore:0,history:[],inventory:{}}
export function loadSave():SaveData{try{return {...defaultSave,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{return defaultSave}}
export function saveGame(data:SaveData){localStorage.setItem(KEY,JSON.stringify(data))}
