"use client";
import { supabase } from '../../supabaseClient';
import { useEffect, useState } from 'react';

export default function AdminGallerySettingsPage() {
  const [galleries, setGalleries] = useState<any[]>([]);
  const [themes, setThemes] = useState<any[]>([]);
  const [selectedGallery, setSelectedGallery] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [eventName, setEventName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const { data: galleriesData, error: galleriesError } = await supabase.from('galleries').select('*');
      const { data: themesData, error: themesError } = await supabase.from('themes').select('*');
      if (galleriesError || themesError) setError((galleriesError?.message || '') + (themesError?.message || ''));
      else {
        setGalleries(galleriesData || []);
        setThemes(themesData || []);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  async function handleUpdateGallery(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedGallery) return;
    const { error } = await supabase.from('galleries').update({ theme_id: selectedTheme || null, event_name: eventName || null }).eq('id', selectedGallery);
    if (error) setError(error.message);
    else setMessage('Gallery updated!');
  }

  if (loading) return <div>Loading galleries and themes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Admin: Gallery Settings</h1>
      <form onSubmit={handleUpdateGallery}>
        <select value={selectedGallery} onChange={e => setSelectedGallery(e.target.value)} required>
          <option value="">Select Gallery</option>
          {galleries.map(g => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>
        <select value={selectedTheme} onChange={e => setSelectedTheme(e.target.value)}>
          <option value="">No Theme</option>
          {themes.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
        <input placeholder="Event Name (optional)" value={eventName} onChange={e => setEventName(e.target.value)} />
        <button type="submit">Update Gallery</button>
      </form>
      {message && <div style={{ color: 'green' }}>{message}</div>}
    </div>
  );
}
