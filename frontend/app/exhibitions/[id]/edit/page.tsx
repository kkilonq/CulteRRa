'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function EditExhibitionPage() {
  const router = useRouter();
  const params = useParams();
  const [title, setTitle] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const [isInterregional, setIsInterregional] = useState(false);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!params?.id) return;
    fetch(`http://localhost:4000/api/exhibition/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setTicketPrice(String(data.ticketPrice));
        setIsInterregional(data.isInterregional);
        setDescription(data.description || '');
      })
      .catch(() => setError('Не удалось загрузить архивные данные.'));
  }, [params?.id]);

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`https://culterra-back-kkilonq.amvera.io{id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          ticketPrice: Number(ticketPrice),
          isInterregional,
          description: description || undefined,
        }),
      });

      if (response.ok) {
        router.push(`/exhibitions/${id}`);
      } else {
        const errData = await response.json();
        setError(errData.error || 'Ошибка при сохранении изменений.');
      }
    } catch {
      setError('Не удалось связаться с сервером.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="space-y-6 max-w-md mx-auto">
      <Link href="/" className="text-xs uppercase tracking-widest text-stone-400 hover:text-stone-900">
        ← Отмена
      </Link>
      <div className="bg-white border border-stone-200 p-8 shadow-md">
        <h1 className="text-2xl font-light text-stone-900 font-['Cormorant_Garamond',serif] tracking-wide border-b border-stone-100 pb-3 mb-6">Редактирование выставки</h1>
        {error && <div className="text-xs text-red-700 bg-red-50 p-3 border border-red-200 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[9px] tracking-widest font-medium text-stone-400 uppercase mb-1">Название выставки *</label>
            <input type="text" className="w-full bg-white border border-stone-200 px-3 py-2 text-sm focus:border-stone-800 focus:outline-none font-light" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label className="block text-[9px] tracking-widest font-medium text-stone-400 uppercase mb-1">Стоимость билета (₽) *</label>
            <input type="number" min="0" className="w-full bg-white border border-stone-200 px-3 py-2 text-sm focus:border-stone-800 focus:outline-none font-light" value={ticketPrice} onChange={(e) => setTicketPrice(e.target.value)} required />
          </div>
          <div>
            <label className="block text-[9px] tracking-widest font-medium text-stone-400 uppercase mb-2">Статус выставки *</label>
            <div className="flex flex-col gap-2 bg-stone-50/50 p-3 border border-stone-100">
              <label className="flex items-center gap-3 cursor-pointer text-xs font-light text-stone-700 select-none">
                <input type="radio" name="scale" className="w-3.5 h-3.5 text-[#8C2D19] border-stone-300 focus:ring-0" checked={isInterregional === false} onChange={() => setIsInterregional(false)} />
                <span>Региональная экспозиция</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer text-xs font-light text-stone-700 select-none">
                <input type="radio" name="scale" className="w-3.5 h-3.5 text-[#8C2D19] border-stone-300 focus:ring-0" checked={isInterregional === true} onChange={() => setIsInterregional(true)} />
                <span>Всероссийское значение</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-[9px] tracking-widest font-medium text-stone-400 uppercase mb-1">Аннотация</label>
            <textarea rows={3} className="w-full bg-white border border-stone-200 px-3 py-2 text-sm focus:border-stone-800 focus:outline-none resize-none font-light text-stone-600" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="pt-2">
            <button type="submit" disabled={loading} className="w-full py-2 bg-[#8C2D19] hover:bg-[#5F1E10] text-white text-[10px] uppercase tracking-wider font-medium transition-colors disabled:opacity-50">
              {loading ? 'Обновление...' : 'Сохранить изменения'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
