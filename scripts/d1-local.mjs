import {DatabaseSync} from 'node:sqlite';
export function localD1(filename=':memory:'){
  const sql=new DatabaseSync(filename);sql.exec('PRAGMA foreign_keys = ON');
  class Statement{constructor(query,params=[]){this.query=query;this.params=params;}bind(...params){return new Statement(this.query,params);}async all(){return {results:sql.prepare(this.query).all(...this.params)};}async first(){return sql.prepare(this.query).get(...this.params)||null;}async run(){const r=sql.prepare(this.query).run(...this.params);return {success:true,meta:{changes:r.changes}};}}
  return {raw:sql,prepare:query=>new Statement(query),async batch(list){sql.exec('BEGIN');try{const results=[];for(const s of list)results.push(await s.run());sql.exec('COMMIT');return results;}catch(e){sql.exec('ROLLBACK');throw e;}}};
}
