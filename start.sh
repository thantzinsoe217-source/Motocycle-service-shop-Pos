#!/usr/bin/env bash
cd "$(dirname "$0")"
command -v node >/dev/null || { echo "Node.js မရှိသေးပါ — https://nodejs.org ကနေ LTS သွင်းပါ"; exit 1; }
[ -d node_modules ] || npm install
[ -f .env ] || { cp .env.example .env; echo ".env ဖန်တီးပြီး — Supabase URL/KEY ဖြည့်ပါ (မဖြည့်ရင် စမ်းသပ်မုဒ်)"; }
(command -v open >/dev/null && open http://localhost:5173) || (command -v xdg-open >/dev/null && xdg-open http://localhost:5173) || true
npm run dev
