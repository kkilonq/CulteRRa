import { Exhibition, Exhibit } from '../types';

export const exhibitions: Exhibition[] = [];
export const exhibits: Exhibit[] = [];

export const seedDatabase = () => {
  exhibitions.length = 0;
  exhibits.length = 0;

  exhibitions.push(
    { id: '1', title: 'Шедевры русской живописи', ticketPrice: 550, isInterregional: false, description: 'Великие картины Третьяковской галереи', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '2', title: 'Сокровища Эрмитажа', ticketPrice: 600, isInterregional: true, description: 'Шедевры западноевропейского искусства', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '3', title: 'Иконопись Древней Руси', ticketPrice: 450, isInterregional: false, description: 'Духовное наследие Андрея Рублёва и Феофана Грека', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '4', title: 'Современное искусство Петербурга', ticketPrice: 350, isInterregional: true, description: 'Авангард и современные художники Северной столицы', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '5', title: 'Коллекция музея им. Радищева', ticketPrice: 300, isInterregional: true, description: 'Региональное искусство Поволжья', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
  );

  exhibits.push(
    { id: '1', title: 'Утро в сосновом лесу', author: 'Иван Шишкин', creationYear: 1889, exhibitionId: '1', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '2', title: 'Богатыри', author: 'Виктор Васнецов', creationYear: 1898, exhibitionId: '1', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '3', title: 'Грачи прилетели', author: 'Алексей Саврасов', creationYear: 1871, exhibitionId: '1', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
  );

  exhibits.push(
    { id: '4', title: 'Мадонна Литта', author: 'Леонардо да Винчи', creationYear: 1491, exhibitionId: '2', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '5', title: 'Возвращение блудного сына', author: 'Рембрандт', creationYear: 1668, exhibitionId: '2', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '6', title: 'Часы "Павлин"', author: 'Джеймс Кокс', creationYear: 1772, exhibitionId: '2', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
  );

  exhibits.push(
    { id: '7', title: 'Троица', author: 'Андрей Рублёв', creationYear: 1425, exhibitionId: '3', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '8', title: 'Спас Нерукотворный', author: 'Феофан Грек', creationYear: 1392, exhibitionId: '3', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '9', title: 'Устюжское Благовещение', author: 'Неизвестный мастер', creationYear: 1120, exhibitionId: '3', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
  );

  exhibits.push(
    { id: '10', title: 'Чёрный квадрат', author: 'Казимир Малевич', creationYear: 1915, exhibitionId: '4', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '11', title: 'Композиция VII', author: 'Василий Кандинский', creationYear: 1913, exhibitionId: '4', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '12', title: 'Купание красного коня', author: 'Кузьма Петров-Водкин', creationYear: 1912, exhibitionId: '4', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
  );

  exhibits.push(
    { id: '13', title: 'Явление Христа народу', author: 'Александр Иванов', creationYear: 1857, exhibitionId: '5', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '14', title: 'Последний день Помпеи', author: 'Карл Брюллов', creationYear: 1833, exhibitionId: '5', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '15', title: 'Неравный брак', author: 'Василий Пукирев', creationYear: 1862, exhibitionId: '5', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
  );
};