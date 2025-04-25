import { supabase } from './supabaseClient';

export const uploadImage = async (file: File): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `user_1/${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(fileName, file, {
        upsert: false,
        cacheControl: '3600'
      });

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      return null;
    }

    return fileName;
  } catch (error) {
    console.error('Error in uploadImage:', error);
    return null;
  }
};

export const uploadDocument = async (file: File): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `user_1/${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('files')
      .upload(fileName, file, {
        upsert: false,
        cacheControl: '3600'
      });

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      return null;
    }

    return fileName;
  } catch (error) {
    console.error('Error in uploadDocument:', error);
    return null;
  }
}; 