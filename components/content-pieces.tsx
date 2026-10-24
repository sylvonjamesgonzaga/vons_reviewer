import {ContentTable} from '@/lib/content';
export function DataTable({table}:{table:ContentTable}){return <div className="data-table-wrap"><table className="data-table"><caption>{table.title}</caption><thead><tr>{table.columns.map((c,i)=><th key={i} scope="col">{c}</th>)}</tr></thead><tbody>{table.rows.map((row,i)=><tr key={i}>{row.map((c,j)=><td key={j}>{c}</td>)}</tr>)}</tbody></table></div>}
export function Tag({children}:{children:React.ReactNode}){return <span className="tag">{children}</span>}
export function DomainBadge({id}:{id:number}){return <span className={`domain-badge d-${id}`}>DOMAIN {id}</span>}
export function Meter({value,critical=false}:{value:number;critical?:boolean}){return <div className="meter"><span style={{width:`${Math.max(0,Math.min(100,value))}%`,background:critical?'#d7794f':undefined}}/></div>}
