import { supabase } from '@/app/lib/supabaseClient';

export const getFileUrl = (filePath: string): string => {
  const { data } = supabase
    .storage
    .from('files')
    .getPublicUrl(filePath);

  return data.publicUrl;
};
