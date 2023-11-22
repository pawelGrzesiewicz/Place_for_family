import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = 'https://wgzxoopqjbdxuqurpzvb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indnenhvb3BxamJkeHVxdXJwenZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk4NzI2OTEsImV4cCI6MjAxNTQ0ODY5MX0.G2QsHrZuleVAwVZTcHgG_Gx6KRLznZKKWSy1suooO-Y';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function updateLikedStatus(table, id, liked) {
    const { data, error } = await supabase
        .from(table)
        .update({ liked })
        .eq('id', id);

    if (error) {
        console.error('Error updating liked status:', error);
    }

    return data;
}

export default supabase;