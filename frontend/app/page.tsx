'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Exhibition {
  id: string;
  title: string;
  ticketPrice: number;
  isInterregional: boolean;
  description?: string;
}

export default function ExhibitionsPage() {
  const [data, setData] = useState<{ items: Exhibition[]; total: number; pages: number } | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');

 const BASE_URL = 'https://culterra-back-kkilonq.amvera.io';

const loadData = () => {
  fetch(`${BASE_URL}/api/exhibition?page=${page}&limit=3&q=${search}`)
    .then((res) => res.json())
    .then((data) => setData(data))
    .catch(() => setError('Ошибка загрузки данных'));
};

useEffect(() => {
  const delayDebounce = setTimeout(() => {
    loadData();
  }, 300);
  return () => clearTimeout(delayDebounce);
}, [search, page]);

const handleDelete = async (id: string) => {
  if (!confirm('Вы уверены, что хотите безвозвратно удалить эту выставку?')) return;
  
  const response = await fetch(`${BASE_URL}/api/exhibition/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    loadData();
  } else {
    alert('Не удалось удалить выставку');
  }
};


  if (!data) return <div className="text-center py-24 text-stone-400 font-['Cormorant_Garamond',serif] italic text-xl">Загрузка экспозиции...</div>;
  
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-stone-200/60 pb-6">
        <div>
          <h1 className="text-4xl md:text-4xl font-light tracking-wide text-stone-900 font-['Cormorant_Garamond',serif]">
            Действующие экспозиции
          </h1>
          <p className="text-stone-400 text-xs mt-1 uppercase tracking-wider font-light">Каталог временных и постоянных выставок</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 items-stretch sm:items-center">
          <input
            type="text"
            placeholder="Поиск по названию..."
            className="px-2 py-1.5 bg-transparent border-b border-stone-200 focus:border-stone-800 focus:outline-none text-sm transition-colors w-full sm:w-60 placeholder-stone-400 font-light"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
          <Link 
            href="/exhibitions/new"
            className="border border-[#8C2D19] hover:bg-[#8C2D19] text-[#8C2D19] hover:text-white px-5 py-2 text-[11px] font-medium tracking-widest uppercase transition-all duration-300 text-center"
          >
            Добавить выставку
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {data.items.map((ex) => (
          <div key={ex.id} className="bg-white border border-stone-200/40 p-6 flex flex-col justify-between hover:border-stone-400/80 transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] tracking-widest uppercase text-[#8C2D19] font-medium">
                  {ex.isInterregional ? 'Всероссийский масштаб' : 'Региональный проект'}
                </span>
                <Link 
                  href={`/exhibitions/${ex.id}/edit`}
                  className="text-[10px] uppercase tracking-wider text-stone-400 hover:text-stone-800 transition-colors"
                >
                  Редактировать
                </Link>
              </div>
              <h3 className="text-3xl font-normal text-stone-900 font-['Cormorant_Garamond',serif] mb-3 leading-tight tracking-wide">
                {ex.title}
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed mb-6 font-light line-clamp-3">
                {ex.description || 'Описание временно отсутствует в архиве галереи.'}
              </p>
            </div>
            <div className="border-t border-stone-100 pt-4 mt-auto flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Стоимость Билета</span>
                <span className="text-base text-stone-800 font-medium">{ex.ticketPrice} ₽</span>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => handleDelete(ex.id)}
                  className="text-[11px] font-medium uppercase tracking-widest text-stone-300 hover:text-red-700 transition-colors"
                >
                  Удалить
                </button>
                <Link href={`/exhibitions/${ex.id}`} className="text-[11px] font-medium uppercase tracking-widest text-[#8C2D19] hover:text-stone-900 border-b border-transparent hover:border-stone-900 pb-0.5 transition-all">
                  Экспонаты →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {data.pages > 1 && (
        <div className="flex items-center justify-center gap-6 pt-6 border-t border-stone-200/40">
          <button
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-1.5 border border-stone-200 hover:border-stone-800 disabled:opacity-20 text-stone-700 text-xs uppercase tracking-wider transition-colors"
          >
            ← Назад
          </button>
          <span className="text-xs tracking-wider text-stone-400 uppercase font-light">
            Лист {page} из {data.pages}
          </span>
          <button
            onClick={() => setPage(prev => Math.min(prev + 1, data.pages))}
            disabled={page === data.pages}
            className="px-4 py-1.5 border border-stone-200 hover:border-stone-800 disabled:opacity-20 text-stone-700 text-xs uppercase tracking-wider transition-colors"
          >
            Вперед →
          </button>
        </div>
      )}
    </div>
  );
}
