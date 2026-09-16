/**
 * 아이언 모델 데이터 무결성 검사.
 *
 * 로프트는 사람이 옮겨 적는 값이라 오타가 나기 쉽고, 한 번 틀리면 차트가
 * 조용히 거짓말을 한다. 특히 "클럽 번호가 올라가면 로프트도 커진다"는
 * 불변식은 웬만한 전사 오류를 잡아낸다.
 *
 * TypeScript를 직접 실행할 수 없어 데이터 모듈만 임시로 컴파일해 검사한다.
 *   npm run check:data
 */
import { IRON_MODELS } from '../.datacheck/models.js';
import { BRANDS } from '../.datacheck/brands.js';

const ORDER = ["2I","3I","4I","5I","6I","7I","8I","9I","PW","GW"];
const ALIAS = {"PW(10I)":"PW","GW(11I)":"GW","W":"PW","G":"GW","AW":"GW","UW":"GW"};
const norm = c => ALIAS[c] ?? c;
const problems = [];

// 1) 모델 id 유일성
const ids = IRON_MODELS.map(m => m.id);
const dupes = ids.filter((v,i) => ids.indexOf(v) !== i);
if (dupes.length) problems.push(`중복 모델 id: ${dupes.join(', ')}`);

// 2) brandSlug 무결성
for (const m of IRON_MODELS)
  if (!BRANDS.some(b => b.slug === m.brandSlug))
    problems.push(`${m.id}: 존재하지 않는 브랜드 ${m.brandSlug}`);

// 3) flagshipModelId 무결성
for (const b of BRANDS)
  if (b.flagshipModelId && !ids.includes(b.flagshipModelId))
    problems.push(`${b.slug}: 존재하지 않는 대표 모델 ${b.flagshipModelId}`);

// 4) 로프트 값: 파싱 · 범위 · 클럽번호 증가에 따라 단조 증가해야 함
for (const m of IRON_MODELS) {
  const pts = [];
  for (const l of m.lofts) {
    const mm = /^(\d+(?:\.\d+)?)°$/.exec(l.loft);
    if (!mm) { problems.push(`${m.id}: 파싱 불가 로프트 "${l.loft}" (${l.club})`); continue; }
    const club = norm(l.club);
    if (!ORDER.includes(club)) { problems.push(`${m.id}: 알 수 없는 클럽 "${l.club}"`); continue; }
    const v = Number(mm[1]);
    if (v < 14 || v > 55) problems.push(`${m.id}: 범위 밖 로프트 ${v}° (${l.club})`);
    pts.push({ club, v, i: ORDER.indexOf(club) });
  }
  const sorted = [...pts].sort((a,b) => a.i - b.i);
  for (let i = 1; i < sorted.length; i++)
    if (sorted[i].v <= sorted[i-1].v)
      problems.push(`${m.id}: 로프트가 증가하지 않음 ${sorted[i-1].club} ${sorted[i-1].v}° → ${sorted[i].club} ${sorted[i].v}°`);
  // 클럽 중복
  const cs = pts.map(p => p.club);
  const cd = cs.filter((v,i) => cs.indexOf(v) !== i);
  if (cd.length) problems.push(`${m.id}: 클럽 중복 ${cd.join(',')}`);
}

const withLofts = IRON_MODELS.filter(m => m.lofts.length > 0);
const noteCount = IRON_MODELS.filter(m => m.specNote).length;
console.log(`모델 총계        : ${IRON_MODELS.length}`);
console.log(`로프트 보유 모델 : ${withLofts.length}`);
console.log(`로프트 값 총계   : ${IRON_MODELS.reduce((n,m)=>n+m.lofts.length,0)}`);
console.log(`공백/충돌 명시   : ${noteCount}`);
console.log(`2020년 이후      : ${IRON_MODELS.filter(m => !m.year || m.year >= 2020).length}/${IRON_MODELS.length}`);
console.log(`브랜드별 모델 수 : ${BRANDS.map(b => `${b.name} ${IRON_MODELS.filter(m=>m.brandSlug===b.slug).length}`).join(' · ')}`);
console.log('');
console.log(problems.length ? `문제 ${problems.length}건:` : '무결성 검사 통과');
problems.forEach(p => console.log('  -', p));
if (problems.length) process.exit(1);
