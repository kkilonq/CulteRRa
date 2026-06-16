'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Exhibit {
  id: string;
  title: string;
  author: string;
  creationYear?: number;
}

interface ExhibitionDetails {
  id: string;
  title: string;
  ticketPrice: number;
  isInterregional: boolean;
  description?: string;
  exhibits: Exhibit[];
}

export default function ExhibitionDetailPage() {
  const params = useParams();
  const [exhibition, setExhibition] = useState<ExhibitionDetails | null>(null);
  const [error, setError] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadData = () => {
    const BASE_URL = 'https://culterra-back-kkilonq.amvera.io';
    fetch(`${BASE_URL}/api/exhibition/${params?.id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Экспозиция не найдена в архиве галереи.');
        return res.json();
      })
      .then((data) => setExhibition(data))
      .catch((err) => setError(err.message || 'Ошибка при загрузке данных'));
  };

  useEffect(() => {
    loadData();
  }, [params?.id]);

  const handleDeleteExhibit = async (exhibitId: string, exhibitTitle: string) => {
    if (!confirm(`Исключить экспонат "${exhibitTitle}" из данной экспозиции?`)) return;
    
    setDeletingId(exhibitId);
    
   const BASE_URL = 'https://culterra-back-kkilonq.amvera.io';
    const response = await fetch(`${BASE_URL}/api/exhibit/${exhibitId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      loadData();
    } else {
      alert('Ошибка при удалении экспоната');
    }
    
    setDeletingId(null);
  };

  if (error) return <div className="text-center py-24 text-red-700 font-light text-sm">Экспозиция не найдена в архиве галереи.</div>;
  if (!exhibition) return <div className="text-center py-24 text-stone-400 font-['Cormorant_Garamond',serif] italic text-xl">Загрузка информации...</div>;

  return (
    <div className="space-y-10">
      <Link href="/" className="inline-flex items-center text-xs uppercase tracking-widest font-medium text-stone-400 hover:text-stone-900 transition-colors">
        ← Назад к залам
      </Link>
      
      <div className="bg-white border border-stone-200/40 p-8 shadow-[0_2px_12px_rgba(0,0,0,0.005)]">
        <span className="text-[10px] tracking-widest uppercase text-[#8C2D19] font-medium block mb-2">
          {exhibition.isInterregional ? 'Всероссийский масштаб' : 'Региональный проект'}
        </span>
        <h1 className="text-3xl md:text-4xl font-normal text-stone-900 font-['Cormorant_Garamond',serif] mb-4 tracking-wide">
          {exhibition.title}
        </h1>
        <p className="text-stone-600 text-sm leading-relaxed mb-6 max-w-3xl">
          {exhibition.description || 'Аннотация к данной экспозиции временно отсутствует.'}
        </p>
        <div className="text-xs uppercase tracking-wider text-stone-400 font-light border-t border-stone-100 pt-4">
          Посещение залов: <span className="text-stone-900 font-normal font-['Cormorant_Garamond',serif] ml-1">{exhibition.ticketPrice} ₽</span>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200/60 pb-4">
          <h2 className="text-2xl font-light text-stone-900 font-['Cormorant_Garamond',serif]">
            Экспонаты зала ({exhibition.exhibits.length})
          </h2>
        </div>

        {exhibition.exhibits.length === 0 ? (
          <p className="text-stone-400 bg-white p-12 text-center border border-stone-200/40 font-light text-sm italic">
            В данном выставочном зале экспонаты ещё не размещены.
          </p>
        ) : (
          <div className="bg-white border border-stone-200/40 shadow-[0_2px_12px_rgba(0,0,0,0.005)] overflow-hidden">
            <table className="w-full text-left border-collapse text-xs tracking-wide">
              <thead>
                <tr className="bg-stone-50/50 border-b border-stone-100 text-stone-400 uppercase text-[10px] tracking-widest font-medium">
                  <th className="p-4 font-medium">Название произведения</th>
                  <th className="p-4 font-medium">Мастер</th>
                  <th className="p-4 font-medium">Год</th>
                  <th className="p-4 font-medium text-center">Действие</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100/70">
                {exhibition.exhibits.map((item) => (
                  <tr key={item.id} className="hover:bg-stone-50/30 transition-colors duration-150">
                    <td className="p-4 text-stone-900 font-['Cormorant_Garamond',serif] text-xl font-normal">{item.title}</td>
                    <td className="p-4 text-stone-600 font-light text-sm">{item.author}</td>
                    <td className="p-4 text-stone-500 font-light text-sm">{item.creationYear || '—'}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleDeleteExhibit(item.id, item.title)}
                        disabled={deletingId === item.id}
                        className="text-stone-400 hover:text-red-700 uppercase text-[10px] tracking-wider transition-colors disabled:opacity-50"
                      >
                        {deletingId === item.id ? 'Удаление...' : 'Исключить'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
