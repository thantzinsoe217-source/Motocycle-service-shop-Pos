@echo off
chcp 65001 >nul
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js မရှိသေးပါ။ https://nodejs.org ကနေ LTS ကို အရင်သွင်းပါ။
  start https://nodejs.org
  pause
  exit /b 1
)
if not exist node_modules (
  echo Packages သွင်းနေတယ် - ပထမအကြိမ် မိနစ်အနည်းငယ်ကြာမယ်...
  call npm install
)
if not exist .env (
  copy .env.example .env >nul
  echo.
  echo .env ဖိုင် ဖန်တီးပြီး။ Supabase URL နဲ့ KEY ဖြည့်ရင် Online မုဒ်၊ မဖြည့်ရင် စမ်းသပ်မုဒ် ^(browser ထဲပဲ သိမ်း^)။
  echo.
)
start "" http://localhost:5173
call npm run dev
pause
