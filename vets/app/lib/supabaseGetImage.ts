import { supabase } from '@/app/lib/supabaseClient';

export const getImageUrl = (filePath: string): string => {
  const { data } = supabase
    .storage
    .from('images')
    .getPublicUrl(filePath);

  return data.publicUrl;
};
