'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface ExhibitionMin {
  id: string;
  title: string;
}

export default function EditExhibitPage() {
  const router = useRouter();
  const params = useParams();
  
  const [exhibitionsList, setExhibitionsList] = useState<ExhibitionMin[]>([]); 
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [creationYear, setCreationYear] = useState('');
  const [selectedExhibitionId, setSelectedExhibitionId] = useState('');
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('http://localhost:4000/api/exhibition?limit=100')
      .then((res) => res.json())
      .then((resData) => {
        if (resData && resData.items) {
          setExhibitionsList(resData.items);
        }
      })
      .catch(() => setFormError('Не удалось загрузить списки выставок'));

    if (params?.id) {
      fetch(`http://localhost:4000/api/exhibit/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setTitle(data.title);
          setAuthor(data.author);
          setCreationYear(data.creationYear ? String(data.creationYear) : '');
          setSelectedExhibitionId(data.exhibitionId);
        })
        .catch(() => setFormError('Не удалось загрузить данные экспоната'));
    }
  }, [params?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setLoading(true);

    if (!title.trim() || !author.trim()) {
      setLoading(false);
      return setFormError('Название и мастер обязательны для заполнения');
    }

    try {
      const response = await fetch(`http://localhost:4000/api/exhibit/${params.id}`, {
        method: 'PATCH',
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
        <h2 className="text-2xl font-light text-stone-900 font-['Cormorant_Garamond',serif] tracking-wide border-b border-stone-100 pb-3 mb-6">Редактирование экспаната</h2>
        {formError && <div className="text-xs text-red-700 bg-red-50 p-3 border border-red-100 mb-4 font-sans">{formError}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[9px] tracking-widest font-medium text-stone-400 uppercase mb-1">Перенос в другую экспозицию</label>
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
            <button type="submit" disabled={loading} className="w-full py-2 bg-[#8C2D19] hover:bg-[#5F1E10] text-white text-[10px] uppercase tracking-wider font-medium transition-colors disabled:opacity-50">
              {loading ? 'Обновление реестра...' : 'Сохранить изменения'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}