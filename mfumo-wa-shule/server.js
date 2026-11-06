const express = require('express'), session = require('express-session'),
  bcrypt = require('bcryptjs'), Database = require('better-sqlite3');
const db = new Database(process.env.DB_PATH || 'shule.db'), REG = process.env.REG_CODE || 'shule2026';
db.exec(`
CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY,name TEXT,username TEXT UNIQUE,password TEXT,role TEXT,phone TEXT,email TEXT);
CREATE TABLE IF NOT EXISTS classes(id INTEGER PRIMARY KEY,name TEXT UNIQUE);
CREATE TABLE IF NOT EXISTS subjects(id INTEGER PRIMARY KEY,name TEXT UNIQUE);
CREATE TABLE IF NOT EXISTS students(id INTEGER PRIMARY KEY,name TEXT,class_id INT,stream TEXT,parent_id INT);
CREATE TABLE IF NOT EXISTS assignments(id INTEGER PRIMARY KEY,teacher_id INT,class_id INT,stream TEXT,subject_id INT,UNIQUE(teacher_id,class_id,stream,subject_id));
CREATE TABLE IF NOT EXISTS results(student_id INT,subject_id INT,term INT,year INT,exam TEXT,marks REAL,PRIMARY KEY(student_id,subject_id,term,year,exam));
CREATE TABLE IF NOT EXISTS sent(student_id INT,term INT,year INT,PRIMARY KEY(student_id,term,year));`);
['Form 1', 'Form 2', 'Form 3', 'Form 4', 'Form 5', 'Form 6'].forEach(n => db.prepare('INSERT OR IGNORE INTO classes(name) VALUES(?)').run(n));
['Kiswahili', 'English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Geography', 'History', 'Civics', 'Commerce', 'Book-keeping']
  .forEach(n => db.prepare('INSERT OR IGNORE INTO subjects(name) VALUES(?)').run(n));
if (!db.prepare("SELECT 1 FROM users WHERE role='admin'").get()) {
  db.prepare('INSERT INTO users(name,username,password,role) VALUES(?,?,?,?)').run('Mwalimu Mkuu', process.env.ADMIN_USER || 'admin26', bcrypt.hashSync(process.env.ADMIN_PASS || 'demo2026', 10), 'admin');
  console.log('Admin wa kwanza ameundwa:', process.env.ADMIN_USER || 'admin26', process.env.ADMIN_PASS ? '' : '/ demo2026 (HII NI DEMO, usiitumie live)');
}
console.log('Code ya kujisajili kama admin:', REG);

const G = m => m >= 75 ? ['A', 1] : m >= 65 ? ['B', 2] : m >= 45 ? ['C', 3] : m >= 30 ? ['D', 4] : ['F', 5];
const div = (p, n) => n < 7 ? null : p <= 17 ? 'I' : p <= 21 ? 'II' : p <= 25 ? 'III' : p <= 33 ? 'IV' : '0';
function summ(sid, t, y) { // alama ya muhula = wastani wa mitihani yote ya somo hilo
  const r = db.prepare(`SELECT s.name subject,ROUND(AVG(r.marks),1) marks FROM results r JOIN subjects s ON s.id=r.subject_id
    WHERE student_id=? AND term=? AND year=? GROUP BY r.subject_id`).all(sid, t, y).map(x => ({ ...x, grade: G(x.marks)[0], pts: G(x.marks)[1] }));
  const total = r.reduce((a, x) => a + x.marks, 0), avg = r.length ? total / r.length : 0;
  const points = r.map(x => x.pts).sort((a, b) => a - b).slice(0, 7).reduce((a, b) => a + b, 0);
  return { results: r, total: +total.toFixed(1), avg: +avg.toFixed(1), points, division: div(points, r.length) };
}
function ranked(cid, stream, t, y) {
  const l = db.prepare("SELECT id,name FROM students WHERE class_id=? AND (?1='' OR stream=?2)".replace('?1', '?').replace('?2', '?')).all(cid, stream || '', stream || '')
    .map(s => ({ ...s, ...summ(s.id, t, y) })).filter(s => s.results.length);
  l.sort((a, b) => b.avg - a.avg).forEach((s, i) => s.position = i + 1);
  return l;
}

if (process.env.NODE_ENV === 'production' && !process.env.SECRET) { console.error('Weka variable ya SECRET (neno refu la siri) kabla ya kuanza production.'); process.exit(1); }
const app = express();
app.set('trust proxy', 1);
app.use(express.json());
app.use(session({ secret: process.env.SECRET || 'badilisha-hii-kwenye-production', resave: false, saveUninitialized: false, cookie: { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' } }));
app.use(express.static('public'));
const need = (...r) => (q, s, n) => q.session.u && (!r.length || r.includes(q.session.u.role)) ? n() : s.status(403).json({ error: 'Huna ruhusa' });
const route = (m, p, roles, f) => app[m]('/api' + p, need(...roles), (q, s) => {
  try { s.json(f(q) ?? {}); } catch (e) { s.status(400).json({ error: /UNIQUE/.test(e.message) ? 'Jina/username hilo tayari lipo' : e.message }); }
});
const all = ['admin', 'teacher', 'parent'], staff = ['admin', 'teacher'];
const chk = (q, c, st, sub) => { // mwalimu: darasa+mkondo+somo alilopangiwa tu
  const u = q.session.u; if (u.role === 'admin') return;
  if (!db.prepare('SELECT 1 FROM assignments WHERE teacher_id=? AND class_id=? AND stream=? AND subject_id=?').get(u.id, c, st, sub)) throw new Error('Hujapangiwa darasa/somo hili');
};

app.post('/api/login', (q, s) => {
  const u = db.prepare('SELECT * FROM users WHERE username=?').get(q.body.username);
  if (!u || !bcrypt.compareSync(q.body.password || '', u.password)) return s.status(400).json({ error: 'Username au password si sahihi' });
  q.session.u = { id: u.id, name: u.name, role: u.role }; s.json(q.session.u);
});
app.post('/api/register', (q, s) => { // kujisajili kama admin (kunahitaji code ya shule)
  const { name, username, password, code } = q.body;
  if (code !== REG) return s.status(400).json({ error: 'Code ya usajili si sahihi' });
  if (!name || !username || (password || '').length < 6) return s.status(400).json({ error: 'Jaza taarifa zote (password 6+)' });
  try { db.prepare('INSERT INTO users(name,username,password,role) VALUES(?,?,?,?)').run(name, username, bcrypt.hashSync(password, 10), 'admin'); s.json({}); }
  catch { s.status(400).json({ error: 'Username hiyo tayari ipo' }); }
});
app.post('/api/logout', (q, s) => q.session.destroy(() => s.json({})));
app.get('/api/me', (q, s) => s.json(q.session.u || null));

route('get', '/classes', all, () => db.prepare('SELECT c.*,(SELECT COUNT(*) FROM students WHERE class_id=c.id) n FROM classes c').all());
route('get', '/subjects', all, () => db.prepare('SELECT * FROM subjects ORDER BY name').all());
route('post', '/subjects', ['admin'], q => { db.prepare('INSERT INTO subjects(name) VALUES(?)').run(q.body.name); });
route('delete', '/subjects/:id', ['admin'], q => db.transaction(() => { // kuondoa somo: mgawanyo na alama zake pia
  db.prepare('DELETE FROM assignments WHERE subject_id=?').run(q.params.id);
  db.prepare('DELETE FROM results WHERE subject_id=?').run(q.params.id);
  db.prepare('DELETE FROM subjects WHERE id=?').run(q.params.id);
})());
route('get', '/users', ['admin'], q => db.prepare('SELECT id,name,username,role,phone,email FROM users WHERE role=?').all(q.query.role));
route('post', '/users', ['admin'], q => {
  const { name, username, password, role, phone, email } = q.body;
  if (!name || !username || (password || '').length < 6 || !['teacher', 'parent'].includes(role)) throw new Error('Jaza taarifa zote (password 6+)');
  const r = db.prepare('INSERT INTO users(name,username,password,role,phone,email) VALUES(?,?,?,?,?,?)').run(name, username, bcrypt.hashSync(password, 10), role, phone || null, email || null);
  return { id: r.lastInsertRowid };
});
route('delete', '/users/:id', ['admin'], q => {
  if (+q.params.id === q.session.u.id) throw new Error('Huwezi kujiondoa mwenyewe');
  db.transaction(() => {
    db.prepare('DELETE FROM assignments WHERE teacher_id=?').run(q.params.id);
    db.prepare('UPDATE students SET parent_id=NULL WHERE parent_id=?').run(q.params.id);
    db.prepare("DELETE FROM users WHERE id=? AND role!='admin'").run(q.params.id);
  })();
});
route('get', '/students', all, q => q.session.u.role === 'parent'
  ? db.prepare('SELECT s.*,c.name class FROM students s JOIN classes c ON c.id=s.class_id WHERE parent_id=?').all(q.session.u.id)
  : db.prepare("SELECT s.*,c.name class,u.name parent,u.phone FROM students s JOIN classes c ON c.id=s.class_id LEFT JOIN users u ON u.id=s.parent_id WHERE (?='' OR s.class_id=?) ORDER BY s.stream,s.name")
    .all(q.query.class_id || '', q.query.class_id || ''));
route('post', '/students', ['admin'], q => {
  const { name, class_id, stream, parent_id } = q.body; if (!name) throw new Error('Weka jina');
  db.prepare('INSERT INTO students(name,class_id,stream,parent_id) VALUES(?,?,?,?)').run(name, class_id, stream, parent_id || null);
});
route('post', '/students/:id/parent', ['admin'], q => db.prepare('UPDATE students SET parent_id=? WHERE id=?').run(q.body.parent_id, q.params.id));
route('delete', '/students/:id', ['admin'], q => db.transaction(() => {
  db.prepare('DELETE FROM results WHERE student_id=?').run(q.params.id); db.prepare('DELETE FROM students WHERE id=?').run(q.params.id);
})());
route('get', '/assignments', staff, q => db.prepare(`SELECT a.id,a.teacher_id,u.name teacher,a.class_id,c.name class,a.stream,a.subject_id,s.name subject
  FROM assignments a JOIN users u ON u.id=a.teacher_id JOIN classes c ON c.id=a.class_id JOIN subjects s ON s.id=a.subject_id
  WHERE (?=0 OR a.teacher_id=?) ORDER BY c.name,a.stream`).all(q.session.u.role === 'admin' ? 0 : q.session.u.id, q.session.u.id));
route('post', '/assignments', ['admin'], q => { const b = q.body; db.prepare('INSERT INTO assignments(teacher_id,class_id,stream,subject_id) VALUES(?,?,?,?)').run(b.teacher_id, b.class_id, b.stream, b.subject_id); });
route('delete', '/assignments/:id', ['admin'], q => db.prepare('DELETE FROM assignments WHERE id=?').run(q.params.id));

route('get', '/marks', staff, q => {
  const { class_id, stream, subject_id, term, year, exam } = q.query; chk(q, class_id, stream, subject_id);
  return db.prepare(`SELECT st.id student_id,st.name,r.marks FROM students st LEFT JOIN results r ON r.student_id=st.id
    AND r.subject_id=? AND r.term=? AND r.year=? AND r.exam=? WHERE st.class_id=? AND st.stream=? ORDER BY st.name`).all(subject_id, term, year, exam, class_id, stream);
});
route('post', '/marks', staff, q => {
  const { class_id, stream, subject_id, term, year, exam, rows } = q.body; chk(q, class_id, stream, subject_id);
  if (!exam || !exam.trim()) throw new Error('Weka jina la mtihani/test');
  const ins = db.prepare('INSERT OR REPLACE INTO results VALUES(?,?,?,?,?,?)'), ok = db.prepare('SELECT 1 FROM students WHERE id=? AND class_id=? AND stream=?');
  db.transaction(() => rows.forEach(r => {
    if (r.marks === '' || r.marks == null) return;
    const m = Number(r.marks); if (!(m >= 0 && m <= 100)) throw new Error('Alama lazima ziwe 0-100');
    if (!ok.get(r.student_id, class_id, stream)) throw new Error('Mwanafunzi si wa darasa hili');
    ins.run(r.student_id, subject_id, term, year, exam.trim(), m);
  }))();
});
route('get', '/compare', staff, q => { // analysis ya somo + ulinganisho wa mitihani yote
  const { class_id, stream = '', subject_id, year } = q.query; chk(q, class_id, stream, subject_id);
  const rows = db.prepare(`SELECT st.id,st.name,r.term,r.exam,r.marks FROM results r JOIN students st ON st.id=r.student_id
    WHERE st.class_id=@c AND (@s='' OR st.stream=@s) AND r.subject_id=@sub AND r.year=@y ORDER BY r.term,r.exam`).all({ c: class_id, s: stream, sub: subject_id, y: year });
  const ex = {}, stu = {};
  rows.forEach(r => { const k = r.term + '|' + r.exam; (ex[k] ??= []).push(r.marks); (stu[r.id] ??= { id: r.id, name: r.name, marks: {} }).marks[k] = r.marks; });
  return { exams: Object.keys(ex).map(k => { const a = ex[k]; return { key: k, term: k.split('|')[0], exam: k.split('|')[1], n: a.length,
    avg: +(a.reduce((x, y) => x + y, 0) / a.length).toFixed(1), max: Math.max(...a), min: Math.min(...a), pass: Math.round(100 * a.filter(m => m >= 30).length / a.length) }; }),
    students: Object.values(stu).sort((a, b) => a.name.localeCompare(b.name)) };
});
route('get', '/analysis', ['admin'], q => {
  const { class_id, stream = '', term, year } = q.query, rk = ranked(class_id, stream, term, year);
  const subjects = db.prepare(`SELECT name,ROUND(AVG(m),1) avg FROM (SELECT s.name,AVG(r.marks) m FROM results r JOIN subjects s ON s.id=r.subject_id
    JOIN students st ON st.id=r.student_id WHERE st.class_id=@c AND (@s='' OR st.stream=@s) AND r.term=@t AND r.year=@y GROUP BY r.student_id,r.subject_id) GROUP BY name ORDER BY avg DESC`).all({ c: class_id, s: stream, t: term, y: year });
  const divisions = {}; rk.forEach(s => { const d = s.division || 'N/A'; divisions[d] = (divisions[d] || 0) + 1; });
  return { ranking: rk.map(({ id, name, total, avg, points, division, position }) => ({ id, name, total, avg, points, division, position })),
    subjects, divisions, classAvg: rk.length ? +(rk.reduce((a, s) => a + s.avg, 0) / rk.length).toFixed(1) : 0 };
});
route('get', '/report/:id', ['admin', 'parent'], q => {
  const st = db.prepare('SELECT s.*,c.name class FROM students s JOIN classes c ON c.id=s.class_id WHERE s.id=?').get(q.params.id);
  if (!st || (q.session.u.role === 'parent' && st.parent_id !== q.session.u.id)) throw new Error('Mwanafunzi hapatikani');
  const { term, year } = q.query, rk = ranked(st.class_id, '', term, year), me = rk.find(x => x.id === st.id);
  if (q.session.u.role === 'parent' && !db.prepare('SELECT 1 FROM sent WHERE student_id=? AND term=? AND year=?').get(st.id, term, year))
    throw new Error('Matokeo ya muhula huu bado hayajatumwa na shule');
  return { student: st.name, class: st.class, ...summ(st.id, term, year), position: me?.position, outOf: rk.length,
    prevAvg: Number(term) === 2 && summ(st.id, 1, year).results.length ? summ(st.id, 1, year).avg : null,
    prev: Number(term) === 2 ? summ(st.id, 1, year).results : [] };
});
route('get', '/sheet', ['admin'], q => { // alama za masomo yote kwa kila mwanafunzi, muhula mmoja
  const { class_id, stream = '', term, year } = q.query;
  const subjects = db.prepare('SELECT name FROM subjects ORDER BY name').all().map(x => x.name);
  const rows = db.prepare("SELECT id,name,parent_id FROM students WHERE class_id=? AND (?='' OR stream=?) ORDER BY name").all(class_id, stream, stream).map(st => {
    const m = summ(st.id, term, year), p = st.parent_id ? db.prepare('SELECT name,phone,email FROM users WHERE id=?').get(st.parent_id) : null;
    return { id: st.id, name: st.name, marks: Object.fromEntries(m.results.map(r => [r.subject, r.marks])), n: m.results.length, total: m.total, avg: m.avg,
      points: m.points, division: m.division, parent: p || null, sent: !!db.prepare('SELECT 1 FROM sent WHERE student_id=? AND term=? AND year=?').get(st.id, term, year) };
  });
  rows.filter(r => r.n).sort((a, b) => b.avg - a.avg).forEach((r, i) => r.position = i + 1);
  return { subjects, rows };
});
route('post', '/release', ['admin'], q => { // kutuma matokeo kwa mzazi: yanaonekana kwenye akaunti yake
  const { ids, term, year } = q.body, ins = db.prepare('INSERT OR IGNORE INTO sent VALUES(?,?,?)');
  db.transaction(() => ids.forEach(id => ins.run(id, term, year)))();
});
route('get', '/dashboard', ['admin'], () => { // muhtasari wa shule kwa ukurasa wa kwanza wa admin
  const n = q => db.prepare(q).get().n;
  return {
    counts: { students: n('SELECT COUNT(*) n FROM students'), teachers: n("SELECT COUNT(*) n FROM users WHERE role='teacher'"),
      parents: n("SELECT COUNT(*) n FROM users WHERE role='parent'"), subjects: n('SELECT COUNT(*) n FROM subjects'),
      exams: n('SELECT COUNT(*) n FROM (SELECT 1 FROM results GROUP BY term,year,exam,subject_id)'), marks: n('SELECT COUNT(*) n FROM results'),
      average: db.prepare('SELECT ROUND(AVG(marks),1) a FROM results').get().a || 0 },
    byClass: db.prepare('SELECT c.id,c.name,COUNT(s.id) students,COUNT(DISTINCT s.stream) streams FROM classes c LEFT JOIN students s ON s.class_id=c.id GROUP BY c.id ORDER BY c.id').all(),
    subjectAverages: db.prepare('SELECT s.name subject,ROUND(AVG(r.marks),1) average FROM results r JOIN subjects s ON s.id=r.subject_id GROUP BY s.id ORDER BY average DESC').all(),
    recent: db.prepare(`SELECT r.exam,r.term,r.year,s.name subject,c.name class,st.stream,COUNT(*) n,ROUND(AVG(r.marks),1) avg
      FROM results r JOIN subjects s ON s.id=r.subject_id JOIN students st ON st.id=r.student_id JOIN classes c ON c.id=st.class_id
      GROUP BY r.exam,r.term,r.year,r.subject_id,st.class_id,st.stream ORDER BY r.year DESC,r.term DESC,MAX(r.rowid) DESC LIMIT 6`).all() };
});
app.listen(process.env.PORT || 3000, () => console.log('Mfumo uko tayari: http://localhost:3000'));
