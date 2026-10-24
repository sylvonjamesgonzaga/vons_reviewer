import fs from 'node:fs';
import path from 'node:path';
const base=path.join(process.cwd(),'data');
const file=name=>JSON.parse(fs.readFileSync(path.join(base,name),'utf8'));
const domains=[...file('domains-1-2.json').domains,...file('domains-3-5.json').domains];
const reference=file('reference.json');const mini=file('mini-quiz.json').questions;const mock=file('mock-exam.json').questions;
const tasks=new Set(domains.flatMap(d=>d.taskStatements.map(t=>t.id)));
const objectives=new Set(domains.flatMap(d=>d.testObjectives.map(t=>t.id)));
function assert(check,message){if(!check)throw new Error(message)}
assert(domains.length===5,'Expected five domains');assert(tasks.size===30,'Expected 30 task statements');assert(objectives.size===29,'Expected 29 objectives');assert(mini.length===25,'Expected 25 mini-quiz questions');assert(mock.length===60,'Expected 60 mock questions');
for(const x of reference.triggers)assert(tasks.has(x.ref)||objectives.has(x.ref),`Invalid trigger link: ${x.ref}`);
function checkQuestions(name,qs){const seen=new Set();for(const q of qs){assert(!seen.has(q.id),`Duplicate ${name} ID ${q.id}`);seen.add(q.id);assert(q.domain>=1&&q.domain<=5,`${q.id}: invalid domain`);assert(q.type==='single'||q.type==='multi',`${q.id}: invalid type`);assert(q.answer.length===(q.type==='multi'?q.pick:1),`${q.id}: answer count mismatch`);assert(q.answer.every(a=>Object.hasOwn(q.options,a)),`${q.id}: invalid answer choice`);assert(Object.keys(q.options).length>=4,`${q.id}: fewer than 4 options`);if(name==='mock')assert(q.scenario>=1&&q.scenario<=6,`${q.id}: scenario not found`);else assert(tasks.has(q.task)||objectives.has(q.task),`${q.id}: task not found`)}}
checkQuestions('mini',mini);checkQuestions('mock',mock);
for(let s=1;s<=6;s++)assert(mock.filter(q=>q.scenario===s).length===10,`Scenario ${s}: expected 10 questions`);
console.log(`VALID: ${domains.length} domains, ${tasks.size} lessons, ${objectives.size} objectives, ${reference.glossary.length} glossary terms, ${reference.triggers.length} triggers, ${reference.matrices.length} matrices, ${mini.length} mini questions, ${mock.length} mock questions.`);
