const ru = {
  navigation: {
    sections: {
      main: 'Меню',
      account: 'Аккаунт',
    },
    items: {
      home: 'Главная',
      dashboard: 'Панель',
      users: 'Пользователи',
      forms: 'Формы',
      settings: 'Настройки',
      blank: 'Пустая страница',
      logout: 'Выйти',
    },
  },
  header: {
    title: 'Админ-панель',
    actions: {
      toggleSidebar: 'Переключить боковую панель',
      toggleTheme: 'Переключить тему',
      toggleAccountMenu: 'Переключить меню аккаунта',
    },
  },
  common: {
    loading: {
      interface: 'Загрузка интерфейса…',
    },
    errors: {
      generic: 'Что-то пошло не так',
    },
    empty: {
      title: 'Нет результатов',
      description: 'Записи не найдены',
      dashboard: 'Данные для панели недоступны',
      revenueTrend: 'Нет данных о динамике дохода',
      revenueByRegion: 'Нет данных о доходе по регионам',
      segments: 'Нет данных о распределении пользователей',
      performance: 'Нет данных о показателях эффективности',
      activity: 'Последняя активность отсутствует',
      users: 'Пользователи не найдены',
    },
    buttons: {
      tryAgain: 'Повторить попытку',
      viewAll: 'Показать все',
      cancel: 'Отмена',
      confirm: 'Подтвердить',
      edit: 'Редактировать',
      delete: 'Удалить',
      save: 'Сохранить',
    },
    units: {
      minutesShort: 'мин',
    },
    status: {
      active: 'Активен',
      activeAccount: 'Активный аккаунт',
      yes: 'Да',
      no: 'Нет',
    },
    table: {
      summary: 'Показаны записи {{from}}–{{to}} из {{total}}',
      rowsPerPage: 'Строк на странице',
      page: 'Страница {{current}} из {{total}}',
      prev: 'Назад',
      next: 'Вперёд',
      columns: 'Столбцы',
      emptyMessage: 'Измените фильтры или добавьте новые записи.',
      search: {
        default: 'Поиск...',
        single: 'Поиск по {{field}}...',
        multiple: 'Поиск по {{fields}}...',
      },
    },
    modals: {
      deleteUserTitle: 'Удалить пользователя?',
    },
    messages: {
      formSubmitted: 'Форма успешно отправлена!',
      settingsSaved: 'Настройки сохранены',
      usersErrorTitle: 'Не удалось загрузить пользователей',
      usersErrorMessage: 'Попробуйте ещё раз позже.',
      usersEmptyTitle: 'Пока нет пользователей',
      usersEmptyMessage: 'Пригласите коллег, чтобы начать работу.',
    },
    password: {
      label: 'Надёжность пароля: {{level}}',
      levels: {
        weak: 'Слабый',
        fair: 'Средний',
        good: 'Хороший',
        strong: 'Отличный',
      },
    },
  },
  dashboard: {
    page: {
      title: 'Обзор панели',
      description: 'С возвращением! Краткое резюме показателей вашего бизнеса.',
    },
    errors: {
      stats: 'Не удалось загрузить данные панели',
      users: 'Не удалось загрузить данные пользователей',
    },
    stats: {
      totalUsers: 'Всего пользователей',
      vsLastMonth: 'к прошлому месяцу',
      activeUsers: 'Активные пользователи',
      ofTotalUsers: 'от общего числа',
      revenue: 'Доход',
      avgSession: 'Средняя сессия',
      satisfaction: 'Удовлетворённость',
      vsLastSurvey: 'к прошлому опросу',
    },
    revenue: {
      trendTitle: 'Динамика дохода',
      regionTitle: 'Доход по регионам',
      datasetLabel: 'Доход',
    },
    segments: {
      title: 'Сегменты клиентов',
      share: 'Доля активных пользователей',
    },
    performance: {
      title: 'Сводка по эффективности',
      pageLoad: 'Загрузка страницы',
      errorRate: 'Доля ошибок',
      improvement: 'Улучшение',
      uptime: 'Аптайм',
      lastThirtyDays: 'Последние 30 дней',
    },
    recentUsers: {
      title: 'Недавние пользователи',
    },
    recentActivity: {
      title: 'Недавняя активность',
    },
  },
  users: {
    page: {
      title: 'Пользователи',
      description: 'Управляйте участниками команды и их уровнями доступа.',
    },
    table: {
      columns: {
        name: 'Имя',
        email: 'Email',
        role: 'Роль',
        active: 'Активен',
        actions: 'Действия',
      },
      active: {
        yes: 'Да',
        no: 'Нет',
      },
    },
  },
  forms: {
    page: {
      title: 'Расширенная регистрация пользователя',
      description: 'Соберите расширенные данные аккаунта и настройте предпочтения за один раз.',
    },
    sections: {
      basicInfo: 'Основная информация',
      roleStatus: 'Роль и статус',
      skills: 'Навыки',
      address: 'Адрес',
      notifications: 'Настройки уведомлений',
      agreement: 'Согласие',
    },
    fields: {
      fullName: 'Полное имя',
      fullNamePlaceholder: 'Иван Иванов',
      email: 'Email',
      emailPlaceholder: 'ivan@example.com',
      password: 'Пароль',
      confirmPassword: 'Подтверждение пароля',
      phone: 'Телефон',
      phonePlaceholder: '+79991234567',
      dateOfBirth: 'Дата рождения',
      role: 'Роль',
      status: 'Статус',
      address: {
        street: 'Улица и дом',
        city: 'Город',
        state: 'Штат',
        statePlaceholder: 'Выберите штат',
        zipCode: 'Почтовый индекс',
        zipCodePlaceholder: '12345',
        country: 'Страна',
      },
      notifications: {
        email: 'Email-уведомления',
        sms: 'SMS-уведомления',
        push: 'Push-уведомления',
      },
      agreement: 'Я принимаю Условия использования и Политику конфиденциальности',
    },
    roleOptions: {
      admin: 'Администратор',
      editor: 'Редактор',
      viewer: 'Наблюдатель',
    },
    actions: {
      submit: 'Создать аккаунт',
    },
  },
  settings: {
    page: {
      title: 'Настройки',
      description: 'Обновите информацию профиля и параметры уведомлений.',
    },
    fields: {
      namePlaceholder: 'Имя',
      emailPlaceholder: 'Email',
    },
  },
  blank: {
    page: {
      title: 'Пустая страница',
      description: 'Начните с чистого листа.',
      content: 'Настройте эту страницу, добавив компоненты или визуализацию данных.',
    },
  },
  system: {
    error: {
      title: 'Что-то пошло не так',
    },
    notFound: {
      title: '404 — Страница не найдена',
      description: 'Страница, которую вы ищете, не существует.',
    },
  },
}

export default ru
