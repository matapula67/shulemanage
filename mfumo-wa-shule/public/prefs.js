/* Lugha (SW/EN) na mandhari (nyeupe/nyeusi). Kiswahili ndicho chanzo; Kiingereza kinatafsiriwa wakati wa kuonyesha. */
(function(){
const R=document.documentElement,ls=(k,v)=>{try{return v===undefined?localStorage.getItem(k):localStorage.setItem(k,v)}catch(e){return null}};
let lang=ls('shule_lang')==='en'?'en':'sw',theme=ls('shule_theme')==='dark'?'dark':'light';
window.LANG=lang;
const D={};`
mfumo wa shule|School system
usimamizi wa taarifa za shule|School information management
kila hatua ya mwanafunzi,|Every step of a student's journey,
inaonekana.|made visible.
jukwaa moja la matokeo, taarifa na maendeleo ya wanafunzi — kwa walimu, wazazi na uongozi wa shule.|One platform for results, information and student progress, for teachers, parents and school leadership.
uchambuzi wa matokeo|Results analysis
fuatilia maendeleo ya kila muhula|Track progress every term
wajibu ulio wazi|Clear roles
kila mtumiaji huona taarifa zake tu|Each user sees only their own information
muhtasari wa masomo|Subject summary
maendeleo ya darasa|Class progress
imejengwa kwa shule zinazoweka maendeleo mbele.|Built for schools that put progress first.
anza hapa|Start here
karibu tena|Welcome back
jisajili kama|Register as
msimamizi|Administrator
ingia kwenye|Log in to
akaunti yako|your account
unahitaji code ya usajili wa shule ili kuunda akaunti ya msimamizi.|You need the school registration code to create an administrator account.
tumia jina la mtumiaji na nenosiri ulilopewa na msimamizi wa shule.|Use the username and password given to you by the school administrator.
jina kamili|Full name
mfano: mwalimu mkuu|e.g. Head Teacher
jina la mtumiaji|Username
mfano: jina.mwalimu|e.g. first.last
nenosiri|Password
salama kwa mfumo|Secured by the system
weka nenosiri lako|Enter your password
onyesha/ficha nenosiri|Show/hide password
code ya usajili wa shule|School registration code
code ya siri ya shule|School secret code
jisajili|Register
ingia kwenye mfumo|Log in to the system
ingia kwa akaunti ya demo|Log in with the demo account
weka username na nenosiri la mfano|Fills in a sample username and password
akaunti ya majaribio:|Test account:
tayari una akaunti?|Already have an account?
ingia hapa|Log in here
unahitaji akaunti ya admin?|Need an admin account?
jisajili kama admin|Register as Admin
taarifa zako zinaonekana kulingana na jukumu lako.|Your information is shown according to your role.
umesajiliwa. ingia sasa.|You are registered. Log in now.
matokeo & taarifa|Results & information
funga menyu|Close menu
fungua menyu|Open menu
menyu kuu|Main menu
toka|Log out
toka kwenye mfumo|Log out of the system
dashibodi ya msimamizi|Administrator dashboard
dashibodi ya mwalimu|Teacher dashboard
dashibodi ya mzazi|Parent dashboard
shule ya sekondari|Secondary School
muhtasari|Overview
wanafunzi|Students
walimu|Teachers
wazazi|Parents
masomo|Subjects
matokeo yote|All results
madarasa yangu|My classes
matokeo ya watoto|Children's results
usimamizi|Administration
taarifa za masomo|Academic information
ufundishaji|Teaching
taarifa za mtoto|Child information
matokeo yenye maana|Meaningful results
fuatilia kila hatua ya ukuaji.|Track every step of growth.
mwalimu|Teacher
mzazi|Parent
mfumo uko tayari|System is ready
mfumo wa usimamizi wa matokeo|Results management system
data inahifadhiwa kwa usalama|Data is stored securely
inapakia…|Loading…
inachanganua taarifa za shule…|Analysing school data…
inapakia orodha…|Loading list…
inapakia madarasa yako…|Loading your classes…
ufuatiliaji wa wanafunzi, walimu na mwenendo wa masomo kwa wakati mmoja.|Track students, teachers and learning trends in one place.
mitihani / test|Exams / tests
wastani wa matokeo|Average result
walioandikishwa|Enrolled
akaunti hai|Active accounts
zilizohifadhiwa|Saved
hakuna matokeo bado|No results yet
muundo wa shule|School structure
madarasa yote|All classes
madarasa|classes
madarasa yanaonekana hata kabla ya wanafunzi kusajiliwa.|Classes are shown even before students are registered.
uchambuzi wa somo|Subject analysis
wastani kwa somo|Average per subject
uchambuzi utaonekana hapa|Analysis will appear here
alama wastani (0–100)|Average mark (0–100)
alama ya ufaulu: 30|Pass mark: 30
matukio ya hivi karibuni|Recent activity
mitihani iliyohifadhiwa|Saved exams
bado hakuna mitihani|No exams yet
hatua inayofuata|Next step
jenga msingi wa taarifa sahihi|Build a foundation of accurate data
sajili wanafunzi|Register students
weka migawo ya walimu|Set teacher assignments
rekodi matokeo|Record results
hitilafu|Error
orodha ya wanafunzi|Student list
funga fomu|Close form
sajili mwanafunzi|Register student
mwanafunzi|Student
taarifa za msingi|Basic information
ongeza mwanafunzi|Add student
darasa|Class
mkondo|Stream
mzazi|Parent
(hiari)|(optional)
— hakuna —|— None —
hifadhi mwanafunzi|Save student
orodha hai|Live list
wanafunzi wote|All students
tafuta jina au darasa…|Search name or class…
pakua|Download
pakua pdf|Download PDF
mikondo yote|All streams
mwanafunzi amesajiliwa.|Student registered.
hakuna wanafunzi wa kupakua bado.|No students to download yet.
una uhakika?|Are you sure?
bado hakuna mwanafunzi aliyesajiliwa.|No student has been registered yet.
usimamizi wa walimu|Teacher management
akaunti mpya|New account
sajili mwalimu|Register teacher
(herufi 6+)|(6+ characters)
simu|Phone
mgawo wa masomo|Subject assignment
mpangie darasa, mkondo na somo|Assign class, stream and subject
somo|Subject
mpange|Assign
sajili mwalimu kwanza|Register a teacher first
walimu wote|All teachers
walimu na mgawanyo|Teachers and assignments
ondoa mgawo|Remove assignment
bado hajapangiwa somo.|Not assigned a subject yet.
bado hakuna mwalimu.|No teachers yet.
mgawo umehifadhiwa.|Assignment saved.
mwalimu amesajiliwa.|Teacher registered.
usimamizi wa wazazi|Parent management
sajili mzazi|Register parent
jina la mzazi|Parent's name
namba ya simu|Phone number
unganisha|Link
mzazi na mwanafunzi|Parent and student
wazazi wote|All parents
wazazi na watoto wao|Parents and their children
hana simu|No phone
bado hajaunganishwa na mwanafunzi.|Not linked to a student yet.
bado hakuna mzazi.|No parents yet.
mzazi amesajiliwa.|Parent registered.
wameunganishwa.|Linked.
masomo ya shule|School subjects
somo jipya|New subject
sajili somo|Register subject
jina la somo|Subject name
sajili|Register
orodha|List
masomo yote|All subjects
somo limeongezwa.|Subject added.
eneo la mwalimu|Teacher area
bado hujapangiwa somo|You have not been assigned a subject yet
jumla ya migawo|Total assignments
darasa, mkondo na somo|Class, stream and subject
muhula|Term
mwaka|Year
unaingiza alama za|Entering marks for
test zilizohifadhiwa|Saved tests
muhula uliochaguliwa|Selected term
ingiza matokeo|Enter results
alama za mtihani|Exam marks
hakuna wanafunzi kwenye darasa hili.|There are no students in this class.
jina la test / mtihani|Test / exam name
mfano: test 1|e.g. Test 1
alama ya juu|Maximum mark
alama|Marks
alama 0–100|Marks 0–100
hifadhi matokeo|Save results
historia ya somo|Subject history
tests zilizopita|Past tests
fungua|Open
hakuna test iliyohifadhiwa|No test saved
matokeo yamehifadhiwa.|Results saved.
ulinganisho|Comparison
analysis ya somo kwa kila mtihani|Subject analysis per exam
mtihani|Exam
waliofanya|Sat
wastani|Average
ufaulu|Pass rate
kila mwanafunzi|Each student
ulinganisho wa wanafunzi|Student comparison
mabadiliko|Change
hakuna matokeo bado.|No results yet.
matokeo & uchambuzi|Results & analysis
analysis ya darasa|Class analysis
chagua darasa, mkondo na muhula|Choose class, stream and term
onyesha|Show
ulinganisho wa somo|Subject comparison
linganisha|Compare
wastani wa darasa|Class average
wa kwanza|Top student
somo la juu|Top subject
orodha ya nafasi|Ranking list
nafasi za wanafunzi|Student rankings
jumla|Total
ripoti|Report
matokeo ya muhula|Term results
chagua darasa|Choose class
matokeo ya wanafunzi|Student results
tuma kwa wote waliobaki|Send to everyone remaining
nafasi|Position
hali|Status
vitendo|Actions
imetumwa|Sent
bado|Not yet
tuma|Send
(hana mzazi)|(no parent)
matokeo yametumwa: mzazi ataona kwenye akaunti yake|Results sent: the parent will see them in their account
hakuna wa kutuma|No one to send to
taarifa za mzazi|Parent information
maendeleo ya mtoto|Child's progress
taarifa zinazoonekana|Visible information
chagua mtoto na muhula|Choose child and term
angalia|View
bora sana|Excellent
vizuri|Good
dhaifu|Weak
hajafaulu|Failed
taarifa ya mwanafunzi|Student information
taarifa zimesasishwa|Information updated
wastani wa alama|Average mark
nafasi darasani|Position in class
ripoti ya maendeleo ya mwanafunzi|Student progress report
alama za masomo|Subject marks
gredi|Grade
maoni|Comments
hakuna alama bado|No marks yet
mwenendo kwa somo|Performance per subject
muhtasari wa masomo|Subject summary
anaendelea vizuri|Doing well
inahitaji ufuatiliaji|Needs follow-up
uchambuzi na ushauri|Analysis and advice
maendeleo hujengwa hatua kwa hatua.|Progress is built step by step.
code ya usajili si sahihi|Invalid registration code
huna ruhusa|You do not have permission
jaza taarifa zote (password 6+)|Fill in all details (password 6+)
username au password si sahihi|Incorrect username or password
username hiyo tayari ipo|That username already exists
walimu wakihifadhi alama za kwanza, wastani kwa kila somo utaonekana.|Once teachers save the first marks, the average per subject will appear here.
baada ya mwalimu kuhifadhi alama, rekodi mpya itaonekana hapa.|After a teacher saves marks, the new record will appear here.
sajili wanafunzi na walimu, kisha wape walimu masomo wanayosimamia kabla ya kuingiza matokeo.|Register students and teachers, then assign teachers their subjects before entering results.
sajili, tafuta na pangilia wanafunzi kwa darasa na mkondo.|Register, search and organise students by class and stream.
sajili walimu na uwapangie darasa, mkondo na somo.|Register teachers and assign them a class, stream and subject.
sajili wazazi kisha uwaunganishe na watoto wao ili waone matokeo.|Register parents, then link them to their children so they can see results.
orodha ya masomo yanayotumika kwenye matokeo ya wanafunzi.|List of subjects used in student results.
chambua matokeo ya darasa kwa muhula, nafasi, division na ulinganishe somo kwa mitihani.|Analyse class results by term, position and division, and compare subjects across exams.
alama za masomo yote kwa kila mwanafunzi, ripoti na kutuma kwa wazazi.|Marks for all subjects per student, reports and sending to parents.
angalia matokeo, mwenendo wa masomo na ripoti ya kila muhula.|View results, learning trends and each term's report.
hapa utaona madarasa, mikondo na masomo uliyopewa.|Here you will see the classes, streams and subjects assigned to you.
chagua mgawo uliopewa, weka matokeo na ufuatilie mitihani ya somo lako.|Choose your assignment, enter results and follow your subject's exams.
ukitumia jina la test lililopo, alama zake zitasasishwa.|If you use an existing test name, its marks will be updated.
unaweza kuacha nafasi wazi kwa mwanafunzi asiyefanya mtihani.|You can leave a blank for a student who did not sit the exam.
mzazi anaweza kuunganishwa baadaye kupitia ukurasa wa wazazi.|A parent can be linked later from the Parents page.
sajili wanafunzi kwanza kwenye ukurasa wa wanafunzi.|Register students first on the Students page.
alama zikihifadhiwa, ulinganisho utaonekana hapa.|Once marks are saved, the comparison will appear here.
walimu wakihifadhi alama za darasa hili, uchambuzi utaonekana hapa.|Once teachers save marks for this class, the analysis will appear here.
matokeo ya muhula huu bado hayajatumwa|This term's results have not been sent yet
matokeo yataonekana walimu wakishahifadhi alama.|Results will appear once teachers have saved marks.
idadi kwa kila division|Count per division
linganisha mitihani yote ya somo kwa mwaka|Compare all exams of a subject for the year
wastani wa masomo yote|Average of all subjects
matokeo • maendeleo • uwazi|Results • Progress • Transparency
matokeo huonekana baada ya shule kuyatuma|Results appear after the school sends them
shule itakutumia matokeo yakiwa tayari. chagua muhula mwingine ukitaka.|The school will send you the results when ready. Choose another term if you wish.
matokeo ya mtoto wako yataonekana hapa baada ya akaunti kuunganishwa na mwanafunzi.|Your child's results will appear here once your account is linked to a student.
akaunti haijaunganishwa na mwanafunzi bado|Account not linked to a student yet
wasiliana na msimamizi wa shule ili ahakikishe akaunti yako imeunganishwa na taarifa za mtoto wako.|Contact the school administrator to make sure your account is linked to your child's information.
msimamizi wa shule atakuongezea darasa, mkondo na somo kabla ya kuingiza matokeo.|The school administrator will add a class, stream and subject for you before you enter results.
wasiliana na msimamizi ili asajili wanafunzi wa|Contact the administrator to register students for
unahitaji mzazi na mwanafunzi|You need a parent and a student
sajili wote wawili kabla ya kuwaunganisha.|Register both before linking them.
baada ya hapo unaweza kumpangia masomo.|After that you can assign subjects.
sajili mwalimu wa kwanza kwa kutumia fomu iliyo juu.|Register the first teacher using the form above.
sajili mzazi wa kwanza kwa kutumia fomu iliyo juu.|Register the first parent using the form above.
mwalimu atatumia username na nenosiri hili kuingia.|The teacher will use this username and password to log in.
kisha mwunganishe na mtoto kwenye kisanduku cha chini.|Then link them to a child in the box below.
ukiondoa somo, mgawanyo wa walimu na alama zake zote zinafutwa pia.|If you remove a subject, teacher assignments and all its marks are deleted too.
anza kwa kusajili wanafunzi. orodha itaunganishwa na masomo yao moja kwa moja.|Start by registering students. The list will be linked to their subjects automatically.
alama ya somo ni wastani wa mitihani yote ya muhula huo|A subject mark is the average of all exams in that term
mfano: amina juma mwinyi|e.g. Amina Juma Mwinyi
mfano: agriculture|e.g. Agriculture
baada ya kuhifadhi test ya kwanza, historia na wastani wake utaonekana hapa.|After saving the first test, its history and average will appear here.
unaweza kuhifadhi test nyingi kwa somo moja ndani ya muhula huu ili kufuatilia maendeleo.|You can save several tests for one subject within this term to track progress.
muhtasari utaonekana baada ya matokeo ya kwanza.|The summary will appear after the first results.
hakuna alama za kuchambua bado.|No marks to analyse yet.
matokeo yataonekana walimu wakishahifadhi alama.|Results will appear once teachers have saved marks.
idadi kwa kila division|Count per division
kwa ujumla matokeo ni bora (division i). alenge kuboresha masomo yaliyo chini ya gredi a.|Overall the results are excellent (Division I). Aim to improve subjects below grade A.
kwa ujumla matokeo ni mazuri (division ii). akiimarisha masomo dhaifu anaweza kufika division i.|Overall the results are good (Division II). By strengthening weak subjects, Division I is within reach.
kwa ujumla yuko kiwango cha kati (division iii). alenge kuongeza ufaulu katika masomo dhaifu ili kuboresha division.|Overall at a middle level (Division III). Aim to raise performance in weak subjects to improve the division.
kwa ujumla ufaulu uko chini (division iv). anahitaji mpango wa kujisomea na ufuatiliaji wa karibu.|Overall performance is low (Division IV). Needs a study plan and close follow-up.
ufaulu wa jumla uko chini sana. anahitaji mpango maalum: ratiba ya masomo ya ziada na ufuatiliaji wa karibu wa walimu na wazazi.|Overall performance is very low. Needs a special plan: an extra-study timetable and close follow-up by teachers and parents.`.split('\n').forEach(l=>{const[a,b]=l.split('|');if(b)D[a.trim()]=b});
const TK=[['mwaka wa masomo','academic year'],['muhtasari wa shule','school overview'],['alama zimeingizwa','marks entered'],['alama ya','mark for'],['kati ya','out of'],['wanafunzi','students'],['mwanafunzi','student'],['mikondo','streams'],['mkondo','stream'],['masomo','subjects'],['somo','subject'],['muhula','term'],['wastani','average'],['ufaulu','pass rate'],['juu','high'],['chini','low'],['jumla','total'],['wamejazwa','filled'],['karibuni','recent'],['habari','hello'],['ondoa','remove'],['nafasi','position'],['madarasa','classes'],['darasa','class']].map(([a,b])=>[new RegExp('\\b'+a+'\\b','gi'),b]);
const cap=(c,o)=>c!==c.toLowerCase()&&c===c.toUpperCase()?o.toUpperCase():/^[a-z]/.test(c)?o[0].toLowerCase()+o.slice(1):/^[A-Z]/.test(c)?o[0].toUpperCase()+o.slice(1):o;
const PAT=[[/^Nguvu: anafanya vizuri katika (.+)\. Aendelee kudumisha kiwango hiki\.$/,'Strengths: doing well in $1. Keep up this level.'],
[/^(.+) \((\d+(?:\.\d+)?)\): hajafikia kiwango cha kufaulu\. .*$/,'$1 ($2): has not reached the pass level. Needs urgent help: extra lessons, daily practice and meeting the subject teacher.'],
[/^(.+) \((\d+(?:\.\d+)?)\): yuko chini ya wastani\. .*$/,'$1 ($2): below average. Should spend more time studying, practise past-paper questions and ask the teacher when unsure.'],
[/^Masomo yenye nafasi ya kuboresha: (.+)\. Kwa mazoezi ya ziada anaweza kufikia gredi B\.$/,'Subjects with room for improvement: $1. With extra practice, grade B is within reach.'],
[/^Ameshuka ukilinganisha na Muhula 1: (.+)\. Mzazi na mwalimu wafuatilie chanzo .*$/,'Dropped compared with Term 1: $1. Parent and teacher should look into the cause (attendance, homework, study discipline).'],
[/^Ameimarika ukilinganisha na Muhula 1: (.+)\. Pongezi, aendelee na juhudi hizo\.$/,'Improved compared with Term 1: $1. Congratulations, keep up the effort.']];
function T(s){const m=s.match(/^(\s*)([\s\S]*?)(\s*)$/),c=m[2];if(!c||lang!=='en')return s;
 for(const [re,rp] of PAT)if(re.test(c))return m[1]+c.replace(re,rp)+m[3];
 const d=D[c.toLowerCase()];let o;
 if(d!==undefined)o=cap(c,d);else if(c.length<=48){o=c;TK.forEach(([re,b])=>{o=o.replace(re,x=>cap(x,b))})}
 return o===c?s:m[1]+o+m[3]}
const AT=['placeholder','title','aria-label'];
function tr(root){const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT,{acceptNode:n=>n.nodeType===1?((/^(SCRIPT|STYLE|TEXTAREA)$/.test(n.tagName)||n.matches('.topbar-user-name,.user-details strong,.table-person,.account-main,.child-chip,.child-profile-main h2,.assignment-chip'))?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_SKIP):NodeFilter.FILTER_ACCEPT});
 let n;while(n=w.nextNode()){const t=T(n.nodeValue);if(t!==n.nodeValue)n.nodeValue=t}
 root.querySelectorAll('[placeholder],[title],[aria-label]').forEach(e=>AT.forEach(a=>{const v=e.getAttribute(a);if(v){const t=T(v);if(t!==v)e.setAttribute(a,t)}}))}
const oc=window.confirm;window.confirm=m=>oc.call(window,T(m));
const I={sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',moon:'<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20"/>'};
const ico=n=>`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
function ctl(c){const e=lang==='en';
 return `<div class="prefs ${c}"><div class="seg" role="group" aria-label="${e?'Language':'Lugha'}"><button type="button" data-lang="sw" class="${e?'':'on'}">${ico('globe')}<span>SW</span></button><button type="button" data-lang="en" class="${e?'on':''}"><span>EN</span></button></div>`+
 `<div class="seg" role="group" aria-label="${e?'Mode':'Mandhari'}"><button type="button" data-theme-set="light" class="${theme==='light'?'on':''}" title="${e?'Light':'Nyeupe'}">${ico('sun')}<span>${e?'Light':'Nyeupe'}</span></button><button type="button" data-theme-set="dark" class="${theme==='dark'?'on':''}" title="${e?'Dark':'Nyeusi'}">${ico('moon')}<span>${e?'Dark':'Nyeusi'}</span></button></div></div>`}
let mo;
function run(){mo.disconnect();
 R.lang=lang==='en'?'en':'sw';document.title=lang==='en'?'Shule 26 · Results system':'Shule 26 · Mfumo wa matokeo';
 const tb=document.querySelector('.topbar-right');if(tb&&!tb.querySelector('.prefs'))tb.insertAdjacentHTML('afterbegin',ctl(''));
 const lp=document.querySelector('.login-page');if(lp&&!document.querySelector('.prefs-login'))lp.insertAdjacentHTML('afterbegin',ctl('prefs-login'));
 if(lang==='en')tr(document.body);
 mo.observe(document.body,{childList:true,subtree:true,characterData:true})}
function setTheme(t){theme=t;ls('shule_theme',t);R.setAttribute('data-theme',t);document.querySelectorAll('[data-theme-set]').forEach(b=>b.classList.toggle('on',b.dataset.themeSet===t))}
function setLang(l){if(l===lang)return;lang=l;window.LANG=l;ls('shule_lang',l);
 try{me?shell(page):loginView()}catch(e){location.reload()}run()}
document.addEventListener('click',e=>{const b=e.target.closest('[data-lang],[data-theme-set]');if(!b)return;b.dataset.lang?setLang(b.dataset.lang):setTheme(b.dataset.themeSet)});
let prev;addEventListener('beforeprint',()=>{prev=R.getAttribute('data-theme');R.setAttribute('data-theme','light')});addEventListener('afterprint',()=>R.setAttribute('data-theme',prev||theme));
R.setAttribute('data-theme',theme);
mo=new MutationObserver(run);
const start=()=>{run()};document.body?start():addEventListener('DOMContentLoaded',start);
})();
