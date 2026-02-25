import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://gxvcgubbqtccoycvdupq.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4dmNndWJicXRjY295Y3ZkdXBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0ODA2MzQsImV4cCI6MjA4MDA1NjYzNH0.7Hobx-emspJQ7HLyjaWR-XQhzk948LWufq3OCimKk4w';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);