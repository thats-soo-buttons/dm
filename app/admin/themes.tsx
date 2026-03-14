"use client";
import { supabase } from '../../supabaseClient';
import { useEffect, useState } from 'react';

export default function AdminThemesPage() {
  const [themes, setThemes] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [borderColor, setBorderColor] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [templateName, setTemplateName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchThemes() {
      const { data, error } = await supabase.from('themes').select('*');
      if (error) setError(error.message);
      else setThemes(data || []);
      setLoading(false);
    }
    fetchThemes();
  }, []);

  async function handleAddTheme(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.from('themes').insert([
      { name, border_color: borderColor, logo_url: logoUrl, template_name: templateName }
    ]);
    if (error) setError(error.message);
    else {
      setName(''); setBorderColor(''); setLogoUrl(''); setTemplateName('');
      setLoading(true);
      const { data } = await supabase.from('themes').select('*');
      setThemes(data || []);
      setLoading(false);
    }
  }

  if (loading) return <div>Loading themes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Admin: Manage Themes</h1>
      <form onSubmit={handleAddTheme} style={{ marginBottom: 24 }}>
        <input placeholder="Theme Name" value={name} onChange={e => setName(e.target.value)} required />
        <input placeholder="Border Color (e.g. #ff0)" value={borderColor} onChange={e => setBorderColor(e.target.value)} />
        <input placeholder="Logo URL" value={logoUrl} onChange={e => setLogoUrl(e.target.value)} />
        <input placeholder="Template Name" value={templateName} onChange={e => setTemplateName(e.target.value)} />
        <button type="submit">Add Theme</button>
      </form>
      <ul>
        {themes.map(theme => (
          <li key={theme.id}>
            <strong>{theme.name}</strong> | Border: {theme.border_color} | Logo: {theme.logo_url} | Template: {theme.template_name}
          </li>
        ))}
      </ul>
    </div>
  );
}
