# Mfumo wa Matokeo ya Shule (Sekondari)

Express + SQLite. Admin (mwalimu mkuu), walimu na wazazi. Matokeo kwa muhula, analysis, ripoti ya PDF na kutuma kwa wazazi.

## Yaliyomo
- `server.js` ni backend (API, database, hesabu za NECTA O-Level)
- `public/index.html` ni ukurasa wote wa mfumo
- `package.json`, `.gitignore`, `.env.example`

## 1. Jaribu kwenye kompyuta yako
Unahitaji Node.js 18 au zaidi (inapendekezwa toleo la LTS, mfano 20).
```
npm install
npm start
```
Fungua http://localhost:3000. Admin wa demo ni `admin26` / `demo2026`, code ya kujisajili ni `shule2026`.
**Demo hii ni kwa majaribio tu. Usiweke data halisi za wanafunzi ukitumia password hii.**

## 2. Variables unazopaswa kuweka (production)
| Variable | Maana |
|---|---|
| `NODE_ENV=production` | Inawasha cookie salama (inahitaji HTTPS) |
| `SECRET` | Neno refu la siri. Seva haitaanza production bila hiki |
| `REG_CODE` | Code ya siri ya kujisajili kama admin. Usiwape watu wasiohusika |
| `ADMIN_USER`, `ADMIN_PASS` | Admin wa kwanza. Weka password ngumu **kabla ya kuanza mara ya kwanza** |
| `DB_PATH` | Mahali pa faili la database, lazima liwe kwenye diski ya kudumu (angalia hapa chini) |
| `PORT` | Hosting nyingi huiweka yenyewe |

**Muhimu:** admin wa kwanza anaundwa mara moja tu, database ikiwa tupu. Ukishaanza na `admin26/demo2026`, futa faili la database na uanze upya kabla hujaingiza data halisi.

## 3. Muhimu kuhusu database
Mfumo huhifadhi data kwenye faili moja (SQLite). Hosting nyingi za bure hufuta faili kila mfumo unapoanzishwa upya, na data zote zitapotea. Unahitaji **diski ya kudumu (persistent disk/volume)** au VPS. **Vercel na Netlify hazifai** kwa mfumo huu, kwa sababu hazina diski ya kudumu.

## 4. Njia A: Render (rahisi, inahitaji plan ya kulipia kwa diski)
1. Weka folda hii kwenye GitHub (angalia sehemu ya 7).
2. Render → New → **Web Service** → chagua repo yako.
3. Runtime: Node · Build Command: `npm install` · Start Command: `npm start`.
4. Chagua instance ya kulipia (diski ya kudumu haipatikani kwenye plan ya bure; angalia bei za sasa kwenye tovuti yao).
5. **Disks → Add Disk**: Mount Path `/var/data`, ukubwa 1 GB inatosha kuanzia.
6. **Environment**: weka variables za sehemu ya 2 (`DB_PATH=/var/data/shule.db`).
7. Deploy. Utapata anwani yenye HTTPS. Ingia na `ADMIN_USER` / `ADMIN_PASS` ulizoweka.

## 5. Njia B: Railway
1. New Project → Deploy from GitHub repo.
2. Ongeza **Volume**, mount path `/data`, kisha weka `DB_PATH=/data/shule.db`.
3. Weka variables zingine za sehemu ya 2, kisha **Generate Domain** ili kupata HTTPS.

## 6. Njia C: VPS (Ubuntu), udhibiti kamili
```
# 1) Sakinisha Node 20, nginx, pm2
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx unzip
sudo npm i -g pm2

# 2) Pakia folda (scp/git), kisha:
cd mfumo-wa-shule && npm install --omit=dev
mkdir -p ~/data

# 3) Anzisha (badilisha values)
NODE_ENV=production SECRET='...' REG_CODE='...' ADMIN_USER='...' ADMIN_PASS='...' \
DB_PATH=$HOME/data/shule.db PORT=3000 pm2 start server.js --name shule
pm2 save && pm2 startup
```
Nginx (`/etc/nginx/sites-available/shule`), kisha `ln -s` kwenye `sites-enabled`:
```
server {
  server_name shule.example.com;
  location / { proxy_pass http://127.0.0.1:3000; proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme; proxy_set_header X-Forwarded-For $remote_addr; }
}
```
Kisha: `sudo nginx -t && sudo systemctl reload nginx`, na HTTPS bure: `sudo apt install certbot python3-certbot-nginx && sudo certbot --nginx -d shule.example.com`.
Domain yako lazima ielekeze kwenye IP ya VPS (A record).

## 7. Kuweka kwenye GitHub
```
git init && git add . && git commit -m "Mfumo wa shule"
git branch -M main
git remote add origin https://github.com/JINA/mfumo-wa-shule.git
git push -u origin main
```
`.gitignore` inazuia database na `node_modules` zisipakiwe, kwa hiyo data za wanafunzi hazitoki kwenye kompyuta yako kwa bahati mbaya.

## 8. Baada ya kuweka live
1. Ingia kama admin → **Masomo**: kagua masomo → **Madarasa**: sajili wanafunzi → **Wazazi** na **Walimu** (toa username/password) → **Walimu**: mgawanyo wa darasa, mkondo na somo.
2. **Backup**: nakili faili la `shule.db` mara kwa mara (kwa VPS: `cp ~/data/shule.db ~/backup-$(date +%F).db`, au weka kwenye cron kila siku). Kwa Render/Railway pakua kupitia shell au tumia snapshot ya diski.
3. **Toleo jipya la msimbo**: pakia faili mpya (git push) bila kugusa diski. Database inabaki.

## 9. Matatizo ya kawaida
- **`better-sqlite3` haisakinishi**: tumia Node 20 LTS.
- **Huwezi kuingia baada ya kuweka HTTPS**: hakikisha `NODE_ENV=production` na uko kwenye `https://`. Nyuma ya nginx hakikisha una `X-Forwarded-Proto`.
- **Seva inatoka mara moja inasema SECRET**: weka variable ya `SECRET`.
- **Watumiaji wanatolewa nje baada ya seva kuanzishwa upya**: ni kawaida; session zinakaa kwenye kumbukumbu ya seva. Waingie tena.
- **Data zimepotea baada ya deploy**: `DB_PATH` haiko kwenye diski ya kudumu.

## 10. Bado hakuna (hatua zinazofuata)
Kubadilisha password kutoka ndani ya mfumo, upload ya Excel/CSV, SMS/email za kiotomatiki (sasa kuna viungo vya WhatsApp/Email na mzazi huona ripoti kwenye akaunti yake), na kikomo cha majaribio ya kuingia (rate limiting).

## Muonekano mpya (Shule 26)
Ukurasa wote (`public/index.html` + `public/style.css`) sasa una muonekano wa Shule 26: sidebar ya kijani, dashibodi ya admin, eneo la mwalimu na la mzazi. Backend (`server.js`) haijabadilika isipokuwa njia mpya ya `GET /api/dashboard` kwa ukurasa wa Muhtasari.
