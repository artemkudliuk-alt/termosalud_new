import fs from 'fs';
import path from 'path';

// Let's create an HTML file that uses canvas to split the 6 images and download or write them to public/
const script = `
const images = [
  { id: 1, src: '/wp-content/uploads/2026/03/ba-1-optimized.png', title: 'Стегна та сідниці', sessions: '6 сеансів', desc: 'Усунення локальних жирових відкладень та підтяжка контуру сідниць. Зменшення окружності стегон на -4.5 см.' },
  { id: 2, src: '/wp-content/uploads/2026/03/ba-2-optimized.png', title: 'Зменшення целюліту', sessions: '5 сеансів', desc: 'Помітне розгладження мікрорельєфу шкіри при фіброзному целюліті, усунення ефекту «апельсинової кірки».' },
  { id: 3, src: '/wp-content/uploads/2026/03/ba-3-optimized.png', title: 'Підтяжка та ліфтинг шкіри', sessions: '4 сеанси', desc: 'Потужне ущільнення в\'ялої шкіри завдяки стимуляції неоколагенезу монополярним резистивним RF.' },
  { id: 4, src: '/wp-content/uploads/2026/03/imgi_12_result-8-optimized.png', title: 'Корекція зони галіфе', sessions: '6 сеансів', desc: 'Зменшення стійких жирових пасток на зовнішній поверхні стегон за рахунок MARP-ротації.' },
  { id: 5, src: '/wp-content/uploads/2026/03/imgi_16_result-3-optimized.png', title: 'Живіт та боки', sessions: '5 сеансів', desc: 'Формування витонченої лінії талії, усунення набряків та глибокий вісцеральний дренаж.' },
  { id: 6, src: '/wp-content/uploads/2026/03/imgi_14_result-1-optimized.png', title: 'Тонус та пружність', sessions: '4 сеанси', desc: 'Миттєвий та пролонгований ліфтинг тканин, покращення мікроциркуляції та тургору шкіри.' }
];

console.log('Images array ready');
`;

console.log(script);
