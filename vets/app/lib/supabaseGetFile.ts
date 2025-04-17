import { supabase } from '@/app/lib/supabaseClient';

export const getImageUrl = (filePath: string): string => {
  const { data } = supabase
    .storage
    .from('files')
    .getPublicUrl(filePath);

  return data.publicUrl;
};
