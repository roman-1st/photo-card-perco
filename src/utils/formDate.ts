const months = [
    'янв',
    'фев',
    'мар',
    'апр',
    'май',
    'июн',
    'июл',
    'авг',
    'сен',
    'окт',
    'ноя',
    'дек',
];



export const formDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0'); // Получаем день и добавляем ведущий ноль при необходимости
    const month = months[date.getMonth()]; // Получаем месяц (0-11) и добавляем ведущий ноль при необходимости
    const year = date.getFullYear(); // Получаем год
    const hours = String(date.getHours()).padStart(2, '0'); // Получаем часы и добавляем ведущий ноль при необходимости
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Получаем минуты и добавляем ведущий ноль при необходимости

    return `${day} ${month} ${year}г. в ${hours} час. ${minutes} мин.`;
}