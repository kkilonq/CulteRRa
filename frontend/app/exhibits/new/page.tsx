'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ExhibitionMin {
  id: string;
  title: string;
}

export default function NewExhibitPage() {
  const router = useRouter();
  const [exhibitionsList, setExhibitionsList] = useState<ExhibitionMin[]>([]); 
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [creationYear, setCreationYear] = useState('');
  const [selectedExhibitionId, setSelectedExhibitionId] = useState('');
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const BASE_URL = 'https://amvera.io';
    fetch(`${BASE_URL}/api/exhibition?limit=100`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setExhibitionsList(data.items || []);
        if (data.items && data.items.length > 0) {
          setSelectedExhibitionId(data.items[0].id);
        }
      })
      .catch(() => setFormError('Не удалось загрузить список выставок'));
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setLoading(true);

    if (!title.trim() || !author.trim()) {
      setLoading(false);
      return setFormError('Название и мастер обязательны для заполнения');
    }

    try {
      const BASE_URL = 'https://culterra-back-kkilonq.amvera.io';
      const response = await fetch(`${BASE_URL}/api/exhibit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          author,
          creationYear: creationYear ? Number(creationYear) : undefined,
          isInsuranceRequired: false,
          exhibitionId: selectedExhibitionId,
        }),
      });

      if (response.ok) {
        router.push('/exhibits');
      } else {
        setFormError('Ошибка валидации данных. Проверьте правильность полей.');
      }
    } catch {
      setFormError('Ошибка соединения с сервером');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="space-y-6 max-w-md mx-auto">
      <Link href="/exhibits" className="text-xs uppercase tracking-widest text-stone-400 hover:text-stone-900">
        ← Отмена
      </Link>
      <div className="bg-white border border-stone-200 p-8 shadow-md">
        <h2 className="text-2xl font-light text-stone-900 font-['Cormorant_Garamond',serif] tracking-wide border-b border-stone-100 pb-3 mb-6">Учет новой единицы</h2>
        {formError && <div className="text-xs text-red-700 bg-red-50 p-3 border border-red-200 mb-4 font-sans">{formError}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[9px] tracking-widest font-medium text-stone-400 uppercase mb-1">Привязка к экспозиции *</label>
            <select 
              className="w-full bg-white border border-stone-200 px-3 py-2 text-sm focus:border-stone-800 focus:outline-none rounded-none font-light text-stone-700"
              value={selectedExhibitionId}
              onChange={(e) => setSelectedExhibitionId(e.target.value)}
              required
            >
              {exhibitionsList.map((ex) => (
                <option key={ex.id} value={ex.id}>{ex.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[9px] tracking-widest font-medium text-stone-400 uppercase mb-1">Название экспоната *</label>
            <input type="text" className="w-full bg-white border border-stone-200 px-3 py-2 text-sm focus:border-stone-800 focus:outline-none font-light" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label className="block text-[9px] tracking-widest font-medium text-stone-400 uppercase mb-1">Мастер / Автор *</label>
            <input type="text" className="w-full bg-white border border-stone-200 px-3 py-2 text-sm focus:border-stone-800 focus:outline-none font-light" value={author} onChange={(e) => setAuthor(e.target.value)} required />
          </div>
          <div>
            <label className="block text-[9px] tracking-widest font-medium text-stone-400 uppercase mb-1">Год создания</label>
            <input type="number" className="w-full bg-white border border-stone-200 px-3 py-2 text-sm focus:border-stone-800 focus:outline-none font-light" value={creationYear} onChange={(e) => setCreationYear(e.target.value)} />
          </div>
          <div className="pt-2">
            <button type="submit" disabled={loading || exhibitionsList.length === 0} className="w-full py-2 bg-[#8C2D19] hover:bg-[#5F1E10] text-white text-[10px] uppercase tracking-wider font-medium transition-colors disabled:opacity-50">
              {loading ? 'Внесение...' : 'Внести в реестр'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
