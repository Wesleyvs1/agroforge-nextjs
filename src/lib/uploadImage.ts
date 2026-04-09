import { supabase } from './supabase'

/**
 * Uploads an image file or data URL to Supabase Storage and returns the public URL.
 * Falls back to the original data URL if upload fails.
 */
export async function uploadImageToStorage(
  input: File | string,
  folder: string = 'produtos'
): Promise<string> {
  let file: File

  if (typeof input === 'string') {
    // If it's already a regular URL (not data:), just return it
    if (!input.startsWith('data:')) {
      return input
    }

    // Convert data URL to File
    const res = await fetch(input)
    const blob = await res.blob()
    const ext = blob.type.split('/')[1] || 'jpeg'
    file = new File([blob], `upload_${Date.now()}.${ext}`, { type: blob.type })
  } else {
    file = input
  }

  const fileExt = file.name.split('.').pop() || 'jpeg'
  const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 10)}.${fileExt}`
  const filePath = `${folder}/${fileName}`

  const { error: uploadError } = await supabase.storage
    .from('media')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (uploadError) {
    console.error('[uploadImageToStorage] Upload failed:', uploadError)
    // Return the original input if upload fails
    return typeof input === 'string' ? input : URL.createObjectURL(file)
  }

  const { data } = supabase.storage.from('media').getPublicUrl(filePath)
  return data.publicUrl
}
