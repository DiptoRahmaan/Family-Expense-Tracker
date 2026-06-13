// Load Supabase via CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://xhcrkmmowcjsjiqdqcmb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhoY3JrbW1vd2Nqc2ppcWRxY21iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2NzE2NjksImV4cCI6MjA5NjI0NzY2OX0.Pf71TqC4YZvvtcH17tH1CgWfDLPvKXodVP0FvPjXzIA';
export const supabase = createClient(supabaseUrl, supabaseKey);