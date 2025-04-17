// utils/uploadPDF.ts
import { supabase } from '@/app/lib/supabaseClient';

export async function uploadPDF(file: File, userId: string) {
  const { data, error } = await supabase.storage
    .from('files')
    .upload(`${userId}/${file.name}`, file);

  if (error) throw error;
  return data.path; // path to use in the Claude call
}
