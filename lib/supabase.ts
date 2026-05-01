import { createBrowserClient, createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const createClient = () => createBrowserClient(url, key);
export const createServerSupabase = async () => {
  const store = await cookies();
  return createServerClient(url, key, { cookies: {
    getAll() { return store.getAll(); },
    setAll(toSet) { toSet.forEach(({name,value,options})=>store.set(name, value, options)); }
  }});
};
