# ဆိုင်ကယ်ဆိုင် App (ပစ္စည်းစာရင်း · အရောင်း · အဝယ်)

Vite + Supabase။ `.env` မဖြည့်ရင် **စမ်းသပ်မုဒ်** (ဒီ browser ထဲပဲ သိမ်း)၊ ဖြည့်ရင် **Online မုဒ်** (Supabase မှာ သိမ်း၊ ဝန်ထမ်းအားလုံး မျှသုံး)။

## ၁။ အမြန် run (စမ်းသပ်မုဒ်)
1. https://nodejs.org မှာ **LTS** သွင်းပါ (တစ်ခါပဲ)။
2. Windows → `start.bat` ကို double-click။ Mac/Linux → `./start.sh`။
3. Browser ဖွင့်လာမယ် → http://localhost:5173

(VS Code မှာဆို Terminal ဖွင့်ပြီး `npm install` ပြီးရင် `npm run dev`)

## ၂။ Supabase ချိတ်ခြင်း
1. https://supabase.com → New project → Region: **Singapore** (Chiang Mai မှာ VPN မလိုဘဲ ဖွင့်လို့ရလား အရင်စမ်းပါ)
2. **SQL Editor** → New query → `supabase/schema.sql` ထဲက အကုန် paste → **Run**
3. **Project Settings → API** ထဲက `Project URL` နဲ့ `anon public` key ကို `.env` ထဲ ဖြည့်:
   ```
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...
   ```
4. `npm run dev` ပြန် run → ထိပ်မှာ **ONLINE** + ☁ ✓ ပေါ်ရင် ရပြီ။
   ပထမဆုံးဖွင့်ချိန် database အလွတ်ဆိုရင် Loyverse ပစ္စည်း ၁၁၂ ခု အလိုလို တင်ပေးမယ်။

## ၃။ Vercel တင်ခြင်း
1. GitHub repo အသစ်ထဲ ဒီ folder တင် (`.env`, `node_modules` မပါစေနဲ့ — `.gitignore` ထည့်ပြီးသား)
2. vercel.com → Add New → Project → repo ရွေး (Framework: Vite အလိုလိုသိ)
3. **Environment Variables** ထဲ `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` ထည့် → Deploy
4. ပြင်ပြီးတိုင်း GitHub ကို push → Vercel အလိုလို update လုပ်မယ်

## သိထားရမယ့်အချက်
- ⚠ အခု **login မရှိသေးဘူး** — link သိသူ ဘယ်သူမဆို ဝင်ပြင်လို့ရတယ်။ ဆိုင်ရှင်ကို အစစ်ပေးမသုံးခင် Supabase Auth (ဆိုင် login) ထည့်ပြီး `schema.sql` ထဲက policy ကို `authenticated` ပဲ ခွင့်ပြုအောင် ပြောင်းရမယ်။
- ဝန်ထမ်းနှစ်ယောက် တပြိုင်နက် ပစ္စည်းတစ်ခုတည်း ရောင်းရင် stock အပြိုင်ရေးမိနိုင်တယ် (နောက်ဆုံးသိမ်းတာ အနိုင်ရ)။ နောက်ဆင့်မှာ database function နဲ့ ပြင်မယ်။
- အရောင်း/အဝယ် data ကို ရက် ၁၄ အတွင်း (အရောင်း) နဲ့ နောက်ဆုံး ၂၀၀ (အဝယ်) ပဲ screen ပေါ်တင်ပြတယ်၊ database ထဲမှာ အကုန်ရှိတယ်။
- ၃၀ စက္ကန့်တစ်ခါ / tab ပြန်ဖွင့်တိုင်း အခြားဖုန်းက ပြင်တာကို ယူတယ်။ ☁ ⚠ ပေါ်ရင် internet စစ်ပြီး ☁ ကို နှိပ်ပါ။
- Print (Epson) နဲ့ ပြင်ဆင်ရေး/အာမခံ screen တွေ မပါသေးဘူး။

## ဖိုင်တွေ
- `src/main.js` — App အားလုံး · `src/db.js` — Supabase ချိတ်ဆက်မှု · `src/seed.json` — Loyverse ကနေ သန့်စင်ထားတဲ့ ပစ္စည်း ၁၁၂ ခု
- `supabase/schema.sql` — table (categories, products, sales, purchases) + policy
