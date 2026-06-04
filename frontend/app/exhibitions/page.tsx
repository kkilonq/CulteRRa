'use client';
import { useEffect, useState } from 'react';

interface Exhibit {
  id: string;
  title: string;
  author: string;
  creationYear?: number;
  isInsuranceRequired: boolean;
}

export default function AllExhibitsPage() {
  const [data, setData] = useState<{ items: Exhibit[]; total: number; pages: number } | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetch(`http://localhost:4000/api/exhibit?page=${page}&limit=5&q=${search}`)
        .then((res) => res.json())
        .then((data) => setData(data));
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search, page]);

  if (!data) return <div className="text-center py-12 text-slate-500 font-medium">Загрузка списка экспонатов...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Все экспонаты музея</h1>
        <input
          type="text"
          placeholder="🔍 Поиск по названию или автору..."
          className="w-full md:w-80 px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold">
              <th className="p-4">Название</th>
              <th className="p-4">Автор</th>
              <th className="p-4">Год</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-semibold text-slate-800">{item.title}</td>
                <td className="p-4 text-slate-600">{item.author}</td>
                <td className="p-4 text-slate-500">{item.creationYear || '—'}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${
                    item.isInsuranceRequired ? 'bg-amber-50 text-amber-700' : 'bg-slate-50 text-slate-600'
                  }`}>
                    {item.isInsuranceRequired ? 'Обязательна' : 'Не требуется'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
