"use client";
import { supabase } from '../../../supabaseClient';
import { useEffect, useState } from 'react';

export default function AdminTemplatesPage() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [type, setType] = useState('photo_strip');
  const [pngUrl, setPngUrl] = useState('');
  const [slotCount, setSlotCount] = useState(4);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTemplates() {
      const { data, error } = await supabase.from('templates').select('*');
      if (error) setError(error.message);
      else setTemplates(data || []);
      setLoading(false);
    }
    fetchTemplates();
  }, []);

  async function handleAddTemplate(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.from('templates').insert([
      { name, type, png_url: pngUrl, slot_count: slotCount }
    ]);
    if (error) setError(error.message);
    else {
      setName(''); setType('photo_strip'); setPngUrl(''); setSlotCount(4);
      setLoading(true);
      const { data } = await supabase.from('templates').select('*');
      setTemplates(data || []);
      setLoading(false);
    }
  }

  if (loading) return <div>Loading templates...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Admin: Manage Download Templates</h1>
      <form onSubmit={handleAddTemplate} style={{ marginBottom: 24 }}>
        <input placeholder="Template Name" value={name} onChange={e => setName(e.target.value)} required />
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="photo_strip">Photo Booth Strip</option>
          <option value="event_collage">Event Collage</option>
        </select>
        <input placeholder="PNG URL" value={pngUrl} onChange={e => setPngUrl(e.target.value)} required />
        <input type="number" min={1} max={12} placeholder="Slot Count" value={slotCount} onChange={e => setSlotCount(Number(e.target.value))} required />
        <button type="submit">Add Template</button>
      </form>
      <ul>
        {templates.map(template => (
          <li key={template.id}>
            <strong>{template.name}</strong> | Type: {template.type} | PNG: {template.png_url} | Slots: {template.slot_count}
          </li>
        ))}
      </ul>
    </div>
  );
}
