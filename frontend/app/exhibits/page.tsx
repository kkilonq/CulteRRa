'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Exhibit {
  id: string;
  title: string;
  author: string;
  creationYear?: number;
}

export default function AllExhibitsPage() {
  const [data, setData] = useState<{ items: Exhibit[]; total: number; pages: number } | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [formError, setFormError] = useState('');

 const BASE_URL = 'https://culterra-back-kkilonq.amvera.io';
  
 const loadExhibits = () => {
    fetch(`${BASE_URL}/api/exhibit?page=${page}&limit=5&q=${search}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch(() => setFormError('Ошибка при загрузке реестра экспонатов'));
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      loadExhibits();
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [search, page]);

  const handleDelete = async (id: string) => {
    if (!confirm('Исключить данный экспонат из музейного реестра?')) return;

    const response = await fetch(`${BASE_URL}/api/exhibit/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      loadExhibits();
    } else {
      alert('Ошибка при удалении экспоната');
    }
  };

  if (!data) return <div className="text-center py-24 text-stone-400 font-['Cormorant_Garamond',serif] italic text-xl">Загрузка архива...</div>;
  
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-stone-200/60 pb-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-light tracking-wide text-stone-900 font-['Cormorant_Garamond',serif]">
            Реестр экспонатов
          </h1>
          <p className="text-stone-400 text-xs mt-1 uppercase tracking-wider font-light">Полный перечень зарегистрированных произведений</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 items-stretch sm:items-center">
          <input
            type="text"
            placeholder="Поиск по названию или автору..."
            className="px-2 py-1.5 bg-transparent border-b border-stone-200 focus:border-stone-800 focus:outline-none text-sm font-light transition-colors w-full sm:w-60 placeholder-stone-400"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
          <Link 
            href="/exhibits/new"
            className="border border-[#8C2D19] hover:bg-[#8C2D19] text-[#8C2D19] hover:text-white px-5 py-2 text-[11px] font-medium tracking-widest uppercase transition-all duration-300 whitespace-nowrap text-center"
          >
            Добавить экспонат
          </Link>
        </div>
      </div>

      <div className="hidden md:flex justify-center">
        <div className="bg-white border border-stone-200/40 rounded-none shadow-[0_2px_12px_rgba(0,0,0,0.005)] overflow-x-auto w-full">
          <table className="w-full text-left border-collapse text-xs tracking-wide min-w-[600px]">
            <thead>
              <tr className="bg-stone-50/50 border-b border-stone-100 text-stone-400 uppercase text-[10px] tracking-widest font-medium">
                <th className="p-4 pr-16 font-medium whitespace-nowrap">Название объекта</th>
                <th className="p-4 pr-16 font-medium whitespace-nowrap">Автор произведения</th>
                <th className="p-4 pr-12 font-medium whitespace-nowrap">Период / Год</th>
                <th className="p-4 font-medium whitespace-nowrap text-center">Действие</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100/70">
              {data.items.map((item) => (
                <tr key={item.id} className="hover:bg-stone-50/30 transition-colors duration-150">
                  <td className="p-4 pr-16 text-stone-900 font-['Cormorant_Garamond',serif] text-2xl font-normal whitespace-nowrap">{item.title}</td>
                  <td className="p-4 pr-16 text-stone-600 font-light text-base whitespace-nowrap">{item.author}</td>
                  <td className="p-4 pr-12 text-stone-500 font-light text-sm whitespace-nowrap">{item.creationYear || '—'}</td>
                  <td className="p-4 whitespace-nowrap text-center space-x-4">
                    <Link 
                      href={`/exhibits/${item.id}/edit`}
                      className="text-stone-400 hover:text-stone-800 uppercase text-[10px] tracking-wider transition-colors inline-block"
                    >
                      Редактировать
                    </Link>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="text-stone-400 hover:text-red-700 uppercase text-[10px] tracking-wider transition-colors inline-block"
                    >
                      Исключить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:hidden">
        {data.items.map((item) => (
          <div key={item.id} className="bg-white border border-stone-200/40 p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-normal text-stone-900 font-['Cormorant_Garamond',serif]">
                {item.title}
              </h3>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-stone-400 text-[9px] uppercase tracking-wider">Автор</span>
                <p className="text-stone-700 font-light">{item.author}</p>
              </div>
              <div>
                <span className="text-stone-400 text-[9px] uppercase tracking-wider">Год создания</span>
                <p className="text-stone-500 font-light">{item.creationYear || '—'}</p>
              </div>
            </div>
            <div className="flex gap-4 mt-4 pt-3 border-t border-stone-100">
              <Link 
                href={`/exhibits/${item.id}/edit`}
                className="text-stone-400 hover:text-stone-800 uppercase text-[10px] tracking-wider transition-colors"
              >
                Редактировать
              </Link>
              <button 
                onClick={() => handleDelete(item.id)}
                className="text-stone-400 hover:text-red-700 uppercase text-[10px] tracking-wider transition-colors"
              >
                Исключить
              </button>
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
