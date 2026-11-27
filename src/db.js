// Supabase connection. If .env is missing, returns null and the app runs in browser-only demo mode.
import { createClient } from '@supabase/supabase-js';

export function makeDb() {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  const sb = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  return {
    async fetchTable(table, orderBy, ascending, opt = {}) {
      const rows = [];
      const step = 1000;
      for (let from = 0; ; from += step) {
        let q = sb.from(table).select('*').order(orderBy, { ascending });
        if (opt.gte) q = q.gte(opt.gte[0], opt.gte[1]);
        const max = opt.limit ? Math.min(step, opt.limit - rows.length) : step;
        const { data, error } = await q.range(from, from + max - 1);
        if (error) throw error;
        rows.push(...data);
        if (data.length < max || (opt.limit && rows.length >= opt.limit)) break;
      }
      return rows;
    },
    async upsert(table, rows, key) {
      const { error } = await sb.from(table).upsert(rows, { onConflict: key });
      if (error) throw error;
    },
    async remove(table, key, values) {
      const { error } = await sb.from(table).delete().in(key, values);
      if (error) throw error;
    },
  };
}
