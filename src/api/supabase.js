import { createClient } from "@supabase/supabase-js";

const API_URL = 'https://wgzxoopqjbdxuqurpzvb.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indnenhvb3BxamJkeHVxdXJwenZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk4NzI2OTEsImV4cCI6MjAxNTQ0ODY5MX0.G2QsHrZuleVAwVZTcHgG_Gx6KRLznZKKWSy1suooO-Y';

const supabase = createClient(API_URL, API_KEY);

export default supabase;