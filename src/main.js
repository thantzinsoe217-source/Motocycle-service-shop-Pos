import './style.css';
import { makeDb } from './db.js';
import SEED from './seed.json';

(function () {
  'use strict';
  var LS_KEY = 'sk-products-v2';
  var UNCAT = 'မသတ်မှတ်ရသေး';
  var PAGE = 150;

  var I18N = {
    my: {
      title: 'ဆိုင်ကယ်ဆိုင် ပစ္စည်းစာရင်း', demo: 'စမ်းသပ်',
      quickAdd: 'ပစ္စည်းအသစ် အမြန်ထည့်', name: 'အမည်', category: 'အမျိုးအစား', cost: 'ဝယ်ရင်း ฿', price: 'ရောင်းဈေး ฿', stock: 'လက်ကျန်',
      margin: 'အမြတ်', newCat: '+ အမျိုးအစားအသစ်…', newCatPh: 'အမျိုးအစား အမည်အသစ်', priceVar: 'မထည့်ရင် ရောင်းချိန်ရိုက်',
      priceHint: 'ရောင်းဈေး မထည့်ရင် ရောင်းချိန်မှာ ဈေးရိုက်ထည့်မယ်။ လက်ကျန် မထည့်ရင် stock မထိန်းဘူး။ Enter နှိပ်ရင် နောက်ကွက်ကို ရောက်မယ်',
      trackStock: 'Stock ထိန်း', service: 'ဝန်ဆောင်မှု (လုပ်ခ)', add: 'ထည့်မယ်',
      searchPh: 'ပစ္စည်းအမည်၊ ကုဒ် ရှာပါ…', all: 'အားလုံး', noCost: 'ဝယ်ရင်းမရှိ', lowStock: 'Stock ကုန်/အနုတ်', untracked: 'Stock မထိန်း',
      manageCats: 'အမျိုးအစား စီမံ', addCat: 'ထည့်', close: 'ပိတ်မယ်', catDelNote: 'အမျိုးအစား ဖျက်ရင် ပစ္စည်းတွေက "မသတ်မှတ်ရသေး" ထဲ ပြောင်းရောက်မယ်',
      showing: 'ပြနေတာ', of: 'ခု / စုစုပေါင်း', unit: 'ခု', none: 'ရှာလို့မတွေ့ပါ', more: 'ထပ်ပြမယ်',
      varPh: 'ရောင်းချိန်ရိုက်', untrackedPill: 'မထိန်း', trackTip: 'နှိပ်ရင် stock စထိန်းမယ်', del: 'ဖျက်', sure: 'သေချာလား',
      added: 'ထည့်ပြီး', needName: 'ပစ္စည်းအမည် ထည့်ပါ', needCat: 'အမျိုးအစားအမည် ထည့်ပါ', badNum: 'ဂဏန်းပဲ ထည့်ပါ',
      dup: 'ဒီအမည် ရှိပြီးသား။ ထပ်ထည့်ချင်ရင် "ထည့်မယ်" ကို တစ်ခါထပ်နှိပ်ပါ', catExists: 'ဒီအမျိုးအစား ရှိပြီးသား', catAdded: 'အမျိုးအစား ထည့်ပြီး',
      catDeleted: 'အမျိုးအစား ဖျက်ပြီး', deleted: 'ဖျက်ပြီး',
      demoNote: 'စမ်းသပ်မုဒ် — ဒီ browser ထဲမှာပဲ သိမ်းတယ်။ Supabase နဲ့ ချိတ်ရင် ဝန်ထမ်းအားလုံး တူတူသုံးလို့ရမယ်', exportCsv: 'CSV ထုတ်', reset: 'နမူနာစာရင်း ပြန်စ',
      resetSure: 'သေချာလား — ပြင်ထားတာအကုန် ပျောက်မယ်', exported: 'CSV ထုတ်ပြီး', copied: 'CSV ကို copy ကူးပြီး', exportFail: 'CSV မထုတ်နိုင်ပါ', resetDone: 'နမူနာစာရင်း ပြန်စပြီး',
      moved: 'ပစ္စည်းတွေကို "မသတ်မှတ်ရသေး" ထဲ ရွှေ့ပြီး',
      live: 'Online', liveNote: 'Supabase နဲ့ ချိတ်ထားတယ် — ဝန်ထမ်းအားလုံး ဖုန်း/ကွန်ပျူတာ ဘယ်ကနေမဆို တူတူသုံးလို့ရတယ်', syncFail: 'သိမ်းလို့မရဘူး — internet စစ်ပါ (ပြန်ကြိုးစားနေတယ်)', syncBoot: 'Supabase ချိတ်လို့မရဘူး — .env နဲ့ internet စစ်ပါ', seeded: 'ပစ္စည်းစာရင်း ပထမဆုံး တင်ပြီး',
      pAddBtn: 'ပစ္စည်းစာရင်း ထည့်ရန်', pViewBtn: 'ပစ္စည်းများ ကြည့်ရန်', back: 'နောက်သို့',
      tabProducts: 'ပစ္စည်းစာရင်း', tabSales: 'အရောင်း', salesSearchPh: 'ပစ္စည်းအမည်/ကုဒ် ရှာပြီး Enter နှိပ်ရင် ထည့်မယ်…',
      cartTitle: 'ရောင်းမယ့် စာရင်း', cartEmpty: 'ဘာမှ မရွေးရသေးပါ။ ပစ္စည်းကို နှိပ်ပြီး ထည့်ပါ', addOther: '+ တခြားကြောင်း (လုပ်ခ စသည်)',
      otherPh: 'လုပ်ခ / အခြား', otherLine: 'လုပ်ခ/အခြား', total: 'စုစုပေါင်း', received: 'ရတဲ့ငွေ ฿', change: 'ပြန်အမ်း', short: 'ငွေမလောက်',
      sell: 'ရောင်းပြီး', needPrice: 'ဈေး မထည့်ရသေးတဲ့ ကြောင်း ရှိတယ် (အဝါကွက်)', sold: 'ရောင်းပြီး', viewVoucher: 'ဘောင်ချာ ကြည့်',
      todaySales: 'ဒီနေ့ အရောင်း', times: 'ကြိမ်', noSalesToday: 'ဒီနေ့ ရောင်းရသေးဘူး', void: 'ပယ်ဖျက်', delSel: 'ရွေးထားတာ ဖျက်', selNone: 'ဖျက်မယ့် ပစ္စည်း အမှန်ခြစ်ပါ', lineDone: 'ဖျက်ပြီး၊ stock ပြန်တိုးပြီး', qtyDone: 'အရေအတွက် ပြင်ပြီး', voidDone: 'ပယ်ဖျက်ပြီး၊ stock ပြန်တိုးပြီး',
      voucher: 'ဘောင်ချာ', copiedTxt: 'Copy ကူးပြီး', copyText: 'စာသား copy', voucherNote: 'Print ထုတ်တာကို App အစစ်မှာ ထည့်မယ်', overStock: 'လက်ကျန်ထက် များနေတယ်',
      tabPurchase: 'အဝယ်', pTitle: 'ဝယ်ဝင် စာရင်းသွင်း', supplier: 'ပေးသွင်းသူ (ဆိုင်အမည်)', pDate: 'ရက်စွဲ', pTime: 'အချိန်', pRef: 'ဆိုင်ဘောင်ချာ နံပါတ်', pWho: 'ငွေရှင်းသူ', pSearchPh: 'ပစ္စည်းအမည်/ကုဒ် ရှာပြီး Enter နှိပ်ရင် ထည့်မယ်…', pNewItem: '+ ပစ္စည်းအသစ်', pEmpty: 'ဘောင်ချာထဲက ပစ္စည်းတွေကို ရှာပြီး ထည့်ပါ', qty: 'အရေအတွက်', unitCost: 'ဝယ်ဈေး', pSave: 'ဝယ်ပြီး သိမ်းမယ်', pNeed: 'ဝယ်ဈေး မထည့်ရသေးတဲ့ ကြောင်း ရှိတယ် (အဝါကွက်)', pNote: 'သိမ်းရင် stock ထိန်းထားတဲ့ပစ္စည်းတွေ လက်ကျန်တိုးမယ်၊ ဝယ်ရင်းကို နောက်ဆုံးဈေးနဲ့ update လုပ်မယ်၊ ပစ္စည်းအသစ်ဆို စာရင်းထဲ ထည့်ပေးမယ်', pSaved: 'ဝယ်ဝင် သိမ်းပြီး', pHist: 'မကြာသေးမီ ဝယ်ဝင်', pVoucher: 'ဝယ်ဝင် ဘောင်ချာ', codeLbl: 'ကုဒ်', skuLbl: 'SKU နံပါတ်', skuDup: 'ဒီ SKU နံပါတ် သုံးပြီးသား', newItemName: 'ပစ္စည်းအသစ်', newTag: 'အသစ်', noPurch: 'ဝယ်ဝင်စာရင်း မရှိသေးဘူး', pVoidDone: 'ပယ်ဖျက်ပြီး၊ stock ပြန်လျော့ပြီး',
      pickVar: 'ဈေးပြောင်း', priceEnter: 'ဈေးရိုက်ပါ', viewCart: 'ကြည့်မယ်', lines: 'ကြောင်း', view: 'ကြည့်',
      photo: 'ပုံ', refund: 'ပြန်ပေးမယ်', refunded: 'ပြန်ပေးပြီး', refundDone: 'ပြန်ပေးငွေ မှတ်တမ်းတင်ပြီး၊ stock ပြန်တိုးပြီး',
      refundHistory: 'ပြန်ပေးငွေ မှတ်တမ်း', refundTotal: 'ပြန်ပေးငွေ စုစုပေါင်း', netTotal: 'အသားတင် စုစုပေါင်း',
      refundQtyLabel: 'ပြန်ပေးမည့် အရေအတွက်', refundNotePh: 'ဘယ်သူလုပ်သလဲ/အကြောင်းပြချက် (ချန်ထားလို့ရ)',
      confirm: 'အတည်ပြု', cancel: 'မလုပ်တော့ဘူး', partRefunded: 'တစ်စိတ်တစ်ပိုင်း ပြန်ပေးထား',
      tabReceipts: 'ဘောင်ချာများ',
      rSales: 'အရောင်း ဘောင်ချာ',
      rPurchase: 'အဝယ် ဘောင်ချာ',
      rSearchPh: 'ဘောင်ချာ နံပါတ် / ပစ္စည်း ရှာပါ…',
      rNoSales: 'အရောင်း ဘောင်ချာ မရှိသေးဘူး',
      rNoPurch: 'အဝယ် ဘောင်ချာ မရှိသေးဘူး',
      rCount: 'ခု'
    },
    th: {
      title: 'รายการสินค้า ร้านมอเตอร์ไซค์', demo: 'ทดลอง',
      quickAdd: 'เพิ่มสินค้าใหม่แบบเร็ว', name: 'ชื่อสินค้า', category: 'หมวดหมู่', cost: 'ราคาทุน ฿', price: 'ราคาขาย ฿', stock: 'คงเหลือ',
      margin: 'กำไร', newCat: '+ หมวดหมู่ใหม่…', newCatPh: 'ชื่อหมวดหมู่ใหม่', priceVar: 'ว่าง = กรอกตอนขาย',
      priceHint: 'ไม่ใส่ราคาขาย = กรอกตอนขาย ไม่ใส่คงเหลือ = ไม่นับสต็อก กด Enter เพื่อไปช่องถัดไป',
      trackStock: 'นับสต็อก', service: 'บริการ (ค่าแรง)', add: 'เพิ่ม',
      searchPh: 'ค้นหาชื่อสินค้า รหัส…', all: 'ทั้งหมด', noCost: 'ยังไม่มีราคาทุน', lowStock: 'สต็อกหมด/ติดลบ', untracked: 'ไม่นับสต็อก',
      manageCats: 'จัดการหมวดหมู่', addCat: 'เพิ่ม', close: 'ปิด', catDelNote: 'ถ้าลบหมวดหมู่ สินค้าจะย้ายไป "ยังไม่ระบุ"',
      showing: 'แสดง', of: 'รายการ / ทั้งหมด', unit: 'รายการ', none: 'ไม่พบสินค้า', more: 'แสดงเพิ่ม',
      varPh: 'กรอกตอนขาย', untrackedPill: 'ไม่นับ', trackTip: 'กดเพื่อเริ่มนับสต็อก', del: 'ลบ', sure: 'แน่ใจ?',
      added: 'เพิ่มแล้ว', needName: 'กรอกชื่อสินค้า', needCat: 'กรอกชื่อหมวดหมู่', badNum: 'กรอกเป็นตัวเลขเท่านั้น',
      dup: 'มีชื่อนี้อยู่แล้ว ถ้าต้องการเพิ่มซ้ำ กด "เพิ่ม" อีกครั้ง', catExists: 'มีหมวดหมู่นี้อยู่แล้ว', catAdded: 'เพิ่มหมวดหมู่แล้ว',
      catDeleted: 'ลบหมวดหมู่แล้ว', deleted: 'ลบแล้ว',
      demoNote: 'โหมดทดลอง: ข้อมูลเก็บในเบราว์เซอร์นี้เท่านั้น เมื่อเชื่อม Supabase พนักงานทุกคนจะใช้ข้อมูลเดียวกันได้', exportCsv: 'ส่งออก CSV', reset: 'เริ่มข้อมูลตัวอย่างใหม่',
      resetSure: 'แน่ใจ? ที่แก้ไว้จะหายทั้งหมด', exported: 'ส่งออก CSV แล้ว', copied: 'คัดลอก CSV แล้ว', exportFail: 'ส่งออก CSV ไม่ได้', resetDone: 'เริ่มข้อมูลตัวอย่างใหม่แล้ว',
      moved: 'ย้ายสินค้าไป "ยังไม่ระบุ" แล้ว',
      live: 'Online', liveNote: 'เชื่อมต่อ Supabase แล้ว — พนักงานทุกคนใช้ข้อมูลร่วมกันได้จากทุกเครื่อง', syncFail: 'บันทึกไม่สำเร็จ — ตรวจอินเทอร์เน็ต (กำลังลองใหม่)', syncBoot: 'เชื่อมต่อ Supabase ไม่ได้ — ตรวจ .env และอินเทอร์เน็ต', seeded: 'นำเข้ารายการสินค้าครั้งแรกแล้ว',
      pAddBtn: 'เพิ่มรายการสินค้า', pViewBtn: 'ดูรายการสินค้า', back: 'ย้อนกลับ',
      tabProducts: 'รายการสินค้า', tabSales: 'ขาย', salesSearchPh: 'ค้นหาชื่อ/รหัส แล้วกด Enter เพื่อเพิ่ม…',
      cartTitle: 'รายการที่จะขาย', cartEmpty: 'ยังไม่ได้เลือกสินค้า กดที่สินค้าเพื่อเพิ่ม', addOther: '+ รายการอื่น (ค่าแรง ฯลฯ)',
      otherPh: 'ค่าแรง / อื่นๆ', otherLine: 'ค่าแรง/อื่นๆ', total: 'รวม', received: 'รับเงิน ฿', change: 'เงินทอน', short: 'เงินไม่พอ',
      sell: 'ขายเลย', needPrice: 'มีรายการที่ยังไม่ใส่ราคา (ช่องสีเหลือง)', sold: 'ขายแล้ว', viewVoucher: 'ดูใบเสร็จ',
      todaySales: 'ยอดขายวันนี้', times: 'ครั้ง', noSalesToday: 'วันนี้ยังไม่มีการขาย', void: 'ยกเลิก', delSel: 'ลบที่เลือก', selNone: 'ติ๊กรายการที่จะลบ', lineDone: 'ลบแล้ว คืนสต็อกแล้ว', qtyDone: 'แก้จำนวนแล้ว', voidDone: 'ยกเลิกแล้ว คืนสต็อกแล้ว',
      voucher: 'ใบเสร็จ', copiedTxt: 'คัดลอกแล้ว', copyText: 'คัดลอกข้อความ', voucherNote: 'ฟังก์ชันพิมพ์จะเพิ่มในแอปจริง', overStock: 'เกินจำนวนคงเหลือ',
      tabPurchase: 'ซื้อเข้า', pTitle: 'บันทึกการซื้อเข้า', supplier: 'ผู้จำหน่าย (ชื่อร้าน)', pDate: 'วันที่', pTime: 'เวลา', pRef: 'เลขที่ใบเสร็จร้าน', pWho: 'ผู้รับเงิน', pSearchPh: 'ค้นหาชื่อ/รหัส แล้วกด Enter เพื่อเพิ่ม…', pNewItem: '+ สินค้าใหม่', pEmpty: 'ค้นหาสินค้าจากใบเสร็จแล้วเพิ่ม', qty: 'จำนวน', unitCost: 'ราคาซื้อ', pSave: 'บันทึกการซื้อ', pNeed: 'มีรายการที่ยังไม่ใส่ราคาซื้อ (ช่องสีเหลือง)', pNote: 'เมื่อบันทึก สินค้าที่ติดตามสต็อกจะเพิ่มจำนวน ต้นทุนอัปเดตเป็นราคาล่าสุด และสินค้าใหม่จะถูกเพิ่มในรายการ', pSaved: 'บันทึกการซื้อแล้ว', pHist: 'การซื้อล่าสุด', pVoucher: 'ใบซื้อเข้า', codeLbl: 'รหัส', skuLbl: 'SKU / รหัส', skuDup: 'รหัส SKU นี้ถูกใช้แล้ว', newItemName: 'สินค้าใหม่', newTag: 'ใหม่', noPurch: 'ยังไม่มีรายการซื้อ', pVoidDone: 'ยกเลิกแล้ว ปรับสต็อกกลับแล้ว',
      pickVar: 'ราคาไม่คงที่', priceEnter: 'ใส่ราคา', viewCart: 'ดู', lines: 'รายการ', view: 'ดู',
      photo: 'รูป', refund: 'คืนเงิน', refunded: 'คืนแล้ว', refundDone: 'บันทึกการคืนเงินแล้ว คืนสต็อกแล้ว',
      refundHistory: 'ประวัติการคืนเงิน', refundTotal: 'ยอดคืนเงินรวม', netTotal: 'ยอดสุทธิ',
      refundQtyLabel: 'จำนวนที่จะคืน', refundNotePh: 'ใครทำ/เหตุผล (ไม่บังคับ)',
      confirm: 'ยืนยัน', cancel: 'ยกเลิก', partRefunded: 'คืนเงินบางส่วนแล้ว',
      tabReceipts: 'ใบเสร็จ',
      rSales: 'ใบเสร็จขาย',
      rPurchase: 'ใบเสร็จซื้อ',
      rSearchPh: 'ค้นหาเลขที่ใบเสร็จ/สินค้า…',
      rNoSales: 'ยังไม่มีใบเสร็จขาย',
      rNoPurch: 'ยังไม่มีใบเสร็จซื้อ',
      rCount: 'รายการ'
    }
  };
  var TH_CATS = { 'Tyre': 'ยางนอก', 'Variator roller': 'เม็ดตุ้มน้ำหนัก', 'Brake': 'เบรก', 'Drive belt': 'สายพาน', 'Labor': 'ค่าแรง', 'Engine oil': 'น้ำมันเครื่อง',
    'Lighting': 'ไฟ/หลอดไฟ', 'Inner tube': 'ยางใน', 'Bearing': 'ลูกปืน', 'Battery': 'แบตเตอรี่', 'Gear oil': 'น้ำมันเกียร์', 'Fuel pump': 'ปั๊มน้ำมัน',
    'Spark plug': 'หัวเทียน', 'Washer': 'แหวนรอง', 'Chain': 'โซ่', 'Mirror': 'กระจก', 'Air filter': 'ไส้กรองอากาศ', 'Key/Lock': 'กุญแจ' };

  var seed = SEED;
  var S = { products: [], cats: [], lang: 'my', q: '', cat: 'all', flag: 'all', limit: PAGE, dupArmed: '',
    sales: [], cart: [], purchases: [], pcart: [], plast: '', tab: 'products', psub: 'home', scatOpen: false, sq: '', scat: 'all', slimit: 60, last: '',
    rsub: 'sales', rq: '' };
  var $ = function (id) { return document.getElementById(id); };
  var els = { list: $('list'), cats: $('cats'), flags: $('flags'), count: $('count'), head: $('head'), toast: $('toast'), q: $('q'),
    qa: $('qa'), qn: $('qa-n'), qc: $('qa-c'), qnc: $('qa-nc'), qk: $('qa-k'), qp: $('qa-p'), qs: $('qa-s'), qimg: $('qa-img'), qd: $('qa-d'),
    hint: $('qa-hint'), mgr: $('mgr'), mgrList: $('mgr-list'), mgrNew: $('mgr-new') };

  /* ---------- product photo: pick from phone, crop to a square, shrink, store as a small data URL ---------- */
  var imgInput = $('img-file'), imgTargetId = '';
  function readImage(file, cb) {
    if (!file) { cb(''); return; }
    var reader = new FileReader();
    reader.onload = function () {
      var img = new Image();
      img.onload = function () {
        var SIDE = 240;
        var w = img.width, h = img.height, crop = Math.min(w, h);
        var sx = (w - crop) / 2, sy = (h - crop) / 2;
        var cv = document.createElement('canvas'); cv.width = SIDE; cv.height = SIDE;
        var ctx = cv.getContext('2d');
        ctx.drawImage(img, sx, sy, crop, crop, 0, 0, SIDE, SIDE);
        try { cb(cv.toDataURL('image/jpeg', 0.72)); } catch (e) { cb(''); }
      };
      img.onerror = function () { cb(''); };
      img.src = reader.result;
    };
    reader.onerror = function () { cb(''); };
    reader.readAsDataURL(file);
  }
  if (imgInput) imgInput.addEventListener('change', function () {
    var file = imgInput.files && imgInput.files[0]; imgInput.value = '';
    var id = imgTargetId; imgTargetId = '';
    if (!file || !id) return;
    var p = byId(id); if (!p) return;
    readImage(file, function (data) {
      if (!data) return;
      p.img = data; save();
      if (S.tab === 'products' && S.psub === 'list') renderList();
      if (S.tab === 'sales') renderPicker();
    });
  });

  function t(k) { return (I18N[S.lang] && I18N[S.lang][k]) || I18N.my[k] || k; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function catLabel(c) {
    if (S.lang !== 'th') return c;
    if (c === UNCAT) return 'ยังไม่ระบุ';
    var m = c.match(/\(([^)]+)\)\s*$/);
    return (m && TH_CATS[m[1]]) ? TH_CATS[m[1]] : c;
  }
  function fmt(n) { return n == null ? '' : String(Math.round(n * 100) / 100); }
  function parseNum(str, allowNeg) {
    var s = String(str).replace(/[၀-၉]/g, function (d) { return '၀၁၂၃၄၅၆၇၈၉'.indexOf(d); })
      .replace(/[๐-๙]/g, function (d) { return '๐๑๒๓๔๕๖๗๘๙'.indexOf(d); }).replace(/[,฿\s]/g, '');
    if (s === '') return { v: null };
    var v = Number(s);
    if (!isFinite(v) || (v < 0 && !allowNeg)) return { err: true };
    return { v: v };
  }
  function byId(id) { for (var i = 0; i < S.products.length; i++) if (S.products[i].id === id) return S.products[i]; return null; }

  /* ---------- storage: Supabase when .env is set, otherwise browser-only demo ---------- */
  var DB = makeDb();
  var LANG_KEY = 'sk-lang';
  var TABLES = [['categories', 'name'], ['products', 'id'], ['sales', 'id'], ['purchases', 'id']];
  var saveTimer = null, retryTimer = null, snap = null, syncing = false, dirty = false, pending = false, ready = false;

  function setSync(state) {
    var el = $('sync'); if (!el) return;
    el.hidden = !DB; el.dataset.state = state;
    el.textContent = state === 'ok' ? '☁ ✓' : (state === 'busy' ? '☁ …' : '☁ ⚠');
  }

  function rowsOf() {
    var o = { categories: {}, products: {}, sales: {}, purchases: {} };
    S.cats.forEach(function (c, i) { o.categories[c] = { name: c, sort: i }; });
    S.products.forEach(function (p) {
      o.products[p.id] = { id: p.id, name: p.n, category: p.c, price: p.p == null ? null : p.p, cost: p.k == null ? null : p.k,
        stock: p.s == null ? null : p.s, tracked: !!p.t, service: !!p.v, code: p.d || '', ts: p.ts || null, image_url: p.img || '' };
    });
    S.sales.forEach(function (s) {
      o.sales[s.id] = { id: s.id, voucher_no: s.no, ts: s.ts, total: s.total, rcv: s.rcv == null ? null : s.rcv, voided: !!s.void, lines: s.lines, refunds: s.refunds || [] };
    });
    S.purchases.forEach(function (b) {
      o.purchases[b.id] = { id: b.id, voucher_no: b.no, ts: b.ts, supplier: b.sup || '', ref: b.ref || '', who: b.who || '', total: b.total, voided: !!b.void, lines: b.lines };
    });
    return o;
  }
  function strMap(rows) { var m = {}; Object.keys(rows).forEach(function (k) { m[k] = JSON.stringify(rows[k]); }); return m; }
  function num(v) { return v == null ? null : Number(v); }

  async function fetchAll() {
    var since = Date.now() - 14 * 86400000;
    var r = await Promise.all([
      DB.fetchTable('categories', 'sort', true),
      DB.fetchTable('products', 'id', true),
      DB.fetchTable('sales', 'ts', false, { gte: ['ts', since] }),
      DB.fetchTable('purchases', 'ts', false, { limit: 200 })
    ]);
    return { categories: r[0], products: r[1], sales: r[2], purchases: r[3] };
  }
  function applyRows(d) {
    S.cats = d.categories.map(function (r) { return r.name; });
    S.products = d.products.map(function (r) {
      var p = { id: r.id, n: r.name, c: r.category, p: num(r.price), k: num(r.cost), s: num(r.stock), t: !!r.tracked, v: !!r.service, d: r.code || '', img: r.image_url || '' };
      if (r.ts != null) p.ts = Number(r.ts);
      return p;
    });
    S.sales = d.sales.map(function (r) { return { id: r.id, no: r.voucher_no, ts: Number(r.ts), total: Number(r.total), rcv: num(r.rcv), void: !!r.voided, lines: r.lines || [], refunds: r.refunds || [] }; });
    S.purchases = d.purchases.map(function (r) { return { id: r.id, no: r.voucher_no, ts: Number(r.ts), sup: r.supplier || '', ref: r.ref || '', who: r.who || '', total: Number(r.total), void: !!r.voided, lines: r.lines || [] }; });
    var rows = rowsOf(); snap = {};
    TABLES.forEach(function (tb) { snap[tb[0]] = strMap(rows[tb[0]]); });
  }

  async function syncNow() {
    if (!DB || !ready) return;
    if (syncing) { dirty = true; return; }
    syncing = true; dirty = false; pending = false; setSync('busy');
    try {
      var cur = rowsOf();
      for (var i = 0; i < TABLES.length; i++) {
        var tb = TABLES[i][0], key = TABLES[i][1], cs = strMap(cur[tb]), up = [], del = [];
        Object.keys(cs).forEach(function (k) { if (snap[tb][k] !== cs[k]) up.push(cur[tb][k]); });
        Object.keys(snap[tb]).forEach(function (k) { if (!(k in cs)) del.push(k); });
        for (var a = 0; a < up.length; a += 400) await DB.upsert(tb, up.slice(a, a + 400), key);
        for (var b = 0; b < del.length; b += 100) await DB.remove(tb, key, del.slice(b, b + 100));
        snap[tb] = cs;
      }
      setSync('ok');
    } catch (e) {
      console.error(e); setSync('err'); toast(t('syncFail'));
      clearTimeout(retryTimer); retryTimer = setTimeout(syncNow, 6000);
    }
    syncing = false;
    if (dirty) setTimeout(syncNow, 200);
  }

  async function loadRemote() {
    var d = await fetchAll();
    if (!d.products.length && !d.categories.length) {      // first run: import the Loyverse list
      loadSeed(); snap = { categories: {}, products: {}, sales: {}, purchases: {} };
      ready = true; ensureUncat(); pending = true; syncNow(); toast(t('seeded'));
    } else { applyRows(d); ready = true; }
  }
  async function refreshRemote(force) {
    if (!DB) return;
    var ae = document.activeElement;
    if (ready && !force && (syncing || dirty || pending || (ae && /^(INPUT|SELECT|TEXTAREA)$/.test(ae.tagName)) || !sEl.vch.hidden || !els.mgr.hidden)) return;
    try {
      var d = await fetchAll();
      var wasReady = ready;
      applyRows(d); ready = true; ensureUncat();
      setSync('ok'); render();
      if (!wasReady) populateQaCats();
    } catch (e) { console.error(e); if (!ready) setSync('err'); }
  }

  function save() {
    try { localStorage.setItem(LANG_KEY, S.lang); } catch (e) {}
    if (DB) { pending = true; clearTimeout(saveTimer); saveTimer = setTimeout(syncNow, 400); return; }
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      try { localStorage.setItem(LS_KEY, JSON.stringify({ products: S.products, cats: S.cats, lang: S.lang, sales: S.sales, purchases: S.purchases })); } catch (e) {}
    }, 200);
  }
  function ensureImgField() { S.products.forEach(function (p) { if (p.img == null) p.img = ''; }); }
  function ensureRefundsField() { S.sales.forEach(function (s) { if (!Array.isArray(s.refunds)) s.refunds = []; }); }
  function loadSeed() {
    S.products = seed.products.map(function (p) { return Object.assign({}, p); });
    S.cats = seed.cats.slice();
    S.sales = []; S.cart = []; S.last = ''; S.purchases = []; S.pcart = []; S.plast = '';
    ensureImgField(); ensureRefundsField();
  }
  function load() {
    try {
      var raw = localStorage.getItem(LS_KEY);
      if (raw) {
        var d = JSON.parse(raw);
        if (d && Array.isArray(d.products) && Array.isArray(d.cats)) {
          S.products = d.products; S.cats = d.cats; S.sales = Array.isArray(d.sales) ? d.sales : []; S.purchases = Array.isArray(d.purchases) ? d.purchases : [];
          if (d.lang === 'my' || d.lang === 'th') S.lang = d.lang;
          ensureImgField(); ensureRefundsField();
          return;
        }
      }
    } catch (e) {}
    loadSeed();
  }

  /* ---------- helpers ---------- */
  var toastTimer = null;
  function toast(msg) {
    els.toast.textContent = msg; els.toast.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { els.toast.hidden = true; }, 2200);
  }
  function ensureUncat() { if (S.cats.indexOf(UNCAT) < 0) S.cats.push(UNCAT); }
  function needsCost(p) { return p.k == null && !p.v; }
  function isLow(p) { return p.t && !p.v && p.s != null && p.s <= 0; }
  function marginOf(p) { return (p.k > 0 && p.p > 0) ? (p.p - p.k) / p.p : null; }

  function applyLang() {
    document.documentElement.lang = S.lang === 'th' ? 'th' : 'my';
    Array.prototype.forEach.call(document.querySelectorAll('[data-t]'), function (el) { el.textContent = t(el.dataset.t); });
    Array.prototype.forEach.call(document.querySelectorAll('[data-tp]'), function (el) { el.placeholder = t(el.dataset.tp); });
    Array.prototype.forEach.call(document.querySelectorAll('[data-lang]'), function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === S.lang)); });
    els.head.innerHTML = '<span>' + esc(t('name')) + ' / ' + esc(t('category')) + '</span><span>' + esc(t('cost')) + '</span><span>' + esc(t('price')) +
      '</span><span>' + esc(t('margin')) + '</span><span>' + esc(t('stock')) + '</span><span></span>';
    document.title = t('title');
    populateQaCats();
    render();
  }

  function populateQaCats(select) {
    var cur = select || els.qc.value;
    var h = '';
    S.cats.forEach(function (c) { h += '<option value="' + esc(c) + '">' + esc(catLabel(c)) + '</option>'; });
    h += '<option value="__new">' + esc(t('newCat')) + '</option>';
    els.qc.innerHTML = h;
    if (cur && (cur === '__new' || S.cats.indexOf(cur) >= 0)) els.qc.value = cur;
    else els.qc.value = S.cats[0] || '__new';
    els.qnc.hidden = els.qc.value !== '__new';
  }

  /* ---------- rendering ---------- */
  function visible() {
    var q = S.q.trim().toLowerCase();
    var order = {}; S.cats.forEach(function (c, i) { order[c] = i; });
    return S.products.filter(function (p) {
      if (S.cat !== 'all' && p.c !== S.cat) return false;
      if (S.flag === 'nocost' && !needsCost(p)) return false;
      if (S.flag === 'lowstock' && !isLow(p)) return false;
      if (S.flag === 'untracked' && !(!p.t && !p.v)) return false;
      if (q && (p.n + ' ' + p.c + ' ' + (p.d || '')).toLowerCase().indexOf(q) < 0) return false;
      return true;
    }).sort(function (a, b) {
      if (a.ts || b.ts) { var d = (b.ts || 0) - (a.ts || 0); if (d) return d; }
      var oc = (order[a.c] || 0) - (order[b.c] || 0); if (oc) return oc;
      return a.n.localeCompare(b.n);
    });
  }

  function renderChips() {
    var counts = {}; var nCost = 0, nLow = 0, nUn = 0;
    S.products.forEach(function (p) {
      counts[p.c] = (counts[p.c] || 0) + 1;
      if (needsCost(p)) nCost++; if (isLow(p)) nLow++; if (!p.t && !p.v) nUn++;
    });
    var h = '<button type="button" class="chip" data-cat="all" aria-pressed="' + (S.cat === 'all') + '">' + esc(t('all')) + ' <b>' + S.products.length + '</b></button>';
    S.cats.forEach(function (c) {
      h += '<button type="button" class="chip" data-cat="' + esc(c) + '" aria-pressed="' + (S.cat === c) + '">' + esc(catLabel(c)) + ' <b>' + (counts[c] || 0) + '</b></button>';
    });
    els.cats.innerHTML = h;
    function fl(key, label, n) {
      return '<button type="button" class="chip flag" data-flag="' + key + '" aria-pressed="' + (S.flag === key) + '">' + esc(label) + ' <b>' + n + '</b></button>';
    }
    els.flags.innerHTML = fl('nocost', t('noCost'), nCost) + fl('lowstock', t('lowStock'), nLow) + fl('untracked', t('untracked'), nUn);
  }

  function rowHtml(p, catOpts) {
    var m = marginOf(p);
    var mcls = m == null ? '' : (m <= 0 ? 'bad' : (m < 0.15 ? 'low' : 'good'));
    var stockCell;
    if (p.v) stockCell = '<span class="dash">—</span>';
    else if (p.t) {
      var scls = (p.s != null && p.s < 0) ? ' neg' : ((p.s === 0) ? ' zero' : '');
      stockCell = '<input class="cell num stock' + scls + '" data-f="s" inputmode="numeric" value="' + esc(fmt(p.s)) + '" aria-label="' + esc(t('stock')) + '">';
    } else stockCell = '<button type="button" class="pill" data-act="track" title="' + esc(t('trackTip')) + '">' + esc(t('untrackedPill')) + '</button>';
    return '<div class="row" data-id="' + esc(p.id) + '">' +
      '<div class="c-name"><div class="name-row">' +
      '<button type="button" class="thumb' + (p.img ? '' : ' ph') + '" data-act="img" title="' + esc(t('photo')) + '" aria-label="' + esc(t('photo')) + '">' +
      (p.img ? '<img src="' + esc(p.img) + '" alt="">' : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h3l2-2h6l2 2h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="3.2"/></svg>') +
      '</button>' +
      '<input class="cell name" data-f="n" value="' + esc(p.n) + '" aria-label="' + esc(t('name')) + '"></div>' +
      '<select class="cell catsel' + (p.c === UNCAT ? ' uncat' : '') + '" data-f="c" aria-label="' + esc(t('category')) + '">' + catOpts.replace('value="' + esc(p.c) + '"', 'value="' + esc(p.c) + '" selected') + '</select></div>' +
      '<label class="c-cost"><span class="lbl">' + esc(t('cost')) + '</span><input class="cell num cost' + (needsCost(p) ? ' need' : '') + '" data-f="k" inputmode="decimal" value="' + esc(fmt(p.k)) + '" placeholder="—"></label>' +
      '<label class="c-price"><span class="lbl">' + esc(t('price')) + '</span><input class="cell num price" data-f="p" inputmode="decimal" value="' + esc(fmt(p.p)) + '" placeholder="' + esc(t('varPh')) + '"></label>' +
      '<div class="c-margin"><span class="lbl">' + esc(t('margin')) + '</span><span class="margin ' + mcls + '">' + (m == null ? '—' : Math.round(m * 100) + '%') + '</span></div>' +
      '<div class="c-stock"><span class="lbl">' + esc(t('stock')) + '</span>' + stockCell + '</div>' +
      '<div class="c-del"><button type="button" class="del" data-act="del" aria-label="' + esc(t('del')) + '">×</button></div>' +
      '</div>';
  }

  function renderList() {
    var rows = visible();
    var catOpts = S.cats.map(function (c) { return '<option value="' + esc(c) + '">' + esc(catLabel(c)) + '</option>'; }).join('');
    var shown = rows.slice(0, S.limit);
    var h = shown.map(function (p) { return rowHtml(p, catOpts); }).join('');
    if (!rows.length) h = '<div class="empty">' + esc(t('none')) + '</div>';
    if (rows.length > shown.length) h += '<button type="button" class="btn more" data-act="more">' + esc(t('more')) + '</button>';
    els.list.innerHTML = h;
    els.count.textContent = t('showing') + ' ' + shown.length + ' ' + t('of') + ' ' + S.products.length + ' ' + t('unit');
  }
  function nextSku() { var m = 9999; S.products.forEach(function (p) { if (/^\d{1,7}$/.test(p.d || '')) m = Math.max(m, parseInt(p.d, 10)); }); return String(m + 1); }
  function fillSku() { if (els.qd && els.qd.dataset.touched !== '1') els.qd.value = nextSku(); }
  function isNarrowP() { return !!(window.matchMedia && window.matchMedia('(max-width: 960px)').matches); }
  function setPSub(sub) {
    var narrow = isNarrowP();
    if (sub === 'home' && narrow) sub = 'list';
    S.psub = sub;
    if (sub === 'add') fillSku();
    $('fab-add').hidden = !(narrow && sub === 'list');
    $('phome').hidden = sub !== 'home'; $('psubbar').hidden = narrow ? sub !== 'add' : sub === 'home';
    $('psec-add').hidden = sub !== 'add'; $('psec-list').hidden = sub !== 'list';
    $('pb-add').hidden = sub === 'add'; $('pb-list').hidden = sub === 'list';
    if (sub === 'list') { renderChips(); renderList(); }
    if (sub === 'add' && window.matchMedia && window.matchMedia('(pointer: fine)').matches) els.qn.focus();
    window.scrollTo(0, 0);
  }
  Array.prototype.forEach.call(document.querySelectorAll('[data-psub]'), function (b) {
    b.addEventListener('click', function () { setPSub(b.dataset.psub); });
  });
  function render() {
    if (S.tab === 'sales') renderSales();
    else if (S.tab === 'purchase') renderPurchase();
    else if (S.tab === 'receipts') renderReceipts();
    else { $('pcount').textContent = S.products.length; if (S.psub === 'list') { renderChips(); renderList(); } }
  }

  /* ---------- in-place editing ---------- */
  function refreshRow(row, p) {
    var m = marginOf(p), mEl = row.querySelector('.margin');
    mEl.className = 'margin ' + (m == null ? '' : (m <= 0 ? 'bad' : (m < 0.15 ? 'low' : 'good')));
    mEl.textContent = m == null ? '—' : Math.round(m * 100) + '%';
    var c = row.querySelector('.cost'); if (c) c.classList.toggle('need', needsCost(p));
    var s = row.querySelector('.stock');
    if (s) { s.classList.toggle('neg', p.s != null && p.s < 0); s.classList.toggle('zero', p.s === 0); }
    var cs = row.querySelector('.catsel'); if (cs) cs.classList.toggle('uncat', p.c === UNCAT);
  }
  function commit(el) {
    var row = el.closest('.row'); if (!row) return;
    var p = byId(row.dataset.id); if (!p) return;
    var f = el.dataset.f;
    if (f === 'n') {
      var v = el.value.trim();
      if (!v) { el.value = p.n; return; }
      p.n = v;
    } else if (f === 'c') {
      p.c = el.value;
    } else {
      var r = parseNum(el.value, f === 's');
      if (r.err) { toast(t('badNum')); el.value = fmt(p[f]); return; }
      if (f === 's' && r.v == null) r.v = 0;
      p[f] = r.v;
      el.value = fmt(p[f]);
    }
    refreshRow(row, p);
    renderChips();
    save();
  }
  els.list.addEventListener('change', function (e) { if (e.target.dataset && e.target.dataset.f) commit(e.target); });
  els.list.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' || !e.target.dataset || !e.target.dataset.f || e.target.tagName === 'SELECT') return;
    e.preventDefault();
    var f = e.target.dataset.f;
    var all = Array.prototype.slice.call(els.list.querySelectorAll('input[data-f="' + f + '"]'));
    var i = all.indexOf(e.target), next = all[i + 1];
    commit(e.target);
    if (next) { next.focus(); next.select(); } else e.target.blur();
  });
  els.list.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-act]'); if (!btn) return;
    var act = btn.dataset.act;
    if (act === 'more') { S.limit += PAGE; renderList(); return; }
    var row = btn.closest('.row'); var p = row && byId(row.dataset.id);
    if (act === 'img' && p) { imgTargetId = p.id; imgInput.click(); return; }
    if (act === 'track' && p) { p.t = true; p.s = 0; save(); render(); return; }
    if (act === 'del' && p) {
      if (btn.dataset.armed === '1') {
        S.products = S.products.filter(function (x) { return x.id !== p.id; });
        save(); render(); toast(t('deleted') + ': ' + p.n);
      } else {
        btn.dataset.armed = '1'; btn.textContent = t('sure');
        setTimeout(function () { if (btn.isConnected) { btn.dataset.armed = ''; btn.textContent = '×'; } }, 3000);
      }
    }
  });

  /* ---------- filters ---------- */
  els.q.addEventListener('input', function () { S.q = els.q.value; S.limit = PAGE; renderList(); });
  els.cats.addEventListener('click', function (e) {
    var b = e.target.closest('[data-cat]'); if (!b) return;
    S.cat = b.dataset.cat; S.limit = PAGE; render();
  });
  els.flags.addEventListener('click', function (e) {
    var b = e.target.closest('[data-flag]'); if (!b) return;
    S.flag = (S.flag === b.dataset.flag) ? 'all' : b.dataset.flag; S.limit = PAGE; render();
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-lang]'), function (b) {
    b.addEventListener('click', function () { S.lang = b.dataset.lang; save(); applyLang(); });
  });

  /* ---------- quick add ---------- */
  els.qc.addEventListener('change', function () {
    els.qnc.hidden = els.qc.value !== '__new';
    if (!els.qnc.hidden) els.qnc.focus();
  });
  function setHint(msg, warn) {
    els.hint.textContent = msg || t('priceHint');
    els.hint.className = 'hint' + (warn ? ' warn' : '');
  }
  function addProduct() {
    var name = els.qn.value.trim();
    if (!name) { els.qn.focus(); toast(t('needName')); return; }
    var cat = els.qc.value, newCat = false;
    if (cat === '__new') {
      cat = els.qnc.value.trim();
      if (!cat) { els.qnc.focus(); toast(t('needCat')); return; }
      var existing = S.cats.filter(function (c) { return c.toLowerCase() === cat.toLowerCase(); })[0];
      if (existing) cat = existing; else newCat = true;
    }
    var k = parseNum(els.qk.value), p = parseNum(els.qp.value), s = parseNum(els.qs.value, true);
    if (k.err || p.err || s.err) { toast(t('badNum')); return; }
    var sku = els.qd.value.trim();
    if (sku && S.products.some(function (x) { return (x.d || '').toLowerCase() === sku.toLowerCase(); })) { els.qd.focus(); toast(t('skuDup')); return; }
    var key = name.toLowerCase();
    if (S.products.some(function (x) { return x.n.toLowerCase() === key; }) && S.dupArmed !== key) {
      S.dupArmed = key; setHint(t('dup'), true); return;
    }
    S.dupArmed = ''; setHint('');
    var track = s.v != null;
    var photo = els.qimg && els.qimg.files && els.qimg.files[0];
    function finish(imgData) {
      if (newCat) { S.cats.push(cat); ensureUncat(); }
      var prod = { id: 'n' + Date.now() + Math.random().toString(36).slice(2, 6), n: name, c: cat, p: p.v, k: k.v,
        s: track ? s.v : null, t: track, v: false, d: sku, ts: Date.now(), img: imgData || '' };
      S.products.push(prod);
      if (S.cat !== 'all' && S.cat !== cat) S.cat = 'all';
      S.flag = 'all'; S.q = ''; els.q.value = ''; S.limit = PAGE;
      populateQaCats(cat); els.qnc.value = '';
      els.qn.value = ''; els.qk.value = ''; els.qp.value = ''; els.qs.value = ''; if (els.qimg) els.qimg.value = ''; els.qd.dataset.touched = ''; fillSku();
      save(); render(); toast(t('added') + ': ' + name); els.qn.focus();
      if (isNarrowP()) setPSub('list');
    }
    if (photo) readImage(photo, finish); else finish('');
  }
  els.qa.addEventListener('submit', function (e) { e.preventDefault(); addProduct(); });
  els.qa.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' || e.target.tagName === 'BUTTON' || e.target.tagName === 'SELECT' || e.target.type === 'checkbox') return;
    e.preventDefault();
    var order = [els.qn, els.qnc, els.qk, els.qp, els.qs, els.qd].filter(function (el) { return !el.hidden && !el.closest('[hidden]'); });
    var i = order.indexOf(e.target);
    if (i >= 0 && i < order.length - 1) { order[i + 1].focus(); } else addProduct();
  });
  els.qd.addEventListener('input', function () { els.qd.dataset.touched = '1'; });
  els.qn.addEventListener('input', function () { if (S.dupArmed) { S.dupArmed = ''; setHint(''); } });

  /* ---------- manage categories ---------- */
  var lastFocus = null;
  function openMgr() { lastFocus = document.activeElement; els.mgr.hidden = false; renderMgr(); els.mgrNew.focus(); }
  function closeMgr() { els.mgr.hidden = true; if (lastFocus && lastFocus.focus) lastFocus.focus(); }
  function renderMgr() {
    var counts = {}; S.products.forEach(function (p) { counts[p.c] = (counts[p.c] || 0) + 1; });
    els.mgrList.innerHTML = S.cats.filter(function (c) { return c !== UNCAT; }).map(function (c) {
      return '<div class="mrow" data-cat="' + esc(c) + '"><input value="' + esc(c) + '" aria-label="' + esc(t('category')) + '">' +
        '<span class="cnt">' + (counts[c] || 0) + '</span><button type="button" class="del" data-act="delcat">' + esc(t('del')) + '</button></div>';
    }).join('');
  }
  function addCat() {
    var v = els.mgrNew.value.trim(); if (!v) return;
    if (S.cats.some(function (c) { return c.toLowerCase() === v.toLowerCase(); })) { toast(t('catExists')); return; }
    var at = S.cats.indexOf(UNCAT); if (at < 0) at = S.cats.length;
    S.cats.splice(at, 0, v); ensureUncat();
    els.mgrNew.value = ''; save(); renderMgr(); populateQaCats(); render(); toast(t('catAdded') + ': ' + v);
  }
  $('mgr-open').addEventListener('click', openMgr);
  $('mgr-close').addEventListener('click', closeMgr);
  $('mgr-add').addEventListener('click', addCat);
  els.mgrNew.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); addCat(); } });
  els.mgr.addEventListener('mousedown', function (e) { if (e.target === els.mgr) closeMgr(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !els.mgr.hidden) closeMgr(); });
  els.mgrList.addEventListener('change', function (e) {
    var row = e.target.closest('.mrow'); if (!row) return;
    var old = row.dataset.cat, v = e.target.value.trim();
    if (!v) { e.target.value = old; return; }
    if (v === old) return;
    if (S.cats.some(function (c) { return c.toLowerCase() === v.toLowerCase() && c !== old; })) { toast(t('catExists')); e.target.value = old; return; }
    S.cats[S.cats.indexOf(old)] = v;
    S.products.forEach(function (p) { if (p.c === old) p.c = v; });
    if (S.cat === old) S.cat = v;
    save(); renderMgr(); populateQaCats(); render();
  });
  els.mgrList.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-act="delcat"]'); if (!btn) return;
    var row = btn.closest('.mrow'), c = row.dataset.cat;
    if (btn.dataset.armed !== '1') {
      btn.dataset.armed = '1'; btn.textContent = t('sure');
      setTimeout(function () { if (btn.isConnected) { btn.dataset.armed = ''; btn.textContent = t('del'); } }, 3000);
      return;
    }
    var moved = 0;
    S.products.forEach(function (p) { if (p.c === c) { p.c = UNCAT; moved++; } });
    if (moved) ensureUncat();
    S.cats = S.cats.filter(function (x) { return x !== c; });
    if (S.cat === c) S.cat = 'all';
    save(); renderMgr(); populateQaCats(); render(); toast(t('catDeleted') + (moved ? ' · ' + t('moved') : ''));
  });

  /* ---------- export / reset ---------- */
  function csvCell(v) { var s = v == null ? '' : String(v); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; }
  function buildCsv() {
    var lines = [['name', 'category', 'cost_thb', 'price_thb', 'stock', 'track_stock', 'is_service', 'code'].join(',')];
    S.products.forEach(function (p) {
      lines.push([p.n, p.c, p.k, p.p, p.s, p.t ? 'Y' : 'N', p.v ? 'Y' : 'N', p.d].map(csvCell).join(','));
    });
    return '﻿' + lines.join('\n');
  }
  $('export').addEventListener('click', function () {
    var csv = buildCsv();
    var use = window.claude && window.claude.use ? window.claude.use('downloads') : Promise.resolve(null);
    Promise.resolve(use).catch(function () { return null; }).then(function (dl) {
      if (dl && dl.save) {
        return dl.save({ filename: 'products.csv', data: csv }).then(function () { toast(t('exported')); },
          function (err) { if (!err || err.code !== 'declined') toast(t('exportFail')); });
      }
      try {
        var url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
        var a = document.createElement('a'); a.href = url; a.download = 'products.csv';
        document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
        toast(t('exported')); return;
      } catch (e) {}
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(csv).then(function () { toast(t('copied')); }, function () { toast(t('exportFail')); });
      }
      toast(t('exportFail'));
    });
  });
  var resetBtn = $('reset');
  resetBtn.addEventListener('click', function () {
    if (resetBtn.dataset.armed === '1') {
      resetBtn.dataset.armed = ''; resetBtn.textContent = t('reset');
      loadSeed(); S.cat = 'all'; S.flag = 'all'; S.q = ''; els.q.value = ''; S.limit = PAGE;
      save(); populateQaCats(); render(); toast(t('resetDone'));
    } else {
      resetBtn.dataset.armed = '1'; resetBtn.textContent = t('resetSure');
      setTimeout(function () { if (resetBtn.dataset.armed === '1') { resetBtn.dataset.armed = ''; resetBtn.textContent = t('reset'); } }, 3500);
    }
  });

  /* ---------- sales ---------- */
  function p2(n) { return (n < 10 ? '0' : '') + n; }
  function money(n) { return '฿' + (Math.round(n * 100) / 100).toLocaleString('en-US'); }
  function ymd(ts) { var d = new Date(ts); return d.getFullYear() + p2(d.getMonth() + 1) + p2(d.getDate()); }
  function hm(ts) { var d = new Date(ts); return p2(d.getHours()) + ':' + p2(d.getMinutes()); }
  function dmy(ts) { var d = new Date(ts); return p2(d.getDate()) + '/' + p2(d.getMonth() + 1) + '/' + d.getFullYear(); }
  function lineTotal(l) { return l.p == null ? 0 : Math.round(l.q * l.p * 100) / 100; }
  function lineRefundedQty(s, li) {
    var sum = 0; (s.refunds || []).forEach(function (r) { if (r.li === li) sum += r.q; });
    return Math.round(sum * 100) / 100;
  }
  function saleRefundTotal(s) { return Math.round((s.refunds || []).reduce(function (sum, r) { return sum + r.amt; }, 0) * 100) / 100; }
  function saleNetTotal(s) { return Math.round((s.total - saleRefundTotal(s)) * 100) / 100; }
  function cartTotal() { var s = 0; S.cart.forEach(function (l) { s += lineTotal(l); }); return Math.round(s * 100) / 100; }
  function cartMissing() { return S.cart.some(function (l) { return l.p == null; }); }
  function cartCount() { var n = 0; S.cart.forEach(function (l) { n += l.q; }); return Math.round(n * 100) / 100; }

  var sEl = { sq: $('sq'), scats: $('scats'), pick: $('pick'), lines: $('cart-lines'), total: $('c-total'), rcv: $('rcv'),
    chgRow: $('chg-row'), chg: $('c-change'), msg: $('c-msg'), sell: $('sell'), last: $('lastsale'), hist: $('hist'), histSum: $('hist-sum'),
    bar: $('cartbar'), barSum: $('cb-sum'), vch: $('vch'), vchBody: $('vch-body'), scrim: $('cart-scrim') };

  /* ---------- phone: the cart/ticket opens as a sheet over the product grid, instead of sitting inline ---------- */
  function openCartSheet() {
    if (!S.cart.length) return;
    document.body.classList.add('cart-open');
    if (sEl.scrim) sEl.scrim.hidden = false;
  }
  function closeCartSheet() {
    document.body.classList.remove('cart-open');
    if (sEl.scrim) sEl.scrim.hidden = true;
  }

  function setTab(tab) {
    S.tab = (tab === 'sales' || tab === 'purchase' || tab === 'receipts') ? tab : 'products';
    $('view-products').hidden = S.tab !== 'products';
    $('view-sales').hidden = S.tab !== 'sales';
    $('view-purchase').hidden = S.tab !== 'purchase';
    $('view-receipts').hidden = S.tab !== 'receipts';
    if (S.tab === 'purchase') initPForm();
    if (S.tab === 'products') setPSub('home');
    Array.prototype.forEach.call(document.querySelectorAll('#nav [data-tab]'), function (b) {
      if (b.dataset.tab === S.tab) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
    });
    closeNav();
    try { if (location.hash !== '#' + S.tab) location.hash = S.tab; } catch (e) {}
    render();
    if (S.tab !== 'sales') { sEl.bar.hidden = true; document.body.classList.remove('has-bar'); closeCartSheet(); }
    if (S.tab === 'sales' && window.matchMedia && window.matchMedia('(pointer: fine)').matches) sEl.sq.focus();
    if (S.tab === 'purchase' && window.matchMedia && window.matchMedia('(pointer: fine)').matches) $('pq').focus();
    if (S.tab === 'receipts' && window.matchMedia && window.matchMedia('(pointer: fine)').matches) { var rq = $('r-q'); if (rq) rq.focus(); }
  }
  Array.prototype.forEach.call(document.querySelectorAll('#nav [data-tab]'), function (b) {
    b.addEventListener('click', function () {
      if (b.dataset.tab === 'receipts') {
        var sub = $('nav-rsub'); sub.hidden = !sub.hidden; b.setAttribute('aria-expanded', String(!sub.hidden)); return;
      }
      setTab(b.dataset.tab);
    });
  });
  Array.prototype.forEach.call(document.querySelectorAll('#nav [data-rnav]'), function (b) {
    b.addEventListener('click', function () { S.rsub = b.dataset.rnav; setTab('receipts'); });
  });
  var navEl = $('nav'), navBtn = $('menu-open');
  function openNav() {
    navEl.classList.add('open'); $('nav-scrim').hidden = false; navBtn.setAttribute('aria-expanded', 'true');
    var cur = navEl.querySelector('[aria-current="page"]') || navEl.querySelector('.nav-btn'); if (cur) cur.focus();
  }
  function closeNav() {
    if (!navEl.classList.contains('open')) return;
    navEl.classList.remove('open'); $('nav-scrim').hidden = true; navBtn.setAttribute('aria-expanded', 'false');
  }
  navBtn.addEventListener('click', openNav);
  $('nav-close').addEventListener('click', function () { closeNav(); navBtn.focus(); });
  $('nav-scrim').addEventListener('click', closeNav);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && navEl.classList.contains('open')) { closeNav(); navBtn.focus(); } });
  window.addEventListener('hashchange', function () {
    var h = location.hash.replace('#', '');
    if ((h === 'sales' || h === 'products' || h === 'purchase' || h === 'receipts') && h !== S.tab) setTab(h);
  });

  function pickerRows() {
    var toks = S.sq.trim().toLowerCase().split(/\s+/).filter(Boolean);
    var q = S.sq.trim().toLowerCase();
    var order = {}; S.cats.forEach(function (c, i) { order[c] = i; });
    var rows = S.products.filter(function (p) {
      if (S.scat !== 'all' && p.c !== S.scat) return false;
      if (!toks.length) return true;
      var hay = (p.n + ' ' + p.c + ' ' + (p.d || '')).toLowerCase();
      return toks.every(function (k) { return hay.indexOf(k) >= 0; });
    });
    function rank(p) {
      if (!q) return 3;
      if ((p.d || '').toLowerCase() === q) return 0;
      if (p.n.toLowerCase().indexOf(q) === 0) return 1;
      return 2;
    }
    rows.sort(function (a, b) {
      var r = rank(a) - rank(b); if (r) return r;
      var oc = (order[a.c] || 0) - (order[b.c] || 0); if (oc) return oc;
      return a.n.localeCompare(b.n);
    });
    return rows;
  }

  function renderSCats() {
    var vis = S.cats;
    if (!S.scatOpen) {                       // collapsed: first few categories (+ the chosen one); ▾ opens all
      vis = S.cats.slice(0, 4);
      if (S.scat !== 'all' && vis.indexOf(S.scat) < 0) vis = vis.concat([S.scat]);
    }
    $('scat-toggle').setAttribute('aria-expanded', String(S.scatOpen));
    sEl.scats.classList.toggle('open', S.scatOpen);
    var h = '<button type="button" class="chip" data-scat="all" aria-pressed="' + (S.scat === 'all') + '">' + esc(t('all')) + '</button>';
    vis.forEach(function (c) {
      h += '<button type="button" class="chip" data-scat="' + esc(c) + '" aria-pressed="' + (S.scat === c) + '">' + esc(catLabel(c)) + '</button>';
    });
    sEl.scats.innerHTML = h;
    renderScatQuick();
  }

  function renderScatQuick() {
    var sel = $('scat-quick'); if (!sel) return;
    var h = '<option value="all">' + esc(t('all')) + '</option>';
    S.cats.forEach(function (c) { h += '<option value="' + esc(c) + '">' + esc(catLabel(c)) + '</option>'; });
    sel.innerHTML = h; sel.value = S.scat;
  }

  function renderPicker() {
    var rows = pickerRows();
    if (!rows.length) { sEl.pick.innerHTML = '<p class="hint" style="padding:14px">' + esc(t('none')) + '</p>'; return; }
    var show = rows.slice(0, S.slimit), h = '<div class="pickgrid">';
    show.forEach(function (p) {
      var out = p.t && !p.v && p.s != null && p.s <= 0;
      h += '<button type="button" class="pick' + (out ? ' out' : '') + '" data-id="' + esc(p.id) + '">' +
        (out ? '<span class="pk-flag bad">' + esc(t('lowStock')) + '</span>' : (p.p == null ? '<span class="pk-flag">' + esc(t('pickVar')) + '</span>' : '')) +
        '<span class="pk-img' + (p.img ? '' : ' ph') + '">' + (p.img ? '<img src="' + esc(p.img) + '" alt="" loading="lazy">' : '') + '</span>' +
        '<span class="pk-n">' + esc(p.n) + '</span></button>';
    });
    h += '</div>';
    if (rows.length > show.length) h += '<p style="text-align:center"><button type="button" class="btn" id="pick-more">' + esc(t('more')) + ' (' + (rows.length - show.length) + ')</button></p>';
    sEl.pick.innerHTML = h;
  }

  function lineHtml(l, i) {
    var p = l.pid ? byId(l.pid) : null;
    var over = p && p.t && p.s != null && l.q > p.s;
    var nameCell = l.pid ? '<span class="cl-name">' + esc(l.n) + '</span>'
      : '<input class="cl-name-in" data-f="n" value="' + esc(l.n) + '" placeholder="' + esc(t('otherPh')) + '" aria-label="' + esc(t('otherPh')) + '">';
    return '<div class="cl" data-i="' + i + '"><div class="cl-top">' + nameCell +
      '<button type="button" class="btn x" data-act="rm" aria-label="' + esc(t('del')) + '">✕</button></div>' +
      '<div class="cl-bot"><span class="stp"><button type="button" data-act="dec" aria-label="-">−</button>' +
      '<input class="num" data-f="q" inputmode="decimal" value="' + esc(fmt(l.q)) + '" aria-label="qty"><button type="button" data-act="inc" aria-label="+">+</button></span>' +
      '<span>×</span><input class="num cl-p' + (l.p == null ? ' need' : '') + '" data-f="p" inputmode="decimal" value="' + esc(fmt(l.p)) + '" placeholder="' + esc(t('priceEnter')) + '" aria-label="' + esc(t('price')) + '">' +
      '<span class="cl-t">' + (l.p == null ? '' : esc(money(lineTotal(l)))) + '</span></div>' +
      (over ? '<div class="cl-warn">' + esc(t('overStock')) + ' (' + esc(fmt(p.s)) + ')</div>' : '') + '</div>';
  }

  function renderCart() {
    if (!S.cart.length) sEl.lines.innerHTML = '<p class="hint" style="padding:10px 0">' + esc(t('cartEmpty')) + '</p>';
    else sEl.lines.innerHTML = S.cart.map(lineHtml).join('');
    updateTotals();
  }

  function updateTotals() {
    var total = cartTotal(), missing = cartMissing(), empty = !S.cart.length;
    sEl.total.textContent = money(total);
    var r = parseNum(sEl.rcv.value);
    if (r.v != null && !r.err && !empty) {
      sEl.chgRow.hidden = false;
      var d = r.v - total;
      if (d >= 0) { sEl.chg.className = ''; sEl.chg.textContent = money(d); }
      else { sEl.chg.className = 'short'; sEl.chg.textContent = t('short') + ' ' + money(-d); }
    } else sEl.chgRow.hidden = true;
    sEl.msg.hidden = !missing; sEl.msg.textContent = missing ? t('needPrice') : '';
    sEl.sell.disabled = empty || missing;
    Array.prototype.forEach.call(sEl.lines.querySelectorAll('.cl'), function (row) {
      var l = S.cart[+row.dataset.i]; if (!l) return;
      row.querySelector('.cl-t').textContent = l.p == null ? '' : money(lineTotal(l));
      row.querySelector('.cl-p').classList.toggle('need', l.p == null);
    });
    var narrow = !(window.matchMedia && window.matchMedia('(min-width: 961px)').matches);
    var show = S.tab === 'sales' && narrow;
    sEl.bar.hidden = !show; document.body.classList.toggle('has-bar', show);
    sEl.barSum.textContent = cartCount() + ' ' + t('lines') + ' · ' + money(total);
    $('cb-cnt').textContent = cartCount() + ' ' + t('lines'); $('cb-amt').textContent = money(total); $('cb-sell').disabled = sEl.sell.disabled; $('cb-go').disabled = empty;
    if (empty) closeCartSheet();
  }

  function renderLast() {
    if (!S.last) { sEl.last.hidden = true; return; }
    var s = null; S.sales.forEach(function (x) { if (x.id === S.last) s = x; });
    if (!s) { sEl.last.hidden = true; return; }
    sEl.last.hidden = false;
    sEl.last.innerHTML = '<span>✓ ' + esc(t('sold')) + ' · ' + esc(s.no) + ' · <b>' + esc(money(s.total)) + '</b></span>' +
      '<button type="button" class="btn" data-act="vch" data-id="' + esc(s.id) + '">' + esc(t('viewVoucher')) + '</button>';
  }

  function todaySales() { var d = ymd(Date.now()); return S.sales.filter(function (s) { return ymd(s.ts) === d; }).sort(function (a, b) { return b.ts - a.ts; }); }

  function renderHist() {
    var list = todaySales(), sum = 0, n = 0;
    list.forEach(function (s) { if (!s.void) { sum += saleNetTotal(s); n++; } });
    sEl.histSum.textContent = n + ' ' + t('times') + ' · ' + money(sum);
    if (!list.length) { sEl.hist.innerHTML = '<p class="hint" style="padding:14px">' + esc(t('noSalesToday')) + '</p>'; return; }
    sEl.hist.innerHTML = list.map(function (s) {
      var items = s.lines.map(function (l) { return l.n + (l.q !== 1 ? ' ×' + fmt(l.q) : ''); }).join(', ');
      var refTot = saleRefundTotal(s);
      var totalHtml = (refTot > 0 && !s.void)
        ? '<s class="h-orig">' + esc(money(s.total)) + '</s> ' + esc(money(saleNetTotal(s)))
        : esc(money(s.total));
      return '<div class="hrow" data-id="' + esc(s.id) + '"' + (s.void ? ' style="opacity:.5;text-decoration:line-through"' : '') + '>' +
        '<span class="h-no">' + esc(hm(s.ts)) + ' · ' + esc(s.no) + (refTot > 0 && !s.void ? ' · <b class="h-rf">' + esc(t('partRefunded')) + '</b>' : '') + '</span><span class="h-it">' + esc(items) + '</span>' +
        '<span class="h-t">' + totalHtml + '</span>' +
        '<button type="button" class="btn" data-act="vch">' + esc(t('view')) + '</button>' +
        (s.void ? '<span></span>' : '<button type="button" class="btn" data-act="void">' + esc(t('void')) + '</button>') + '</div>';
    }).join('');
  }

  function renderSales() { renderSCats(); renderPicker(); renderCart(); renderLast(); renderHist(); }

  function focusLine(i, f) {
    var row = sEl.lines.querySelector('.cl[data-i="' + i + '"]'); var el = row && row.querySelector('[data-f="' + f + '"]');
    if (el) { el.focus(); if (el.select) el.select(); }
  }
  function addToCart(p) {
    var idx = -1;
    S.cart.forEach(function (l, i) { if (l.pid === p.id) idx = i; });
    if (idx >= 0) S.cart[idx].q = Math.round((S.cart[idx].q + 1) * 100) / 100;
    else { S.cart.push({ pid: p.id, n: p.n, p: p.p, q: 1 }); idx = S.cart.length - 1; }
    renderCart();
    if (S.cart[idx].p == null) focusLine(idx, 'p');
    return idx;
  }

  function completeSale() {
    if (!S.cart.length || cartMissing()) return;
    var now = Date.now(), day = ymd(now), maxN = 0;
    S.sales.forEach(function (s) { if (s.no.indexOf(day + '-') === 0) maxN = Math.max(maxN, parseInt(s.no.slice(9), 10) || 0); });
    var r = parseNum(sEl.rcv.value);
    var lines = S.cart.map(function (l) {
      var o = { pid: l.pid, n: l.n.trim() || t('otherLine'), p: l.p, q: l.q };
      var p = l.pid ? byId(l.pid) : null;
      if (p && p.t && !p.v && p.s != null) { p.s = Math.round((p.s - l.q) * 100) / 100; o.dec = true; }
      return o;
    });
    var sale = { id: 'x' + now, no: day + '-' + String(maxN + 1).padStart(3, '0'), ts: now, lines: lines, total: cartTotal(), rcv: (r.v != null && !r.err) ? r.v : null, void: false, refunds: [] };
    S.sales.push(sale); S.cart = []; S.last = sale.id; sEl.rcv.value = '';
    save(); renderSales();
    toast(t('sold') + ' ' + sale.no);
    if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) { S.sq = ''; sEl.sq.value = ''; sEl.sq.focus(); }
  }

  function voidSale(id) {
    var s = null; S.sales.forEach(function (x) { if (x.id === id) s = x; });
    if (!s || s.void) return;
    s.lines.forEach(function (l) {
      var p = l.pid ? byId(l.pid) : null;
      if (l.dec && p && p.s != null) p.s = Math.round((p.s + l.q) * 100) / 100;
    });
    s.void = true; save(); render(); toast(t('voidDone'));
  }

  function voucherText(s) {
    var rows = s.lines.map(function (l) { return l.n + '  ' + fmt(l.q) + ' × ' + fmt(l.p) + ' = ' + fmt(Math.round(l.q * l.p * 100) / 100); });
    var out = [t('voucher') + ' ' + s.no, dmy(s.ts) + ' ' + hm(s.ts), ''].concat(rows, ['', t('total') + ': ' + money(s.total)]);
    if (s.rcv != null) out.push(t('received') + ' ' + fmt(s.rcv), t('change') + ': ' + money(Math.max(0, s.rcv - s.total)));
    var refTot = saleRefundTotal(s);
    if (refTot > 0) {
      out.push('', t('refundHistory') + ':');
      (s.refunds || []).forEach(function (r) {
        var l = s.lines[r.li];
        out.push('  ' + hm(r.ts) + ' · ' + (l ? l.n : '') + ' ×' + fmt(r.q) + ' = -' + fmt(r.amt) + (r.note ? ' (' + r.note + ')' : ''));
      });
      out.push(t('refundTotal') + ': -' + money(refTot), t('netTotal') + ': ' + money(saleNetTotal(s)));
    }
    if (s.void) out.unshift('*** ' + t('void') + ' ***');
    return out.join('\n');
  }
  var vchSale = null, vchPur = null, vchRefundLi = -1, vchSel = [];
  function findSale(id) { var s = null; S.sales.forEach(function (x) { if (x.id === id) s = x; }); return s; }
  function retotal(s) { s.total = Math.round(s.lines.reduce(function (a, l) { return a + lineTotal(l); }, 0) * 100) / 100; }
  function removeSaleLines(id, idxs) {
    var s = findSale(id); if (!s || s.void || !idxs.length) return;
    var keep = [], map = {};
    s.lines.forEach(function (l, i) {
      if (idxs.indexOf(i) >= 0 && lineRefundedQty(s, i) === 0) {
        var p = l.pid ? byId(l.pid) : null;
        if (l.dec && p && p.s != null) p.s = Math.round((p.s + l.q) * 100) / 100;
        return;
      }
      map[i] = keep.length; keep.push(l);
    });
    (s.refunds || []).forEach(function (r) { r.li = map[r.li]; });
    s.lines = keep; retotal(s);
    if (!keep.length) s.void = true;
    vchSel = []; save(); render();
    if (s.void) closeVoucher(); else openVoucher(id);
    toast(t('lineDone'));
  }
  function adjustSaleQty(id, i, d) {
    var s = findSale(id); if (!s || s.void) return;
    var l = s.lines[i]; if (!l || lineRefundedQty(s, i) > 0) return;
    var nq = Math.round((l.q + d) * 100) / 100; if (nq <= 0) return;
    var p = l.pid ? byId(l.pid) : null;
    if (l.dec && p && p.s != null) p.s = Math.round((p.s - d) * 100) / 100;
    l.q = nq; retotal(s); save(); render(); openVoucher(id);
  }
  function applyRefund(id, li, qty, note) {
    var s = null; S.sales.forEach(function (x) { if (x.id === id) s = x; });
    if (!s) return false; var l = s.lines[li]; if (!l) return false;
    var remain = Math.round((l.q - lineRefundedQty(s, li)) * 100) / 100;
    if (qty == null || qty <= 0 || qty > remain + 0.0001) return false;
    if (l.dec) { var p = l.pid ? byId(l.pid) : null; if (p && p.s != null) p.s = Math.round((p.s + qty) * 100) / 100; }
    if (!Array.isArray(s.refunds)) s.refunds = [];
    s.refunds.push({ id: 'r' + Date.now() + Math.random().toString(36).slice(2, 6), li: li, ts: Date.now(), q: qty, p: l.p, amt: Math.round(qty * l.p * 100) / 100, note: (note || '').trim() });
    save(); render(); vchRefundLi = -1; openVoucher(id); toast(t('refundDone'));
    return true;
  }
  function openVoucher(id) {
    var s = null; S.sales.forEach(function (x) { if (x.id === id) s = x; });
    if (!s) return;
    if (!vchSale || vchSale.id !== id) vchSel = [];
    vchSale = s; vchPur = null;
    var editable = !s.void;
    var h = '<div class="rc-shop">' + esc(t('title')) + '</div><h2 id="vch-title">' + esc(t('voucher')) + ' ' + esc(s.no) + (s.void ? ' · ' + esc(t('void')) : '') + '</h2>' +
      '<div class="v-meta"><span>' + esc(dmy(s.ts)) + ' ' + esc(hm(s.ts)) + '</span></div><div class="v-lines">';
    s.lines.forEach(function (l, i) {
      var refunded = editable ? lineRefundedQty(s, i) : 0;
      var remain = Math.round((l.q - refunded) * 100) / 100;
      var canEdit = editable && refunded <= 0;
      h += '<div class="v-l rc' + (remain <= 0 && editable ? ' refunded' : '') + '" data-li="' + i + '">' +
        '<div class="rc-r1">' + (canEdit ? '<input type="checkbox" class="v-ck" aria-label="select"' + (vchSel.indexOf(i) >= 0 ? ' checked' : '') + '>' : '') +
        '<span class="v-n">' + esc(l.n) + (refunded > 0 ? '<small class="v-rf-tag">' + esc(t('refunded')) + ' ' + esc(fmt(refunded)) + '</small>' : '') + '</span>' +
        '<b>' + esc(money(lineTotal(l))) + '</b></div>' +
        '<div class="rc-r2"><span class="v-q">' + (canEdit ? '<button type="button" class="btn v-st" data-act="ldec" aria-label="-"' + (l.q <= 1 ? ' disabled' : '') + '>−</button> ' : '') + esc(fmt(l.q)) + (canEdit ? ' <button type="button" class="btn v-st" data-act="linc" aria-label="+">+</button>' : '') + ' × ' + esc(fmt(l.p)) + '</span>';
      if (editable && remain > 0) {
        if (vchRefundLi === i) {
          h += '</div></div><div class="v-rf-form" data-li="' + i + '">' +
            '<label>' + esc(t('refundQtyLabel')) + '<input class="vi" id="rf-qty" inputmode="decimal" value="' + esc(fmt(remain)) + '"></label>' +
            '<input id="rf-note" class="rf-note" placeholder="' + esc(t('refundNotePh')) + '">' +
            '<div class="rf-btns"><button type="button" class="btn" data-act="rf-cancel">' + esc(t('cancel')) + '</button>' +
            '<button type="button" class="btn primary" data-act="rf-confirm">' + esc(t('confirm')) + '</button></div></div>';
        } else {
          h += '<button type="button" class="btn v-rf-btn" data-act="refund">' + esc(t('refund')) + '</button></div></div>';
        }
      } else { h += '</div></div>'; }
    });
    h += '</div><div class="v-tot"><span>' + esc(t('total')) + '</span><span>' + esc(money(s.total)) + '</span></div>';
    if (s.rcv != null) h += '<div class="v-sub"><span>' + esc(t('received')) + '</span><span>' + esc(fmt(s.rcv)) + '</span></div><div class="v-sub"><span>' + esc(t('change')) + '</span><span>' + esc(money(Math.max(0, s.rcv - s.total))) + '</span></div>';
    var refTot = saleRefundTotal(s);
    if (refTot > 0) {
      h += '<div class="v-refunds"><b>' + esc(t('refundHistory')) + '</b>';
      s.refunds.forEach(function (r) {
        var rl = s.lines[r.li];
        h += '<div class="v-rf-row"><span>' + esc(hm(r.ts)) + ' · ' + esc(rl ? rl.n : '') + ' ×' + esc(fmt(r.q)) + (r.note ? ' · ' + esc(r.note) : '') + '</span><b>-' + esc(money(r.amt)) + '</b></div>';
      });
      h += '</div><div class="v-sub"><span>' + esc(t('refundTotal')) + '</span><span>-' + esc(money(refTot)) + '</span></div>' +
        '<div class="v-tot"><span>' + esc(t('netTotal')) + '</span><span>' + esc(money(saleNetTotal(s))) + '</span></div>';
    }
    if (editable) h += '<div class="v-void-row"><button type="button" class="btn danger" id="vch-delsel">' + esc(t('delSel')) + '</button><button type="button" class="btn danger" id="vch-void" data-id="' + esc(s.id) + '">' + esc(t('void')) + '</button></div>';
    h += '<p class="hint">' + esc(t('voucherNote')) + '</p>';
    sEl.vchBody.innerHTML = h; sEl.vch.hidden = false;
    $('vch-close').focus();
    var qtyEl = $('rf-qty'); if (qtyEl) { qtyEl.focus(); qtyEl.select(); }
  }
  sEl.vchBody.addEventListener('click', function (e) {
    if (!vchSale) return;
    var rb = e.target.closest('[data-act="refund"]');
    if (rb) { vchRefundLi = +rb.closest('.v-l').dataset.li; openVoucher(vchSale.id); return; }
    var rc = e.target.closest('[data-act="rf-cancel"]');
    if (rc) { vchRefundLi = -1; openVoucher(vchSale.id); return; }
    var rk = e.target.closest('[data-act="rf-confirm"]');
    if (rk) {
      var li = +rk.closest('.v-rf-form').dataset.li;
      var r = parseNum(($('rf-qty') || {}).value || '');
      var note = ($('rf-note') || {}).value || '';
      if (r.err || r.v == null || r.v <= 0) return;
      applyRefund(vchSale.id, li, r.v, note);
      return;
    }
    var st = e.target.closest('[data-act="ldec"],[data-act="linc"]');
    if (st) { adjustSaleQty(vchSale.id, +st.closest('.v-l').dataset.li, st.dataset.act === 'linc' ? 1 : -1); return; }
    var ds = e.target.closest('#vch-delsel');
    if (ds) {
      if (!vchSel.length) { toast(t('selNone')); return; }
      if (ds.dataset.armed === '1') removeSaleLines(vchSale.id, vchSel.slice());
      else { ds.dataset.armed = '1'; ds.textContent = t('sure'); setTimeout(function () { if (ds.isConnected) { ds.dataset.armed = ''; ds.textContent = t('delSel'); } }, 3000); }
      return;
    }
    var vb = e.target.closest('#vch-void');
    if (vb) {
      if (vb.dataset.armed === '1') { voidSale(vchSale.id); closeVoucher(); }
      else { vb.dataset.armed = '1'; vb.textContent = t('sure'); setTimeout(function () { if (vb.isConnected) { vb.dataset.armed = ''; vb.textContent = t('void'); } }, 3000); }
    }
  });
  sEl.vchBody.addEventListener('change', function (e) {
    var c = e.target.closest('.v-ck'); if (!c || !vchSale) return;
    var i = +c.closest('.v-l').dataset.li, k = vchSel.indexOf(i);
    if (c.checked && k < 0) vchSel.push(i); else if (!c.checked && k >= 0) vchSel.splice(k, 1);
  });
  sEl.vchBody.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && (e.target.id === 'rf-qty' || e.target.id === 'rf-note')) { e.preventDefault(); var b = sEl.vchBody.querySelector('[data-act="rf-confirm"]'); if (b) b.click(); }
  });
  function closeVoucher() { sEl.vch.hidden = true; vchSale = null; vchPur = null; vchRefundLi = -1; vchSel = []; }
  $('vch-close').addEventListener('click', closeVoucher);
  sEl.vch.addEventListener('click', function (e) { if (e.target === sEl.vch) closeVoucher(); });
  $('vch-copy').addEventListener('click', function () {
    if (!vchSale && !vchPur) return;
    var txt = vchPur ? purchaseText(vchPur) : voucherText(vchSale);
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(function () { toast(t('copiedTxt')); }, function () { toast(t('exportFail')); });
    else toast(t('exportFail'));
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !sEl.vch.hidden) closeVoucher(); });

  /* events */
  sEl.sq.addEventListener('input', function () { S.sq = sEl.sq.value; S.slimit = 60; renderPicker(); });
  sEl.sq.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    var rows = pickerRows();
    if (!S.sq.trim() || !rows.length) return;
    addToCart(rows[0]);
    S.sq = ''; sEl.sq.value = ''; S.slimit = 60; renderPicker();
    if (rows[0].p != null) sEl.sq.focus();
  });
  sEl.scats.addEventListener('click', function (e) {
    var b = e.target.closest('[data-scat]'); if (!b) return;
    S.scat = b.dataset.scat; S.slimit = 60; S.scatOpen = false; renderSCats(); renderPicker();
  });
  $('scat-toggle').addEventListener('click', function () { S.scatOpen = !S.scatOpen; renderSCats(); });
  var scatQuick = $('scat-quick');
  if (scatQuick) scatQuick.addEventListener('change', function () {
    S.scat = scatQuick.value; S.slimit = 60; S.scatOpen = false; renderSCats(); renderPicker();
  });
  sEl.pick.addEventListener('click', function (e) {
    if (e.target.closest('#pick-more')) { S.slimit += 60; renderPicker(); return; }
    var b = e.target.closest('.pick'); if (!b) return;
    var p = byId(b.dataset.id); if (p) addToCart(p);
  });
  sEl.lines.addEventListener('click', function (e) {
    var b = e.target.closest('[data-act]'); if (!b) return;
    var row = b.closest('.cl'); var i = +row.dataset.i, l = S.cart[i]; if (!l) return;
    if (b.dataset.act === 'rm') S.cart.splice(i, 1);
    else if (b.dataset.act === 'inc') l.q = Math.round((l.q + 1) * 100) / 100;
    else if (b.dataset.act === 'dec') { if (l.q > 1) l.q = Math.round((l.q - 1) * 100) / 100; else S.cart.splice(i, 1); }
    renderCart();
  });
  sEl.lines.addEventListener('input', function (e) {
    var el = e.target, f = el.dataset.f; if (!f) return;
    var l = S.cart[+el.closest('.cl').dataset.i]; if (!l) return;
    if (f === 'n') { l.n = el.value; return; }
    var r = parseNum(el.value);
    if (r.err) return;
    if (f === 'q') { if (r.v != null && r.v > 0) l.q = r.v; }
    else l.p = r.v;
    updateTotals();
  });
  sEl.lines.addEventListener('change', function (e) {
    var el = e.target, f = el.dataset.f, l = S.cart[+el.closest('.cl').dataset.i]; if (!l) return;
    if (f === 'q') { var r = parseNum(el.value); if (r.err || r.v == null || r.v <= 0) el.value = fmt(l.q); else { l.q = r.v; el.value = fmt(l.q); } updateTotals(); }
    else if (f === 'p') { var r2 = parseNum(el.value); if (r2.err) el.value = fmt(l.p); else { l.p = r2.v; el.value = fmt(l.p); } updateTotals(); }
  });
  sEl.lines.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && e.target.matches('input')) { e.preventDefault(); e.target.blur(); sEl.sq.focus(); }
  });
  sEl.rcv.addEventListener('input', updateTotals);
  sEl.rcv.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); completeSale(); } });
  sEl.sell.addEventListener('click', completeSale);
  sEl.last.addEventListener('click', function (e) { var b = e.target.closest('[data-act="vch"]'); if (b) openVoucher(b.dataset.id); });
  sEl.hist.addEventListener('click', function (e) {
    var b = e.target.closest('[data-act]'); if (!b) return;
    var id = b.closest('.hrow').dataset.id;
    if (b.dataset.act === 'vch') openVoucher(id);
    else if (b.dataset.act === 'void') {
      if (b.dataset.armed === '1') voidSale(id);
      else { b.dataset.armed = '1'; b.textContent = t('sure'); setTimeout(function () { if (b.isConnected) { b.dataset.armed = ''; b.textContent = t('void'); } }, 3000); }
    }
  });
  $('cb-go').addEventListener('click', openCartSheet);
  $('cb-sell').addEventListener('click', function () { completeSale(); closeCartSheet(); });
  function setHH() { var h = document.querySelector('.top'); if (h) document.documentElement.style.setProperty('--hh', h.offsetHeight + 'px'); }
  setHH(); window.addEventListener('resize', setHH);
  var cartCloseBtn = $('cart-close'); if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCartSheet);
  if (sEl.scrim) sEl.scrim.addEventListener('click', closeCartSheet);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && document.body.classList.contains('cart-open')) closeCartSheet(); });
  window.addEventListener('resize', function () { if (S.tab === 'sales') updateTotals(); });

  /* ---------- purchases ---------- */
  var pEl = { sup: $('p-sup'), date: $('p-date'), time: $('p-time'), ref: $('p-ref'), who: $('p-who'), q: $('pq'), res: $('pres'),
    lines: $('p-lines'), total: $('p-total'), msg: $('p-msg'), save: $('p-save'), last: $('p-last'), hist: $('p-hist'), histSum: $('p-histsum'), sl: $('p-suplist') };

  function pTotal() { var s = 0; S.pcart.forEach(function (l) { if (l.c != null) s += Math.round(l.q * l.c * 100) / 100; }); return Math.round(s * 100) / 100; }
  function pMissing() { return S.pcart.some(function (l) { return l.c == null; }); }
  function pLineTotal(l) { return l.c == null ? 0 : Math.round(l.q * l.c * 100) / 100; }
  function nowDate() { var d = new Date(); return d.getFullYear() + '-' + p2(d.getMonth() + 1) + '-' + p2(d.getDate()); }
  function nowTime() { var d = new Date(); return p2(d.getHours()) + ':' + p2(d.getMinutes()); }
  function initPForm() { if (!pEl.date.value) pEl.date.value = nowDate(); if (!pEl.time.value) pEl.time.value = nowTime(); }

  function matchP(qs) {
    var q = qs.trim().toLowerCase(); if (!q) return [];
    var toks = q.split(/\s+/);
    var rows = S.products.filter(function (p) {
      var hay = (p.n + ' ' + (p.d || '')).toLowerCase();
      return toks.every(function (k) { return hay.indexOf(k) >= 0; });
    });
    function rank(p) { if ((p.d || '').toLowerCase() === q) return 0; if (p.n.toLowerCase().indexOf(q) === 0) return 1; return 2; }
    rows.sort(function (a, b) { return rank(a) - rank(b) || a.n.localeCompare(b.n); });
    return rows;
  }

  function renderRes() {
    var qs = pEl.q.value.trim();
    if (!qs) { pEl.res.hidden = true; pEl.res.innerHTML = ''; return; }
    var rows = matchP(qs).slice(0, 8), h = '';
    rows.forEach(function (p) {
      h += '<button type="button" data-id="' + esc(p.id) + '"><span class="pr-n">' + esc(p.n) + '</span><span class="pr-c">' + esc(p.d || catLabel(p.c)) + (p.k != null ? ' · ' + esc(money(p.k)) : '') + '</span></button>';
    });
    h += '<button type="button" data-new="1"><span class="pr-new">' + esc(t('pNewItem')) + ': ' + esc(qs) + '</span></button>';
    pEl.res.innerHTML = h; pEl.res.hidden = false;
  }

  function pLineHtml(l, i) {
    var p = l.pid ? byId(l.pid) : null;
    var top = l.pid
      ? '<span class="cl-name">' + esc(l.n) + (l.d ? '<br><span class="cl-code">' + esc(l.d) + '</span>' : '') + '</span>'
      : '<span class="tag-new">' + esc(t('newTag')) + '</span><input class="cl-name-in" data-f="n" value="' + esc(l.n) + '" placeholder="' + esc(t('newItemName')) + '" aria-label="' + esc(t('newItemName')) + '">' +
        '<input class="cl-d" data-f="d" value="' + esc(l.d) + '" placeholder="' + esc(t('codeLbl')) + '" aria-label="' + esc(t('codeLbl')) + '">';
    var note = (p && !p.t) ? '<div class="hint">' + esc(t('untrackedPill')) + '</div>' : '';
    return '<div class="cl" data-i="' + i + '"><div class="cl-top">' + top + '<button type="button" class="btn x" data-act="rm" aria-label="' + esc(t('del')) + '">✕</button></div>' +
      '<div class="cl-bot"><input class="num" style="width:70px" data-f="q" inputmode="decimal" value="' + esc(fmt(l.q)) + '" aria-label="' + esc(t('qty')) + '">' +
      '<span>×</span><input class="num cl-p' + (l.c == null ? ' need' : '') + '" data-f="c" inputmode="decimal" value="' + esc(fmt(l.c)) + '" placeholder="' + esc(t('unitCost')) + '" aria-label="' + esc(t('unitCost')) + '">' +
      '<span class="cl-t">' + (l.c == null ? '' : esc(money(pLineTotal(l)))) + '</span></div>' + note + '</div>';
  }

  function renderPCart() {
    if (!S.pcart.length) pEl.lines.innerHTML = '<p class="hint" style="padding:10px 0">' + esc(t('pEmpty')) + '</p>';
    else pEl.lines.innerHTML = S.pcart.map(pLineHtml).join('');
    updatePTotals();
  }
  function updatePTotals() {
    var miss = pMissing(), empty = !S.pcart.length;
    pEl.total.textContent = money(pTotal());
    pEl.msg.hidden = !miss; pEl.msg.textContent = miss ? t('pNeed') : '';
    pEl.save.disabled = empty || miss;
    Array.prototype.forEach.call(pEl.lines.querySelectorAll('.cl'), function (row) {
      var l = S.pcart[+row.dataset.i]; if (!l) return;
      row.querySelector('.cl-t').textContent = l.c == null ? '' : money(pLineTotal(l));
      row.querySelector('.cl-p').classList.toggle('need', l.c == null);
    });
  }

  function purchasesSorted() { return S.purchases.slice().sort(function (a, b) { return b.ts - a.ts; }); }
  function renderPHist() {
    var list = purchasesSorted(), sum = 0;
    list.forEach(function (b) { if (!b.void) sum += b.total; });
    pEl.histSum.textContent = money(sum);
    var sups = {}; S.purchases.forEach(function (b) { if (b.sup) sups[b.sup] = 1; });
    pEl.sl.innerHTML = Object.keys(sups).map(function (x) { return '<option value="' + esc(x) + '">'; }).join('');
    if (!list.length) { pEl.hist.innerHTML = '<p class="hint" style="padding:14px">' + esc(t('noPurch')) + '</p>'; return; }
    pEl.hist.innerHTML = list.slice(0, 30).map(function (b) {
      return '<div class="hrow" data-id="' + esc(b.id) + '"' + (b.void ? ' style="opacity:.5;text-decoration:line-through"' : '') + '>' +
        '<span class="h-no">' + esc(dmy(b.ts)) + ' · ' + esc(b.no) + '</span><span class="h-it">' + esc(b.sup || '—') + ' · ' + b.lines.length + ' ' + esc(t('lines')) + '</span>' +
        '<span class="h-t">' + esc(money(b.total)) + '</span><button type="button" class="btn" data-act="vch">' + esc(t('view')) + '</button>' +
        (b.void ? '<span></span>' : '<button type="button" class="btn" data-act="void">' + esc(t('void')) + '</button>') + '</div>';
    }).join('');
  }
  function renderPLast() {
    var b = null; S.purchases.forEach(function (x) { if (x.id === S.plast) b = x; });
    if (!b) { pEl.last.hidden = true; return; }
    pEl.last.hidden = false;
    pEl.last.innerHTML = '<span>✓ ' + esc(t('pSaved')) + ' · ' + esc(b.no) + ' · <b>' + esc(money(b.total)) + '</b></span>' +
      '<button type="button" class="btn" data-act="vch" data-id="' + esc(b.id) + '">' + esc(t('viewVoucher')) + '</button>';
  }
  function renderPurchase() { initPForm(); renderRes(); renderPCart(); renderPLast(); renderPHist(); }

  function pFocus(i, f) {
    var row = pEl.lines.querySelector('.cl[data-i="' + i + '"]'); var el = row && row.querySelector('[data-f="' + f + '"]');
    if (el) { el.focus(); if (el.select) el.select(); }
  }
  function addPLine(p, name) {
    var idx = -1;
    if (p) S.pcart.forEach(function (l, i) { if (l.pid === p.id) idx = i; });
    if (idx >= 0) S.pcart[idx].q = Math.round((S.pcart[idx].q + 1) * 100) / 100;
    else {
      S.pcart.push(p ? { pid: p.id, n: p.n, d: p.d || '', q: 1, c: (p.k != null && p.k > 0) ? p.k : null }
                     : { pid: null, n: name || '', d: '', q: 1, c: null });
      idx = S.pcart.length - 1;
    }
    pEl.q.value = ''; renderRes(); renderPCart();
    pFocus(idx, p ? 'q' : 'n');
  }

  function completePurchase() {
    if (!S.pcart.length || pMissing()) return;
    var dv = pEl.date.value || nowDate(), tv = pEl.time.value || nowTime();
    var dp = dv.split('-'), tp = tv.split(':');
    var ts = new Date(+dp[0], +dp[1] - 1, +dp[2], +tp[0] || 0, +tp[1] || 0).getTime();
    if (!isFinite(ts)) ts = Date.now();
    var day = ymd(ts), maxN = 0, now = Date.now();
    S.purchases.forEach(function (b) { if (b.no.indexOf('PUR-' + day + '-') === 0) maxN = Math.max(maxN, parseInt(b.no.split('-')[2], 10) || 0); });
    var lines = S.pcart.map(function (l, i) {
      var o = { pid: l.pid, n: (l.n || '').trim() || t('newItemName'), d: (l.d || '').trim(), q: l.q, c: l.c };
      var p = l.pid ? byId(l.pid) : null;
      if (p) {
        o.ok = p.k; if (l.c > 0) p.k = l.c;
        if (p.t && !p.v && p.s != null) { p.s = Math.round((p.s + l.q) * 100) / 100; o.add = true; }
      } else {
        ensureUncat();
        var np = { id: 'n' + now + '_' + i, n: o.n, c: UNCAT, p: null, k: l.c > 0 ? l.c : null, s: l.q, t: true, v: false, d: o.d, ts: now + i };
        S.products.push(np); o.pid = np.id; o.newp = true; o.add = true;
      }
      return o;
    });
    var rec = { id: 'b' + now, no: 'PUR-' + day + '-' + String(maxN + 1).padStart(3, '0'), ts: ts, sup: pEl.sup.value.trim(), ref: pEl.ref.value.trim(),
      who: pEl.who.value.trim(), lines: lines, total: pTotal(), void: false };
    S.purchases.push(rec); S.pcart = []; S.plast = rec.id;
    pEl.ref.value = ''; pEl.date.value = nowDate(); pEl.time.value = nowTime();
    save(); populateQaCats(); renderPurchase(); toast(t('pSaved') + ' ' + rec.no);
    if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) pEl.q.focus();
  }

  function voidPurchase(id) {
    var b = null; S.purchases.forEach(function (x) { if (x.id === id) b = x; });
    if (!b || b.void) return;
    b.lines.forEach(function (l) {
      var p = l.pid ? byId(l.pid) : null; if (!p) return;
      if (l.add && p.s != null) p.s = Math.round((p.s - l.q) * 100) / 100;
      if ('ok' in l && p.k === l.c) p.k = l.ok;
    });
    b.void = true; save(); render(); toast(t('pVoidDone'));
  }

  function purchaseText(b) {
    var rows = b.lines.map(function (l) { return (l.d ? l.d + '  ' : '') + l.n + '  ' + fmt(l.q) + ' × ' + fmt(l.c) + ' = ' + fmt(Math.round(l.q * l.c * 100) / 100); });
    var out = [t('pVoucher') + ' ' + b.no, dmy(b.ts) + ' ' + hm(b.ts)];
    if (b.sup) out.push(t('supplier') + ': ' + b.sup);
    if (b.ref) out.push(t('pRef') + ': ' + b.ref);
    if (b.who) out.push(t('pWho') + ': ' + b.who);
    out = out.concat([''], rows, ['', t('total') + ': ' + money(b.total)]);
    if (b.void) out.unshift('*** ' + t('void') + ' ***');
    return out.join('\n');
  }
  function openPVoucher(id) {
    var b = null; S.purchases.forEach(function (x) { if (x.id === id) b = x; });
    if (!b) return;
    vchPur = b; vchSale = null;
    var h = '<h2 id="vch-title">' + esc(t('pVoucher')) + ' ' + esc(b.no) + (b.void ? ' · ' + esc(t('void')) : '') + '</h2>' +
      '<div class="v-meta"><span>' + esc(dmy(b.ts)) + ' ' + esc(hm(b.ts)) + '</span></div>';
    [['supplier', b.sup], ['pRef', b.ref], ['pWho', b.who]].forEach(function (x) {
      if (x[1]) h += '<div class="v-sub"><span>' + esc(t(x[0])) + '</span><span>' + esc(x[1]) + '</span></div>';
    });
    h += '<div class="v-lines">';
    b.lines.forEach(function (l) {
      h += '<div class="v-l"><span class="v-n">' + esc(l.n) + (l.d ? '<br><span class="cl-code">' + esc(l.d) + '</span>' : '') + '</span><span class="v-q">' + esc(fmt(l.q)) + ' × ' + esc(fmt(l.c)) + '</span><b>' + esc(money(Math.round(l.q * l.c * 100) / 100)) + '</b></div>';
    });
    h += '</div><div class="v-tot"><span>' + esc(t('total')) + '</span><span>' + esc(money(b.total)) + '</span></div><p class="hint">' + esc(t('voucherNote')) + '</p>';
    sEl.vchBody.innerHTML = h; sEl.vch.hidden = false; $('vch-close').focus();
  }

  pEl.q.addEventListener('input', renderRes);
  pEl.q.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { pEl.q.value = ''; renderRes(); return; }
    if (e.key !== 'Enter') return;
    e.preventDefault();
    var qs = pEl.q.value.trim(); if (!qs) return;
    var rows = matchP(qs);
    if (rows.length) addPLine(rows[0]); else addPLine(null, qs);
  });
  pEl.res.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    if (b.dataset.new) addPLine(null, pEl.q.value.trim());
    else { var p = byId(b.dataset.id); if (p) addPLine(p); }
  });
  pEl.lines.addEventListener('click', function (e) {
    var b = e.target.closest('[data-act="rm"]'); if (!b) return;
    S.pcart.splice(+b.closest('.cl').dataset.i, 1); renderPCart();
  });
  pEl.lines.addEventListener('input', function (e) {
    var el = e.target, f = el.dataset.f; if (!f) return;
    var l = S.pcart[+el.closest('.cl').dataset.i]; if (!l) return;
    if (f === 'n' || f === 'd') { l[f] = el.value; return; }
    var r = parseNum(el.value); if (r.err) return;
    if (f === 'q') { if (r.v != null && r.v > 0) l.q = r.v; } else l.c = r.v;
    updatePTotals();
  });
  pEl.lines.addEventListener('change', function (e) {
    var el = e.target, f = el.dataset.f, l = S.pcart[+el.closest('.cl').dataset.i]; if (!l) return;
    if (f === 'q') { var r = parseNum(el.value); if (r.err || r.v == null || r.v <= 0) { el.value = fmt(l.q); } else { l.q = r.v; el.value = fmt(l.q); } updatePTotals(); }
    else if (f === 'c') { var r2 = parseNum(el.value); if (r2.err) { el.value = fmt(l.c); } else { l.c = r2.v; el.value = fmt(l.c); } updatePTotals(); }
  });
  pEl.lines.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' || !e.target.matches('input')) return;
    e.preventDefault();
    var ins = Array.prototype.slice.call(e.target.closest('.cl').querySelectorAll('input'));
    var nxt = ins[ins.indexOf(e.target) + 1];
    if (nxt) { nxt.focus(); nxt.select(); } else { e.target.blur(); pEl.q.focus(); }
  });
  pEl.save.addEventListener('click', completePurchase);
  pEl.last.addEventListener('click', function (e) { var b = e.target.closest('[data-act="vch"]'); if (b) openPVoucher(b.dataset.id); });
  pEl.hist.addEventListener('click', function (e) {
    var b = e.target.closest('[data-act]'); if (!b) return;
    var id = b.closest('.hrow').dataset.id;
    if (b.dataset.act === 'vch') openPVoucher(id);
    else if (b.dataset.act === 'void') {
      if (b.dataset.armed === '1') voidPurchase(id);
      else { b.dataset.armed = '1'; b.textContent = t('sure'); setTimeout(function () { if (b.isConnected) { b.dataset.armed = ''; b.textContent = t('void'); } }, 3000); }
    }
  });

  /* ---------- receipts (all sales + all purchases, one screen) ---------- */
  function renderReceipts() {
    var listEl = $('r-list'), sumEl = $('r-sum'), titleEl = $('r-title');
    if (!listEl) return;
    Array.prototype.forEach.call(document.querySelectorAll('[data-rsub]'), function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.rsub === S.rsub));
    });
    titleEl.textContent = t(S.rsub === 'sales' ? 'rSales' : 'rPurchase');

    var q = S.rq.trim().toLowerCase(), rows, sum = 0;

    if (S.rsub === 'sales') {
      rows = S.sales.slice().sort(function (a, b) { return b.ts - a.ts; });
      if (q) rows = rows.filter(function (s) {
        var hay = (s.no + ' ' + s.lines.map(function (l) { return l.n; }).join(' ')).toLowerCase();
        return hay.indexOf(q) >= 0;
      });
      rows.forEach(function (s) { if (!s.void) sum += saleNetTotal(s); });
    } else {
      rows = S.purchases.slice().sort(function (a, b) { return b.ts - a.ts; });
      if (q) rows = rows.filter(function (b) {
        var hay = (b.no + ' ' + (b.sup || '') + ' ' + (b.ref || '') + ' ' + b.lines.map(function (l) { return l.n; }).join(' ')).toLowerCase();
        return hay.indexOf(q) >= 0;
      });
      rows.forEach(function (b) { if (!b.void) sum += b.total; });
    }

    sumEl.textContent = rows.length + ' ' + t('rCount') + ' · ' + money(sum);

    if (!rows.length) {
      listEl.innerHTML = '<p class="hint" style="padding:14px">' + esc(t(S.rsub === 'sales' ? 'rNoSales' : 'rNoPurch')) + '</p>';
      return;
    }

    var lastDay = '';
    var RC_ICON = '<svg class="rr-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>';
    listEl.innerHTML = rows.map(function (r) {
      var day = ymd(r.ts), head = '';
      if (day !== lastDay) {
        lastDay = day;
        head = '<div class="rr-day">' + esc(new Date(r.ts).toLocaleDateString(S.lang === 'th' ? 'th-TH' : 'en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })) + '</div>';
      }
      var amt, side, kind = S.rsub === 'sales' ? 'sale' : 'purchase';
      if (kind === 'sale') {
        amt = money(saleNetTotal(r));
        side = '<span>#' + esc(r.no) + '</span>' + (r.void ? '<em class="rr-rf">' + esc(t('void')) + '</em>' : (saleRefundTotal(r) > 0 ? '<em class="rr-rf">' + esc(t('refunded')) + '</em>' : ''));
      } else {
        amt = money(r.total);
        side = '<span>#' + esc(r.no) + '</span>' + (r.sup ? '<small>' + esc(r.sup) + '</small>' : '') + (r.void ? '<em class="rr-rf">' + esc(t('void')) + '</em>' : '');
      }
      return head + '<div class="rrow' + (r.void ? ' is-void' : '') + '" data-id="' + esc(r.id) + '" data-kind="' + kind + '" role="button" tabindex="0">' + RC_ICON +
        '<div class="rr-main"><b>' + esc(amt) + '</b><small>' + esc(hm(r.ts)) + '</small></div><div class="rr-side">' + side + '</div></div>';
    }).join('');
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-rsub]'), function (b) {
    b.addEventListener('click', function () { S.rsub = b.dataset.rsub; renderReceipts(); });
  });
  var rqEl = $('r-q');
  if (rqEl) rqEl.addEventListener('input', function () { S.rq = rqEl.value; renderReceipts(); });
  var rlistEl = $('r-list');
  function openRow(row) { if (!row) return; if (row.dataset.kind === 'sale') openVoucher(row.dataset.id); else openPVoucher(row.dataset.id); }
  if (rlistEl) {
    rlistEl.addEventListener('click', function (e) { openRow(e.target.closest('.rrow')); });
    rlistEl.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { var r = e.target.closest('.rrow'); if (r) { e.preventDefault(); openRow(r); } } });
  }

  /* ---------- boot ---------- */
  $('sync').addEventListener('click', async function () { if (ready) await syncNow(); refreshRemote(true); });
  (async function boot() {
    try { var l = localStorage.getItem(LANG_KEY); if (l === 'my' || l === 'th') S.lang = l; } catch (e) {}
    if (DB) {
      document.querySelector('.foot .sp').dataset.t = 'liveNote';
      $('modetag').dataset.t = 'live'; $('reset').hidden = true;
      setSync('busy');
      try { await loadRemote(); setSync('ok'); }
      catch (e) { console.error(e); setSync('err'); S.products = []; S.cats = []; toast(t('syncBoot')); }
      setInterval(refreshRemote, 30000);
      document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'visible') refreshRemote(); });
    } else load();
    ensureUncat();
    if (DB && ready) save();
    var h = location.hash.replace('#', ''); setTab(h === 'products' || h === 'purchase' || h === 'receipts' ? h : 'sales');
    applyLang();
    if (S.tab === 'products' && window.matchMedia && window.matchMedia('(pointer: fine)').matches) els.q.focus();
  })();
})();