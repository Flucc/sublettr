import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
	'https://kzqeeqcvryjxueiqowzx.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6cWVlcWN2cnlqeHVlaXFvd3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIzMTY4MjEsImV4cCI6MTk5Nzg5MjgyMX0._aGPfZzUhywRwNo31IFhXTye8hBTsu03IML5Nvmx8qo'
);
