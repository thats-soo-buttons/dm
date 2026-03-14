"use client";
export const runtime = 'edge';
import { supabase } from '../../../supabaseClient';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // If this fails, will fallback to props

export default function GalleryDetailPage() {
  const params = useParams();
  const slug = params?.slug as string | undefined;
  const [gallery, setGallery] = useState<any>(null);
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGalleryAndImages() {
      const { data: galleryData, error: galleryError } = await supabase
        .from('galleries')
        .select('*')
        .eq('slug', slug)
        .single();
      if (galleryError) {
        setError(galleryError.message);
        setLoading(false);
        return;
      }
      setGallery(galleryData);
      const { data: imagesData, error: imagesError } = await supabase
        .from('images')
        .select('*')
        .eq('gallery_id', galleryData.id);
      if (imagesError) setError(imagesError.message);
      else setImages(imagesData || []);
      setLoading(false);
    }
    if (slug) fetchGalleryAndImages();
  }, [slug]);

  if (loading) return <div>Loading gallery...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!gallery) return <div>Gallery not found.</div>;

  return (
    <div>
      <h1>{gallery.name}</h1>
      <ul>
        {images.map((img) => (
          <li key={img.id}>
            <img src={`/api/watermarked-image?src=${encodeURIComponent(img.watermarked_url)}`} alt="Photo" style={{ maxWidth: 200 }} />
            <div>{img.is_locked ? 'Locked' : 'Unlocked'}</div>
            <div>{img.is_edited ? 'Edited' : 'Unedited'}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
