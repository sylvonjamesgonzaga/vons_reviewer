'use client';
import React,{createContext,useCallback,useContext,useEffect,useMemo,useState} from 'react';
export type Attempt={id:string;date:string;kind:'mini'|'mock';label:string;score:number;total:number;correct:number;domainScores:Record<number,{correct:number;total:number}>;scenarioScores?:Record<number,{correct:number;total:number}>;missedIds:string[]};
export type Progress={read:string[];flashcards:Record<string,boolean>;history:Attempt[]};
const initial:Progress={read:[],flashcards:{},history:[]};
type Store={progress:Progress;ready:boolean;update:(action:(old:Progress)=>Progress)=>void};
const Ctx=createContext<Store>({progress:initial,ready:false,update:()=>{}});
const KEY='reviewlab-claude-v1';
export function ProgressProvider({children}:{children:React.ReactNode}){
 const [progress,setProgress]=useState<Progress>(initial);const [ready,setReady]=useState(false);
 useEffect(()=>{try{const saved=localStorage.getItem(KEY);if(saved){const parsed=JSON.parse(saved);setProgress({read:Array.isArray(parsed.read)?parsed.read:[],flashcards:parsed.flashcards||{},history:Array.isArray(parsed.history)?parsed.history:[]})}}catch{}setReady(true)},[]);
 useEffect(()=>{if(ready)try{localStorage.setItem(KEY,JSON.stringify(progress))}catch{}},[progress,ready]);
 const update=useCallback((action:(old:Progress)=>Progress)=>setProgress(action),[]);
 const value=useMemo(()=>({progress,ready,update}),[progress,ready,update]);return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export const useProgress=()=>useContext(Ctx);
export function makeAttempt(kind:'mini'|'mock',label:string,questions:{id:string;domain:number;scenario?:number;answer:string[]}[],answers:Record<string,string[]>):Attempt{
 const domainScores:Attempt['domainScores']={};const scenarioScores:NonNullable<Attempt['scenarioScores']>={};const missedIds:string[]=[];let correct=0;
 questions.forEach(q=>{const passed=isCorrect(answers[q.id]||[],q.answer);if(passed)correct++;else missedIds.push(q.id);const d=domainScores[q.domain]||(domainScores[q.domain]={correct:0,total:0});d.total++;if(passed)d.correct++;if(q.scenario){const s=scenarioScores[q.scenario]||(scenarioScores[q.scenario]={correct:0,total:0});s.total++;if(passed)s.correct++}});
 return {id:`${kind}-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,date:new Date().toISOString(),kind,label,score:questions.length?Math.round(correct/questions.length*100):0,total:questions.length,correct,domainScores,scenarioScores,missedIds};
}
export function isCorrect(selected:string[],expected:string[]){return selected.length===expected.length&&expected.every(x=>selected.includes(x))}
