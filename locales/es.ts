const es = {
  navigation: {
    sections: {
      main: 'Menú',
      account: 'Cuenta',
    },
    items: {
      home: 'Inicio',
      dashboard: 'Panel',
      users: 'Usuarios',
      forms: 'Formularios',
      settings: 'Configuración',
      blank: 'Página en blanco',
      logout: 'Cerrar sesión',
    },
  },
  header: {
    title: 'Panel de administración',
    actions: {
      toggleSidebar: 'Alternar barra lateral',
      toggleTheme: 'Cambiar tema',
      toggleAccountMenu: 'Alternar menú de cuenta',
    },
  },
  app: {
    metadata: {
      title: 'Panel de administración',
      description: 'Plantilla de panel de administración',
    },
  },
  common: {
    loading: {
      interface: 'Cargando interfaz…',
    },
    errors: {
      generic: 'Algo salió mal',
    },
    empty: {
      title: 'Sin resultados',
      description: 'No se encontraron registros',
      dashboard: 'No hay datos del panel disponibles',
      revenueTrend: 'No hay datos de tendencia de ingresos disponibles',
      revenueByRegion: 'No hay datos de ingresos por región disponibles',
      segments: 'No hay datos de distribución de usuarios disponibles',
      performance: 'No hay métricas de rendimiento disponibles',
      activity: 'No se registró actividad reciente',
      users: 'No se encontraron usuarios',
    },
    buttons: {
      tryAgain: 'Intentar de nuevo',
      viewAll: 'Ver todo',
      cancel: 'Cancelar',
      confirm: 'Confirmar',
      edit: 'Editar',
      delete: 'Eliminar',
      save: 'Guardar',
    },
    units: {
      minutesShort: 'min',
    },
    status: {
      active: 'Activo',
      activeAccount: 'Cuenta activa',
      yes: 'Sí',
      no: 'No',
    },
    table: {
      summary: 'Mostrando {{from}}–{{to}} de {{total}} registros',
      rowsPerPage: 'Filas por página',
      page: 'Página {{current}} de {{total}}',
      prev: 'Anterior',
      next: 'Siguiente',
      columns: 'Columnas',
      emptyMessage: 'Ajusta los filtros o agrega nuevos registros.',
      search: {
        default: 'Buscar...',
        single: 'Buscar {{field}}...',
        multiple: 'Buscar {{fields}}...',
      },
    },
    modals: {
      deleteUserTitle: '¿Eliminar usuario?',
    },
    messages: {
      formSubmitted: '¡Formulario enviado con éxito!',
      settingsSaved: 'Configuración guardada',
      usersErrorTitle: 'No se pudieron cargar los usuarios',
      usersErrorMessage: 'Vuelve a intentarlo más tarde.',
      usersEmptyTitle: 'Aún no hay usuarios',
      usersEmptyMessage: 'Invita a tus colegas para comenzar.',
    },
    password: {
      label: 'Fortaleza de la contraseña: {{level}}',
      levels: {
        weak: 'Débil',
        fair: 'Regular',
        good: 'Buena',
        strong: 'Fuerte',
      },
    },
  },
  dashboard: {
    page: {
      title: 'Resumen del panel',
      description: '¡Bienvenido de nuevo! Aquí tienes un resumen de tus métricas de negocio.',
    },
    errors: {
      stats: 'Error al cargar los datos del panel',
      users: 'Error al cargar los datos de usuarios',
    },
    stats: {
      totalUsers: 'Usuarios totales',
      vsLastMonth: 'vs. el mes pasado',
      activeUsers: 'Usuarios activos',
      ofTotalUsers: 'del total de usuarios',
      revenue: 'Ingresos',
      avgSession: 'Sesión prom.',
      satisfaction: 'Satisfacción',
      vsLastSurvey: 'vs. la última encuesta',
    },
    revenue: {
      trendTitle: 'Tendencia de ingresos',
      regionTitle: 'Ingresos por región',
      datasetLabel: 'Ingresos',
    },
    segments: {
      title: 'Segmentos de clientes',
      share: 'Participación de usuarios activos',
    },
    performance: {
      title: 'Instantánea de rendimiento',
      pageLoad: 'Carga de página',
      errorRate: 'Tasa de errores',
      improvement: 'Mejora',
      uptime: 'Disponibilidad',
      lastThirtyDays: 'Últimos 30 días',
    },
    recentUsers: {
      title: 'Usuarios recientes',
    },
    recentActivity: {
      title: 'Actividad reciente',
    },
  },
  users: {
    page: {
      title: 'Usuarios',
      description: 'Administra a los miembros del equipo y sus niveles de acceso.',
    },
    table: {
      columns: {
        name: 'Nombre',
        email: 'Correo electrónico',
        role: 'Rol',
        active: 'Activo',
        actions: 'Acciones',
      },
      active: {
        yes: 'Sí',
        no: 'No',
      },
    },
  },
  forms: {
    page: {
      title: 'Registro avanzado de usuarios',
      description: 'Recopila información detallada de la cuenta y configura preferencias a la vez.',
    },
    sections: {
      basicInfo: 'Información básica',
      roleStatus: 'Rol y estado',
      skills: 'Habilidades',
      address: 'Dirección',
      notifications: 'Preferencias de notificación',
      agreement: 'Acuerdo',
    },
    fields: {
      fullName: 'Nombre completo',
      fullNamePlaceholder: 'Juan Pérez',
      email: 'Correo electrónico',
      emailPlaceholder: 'juan@example.com',
      password: 'Contraseña',
      confirmPassword: 'Confirmar contraseña',
      phone: 'Teléfono',
      phonePlaceholder: '+34123456789',
      dateOfBirth: 'Fecha de nacimiento',
      role: 'Rol',
      status: 'Estado',
      address: {
        street: 'Dirección',
        city: 'Ciudad',
        state: 'Estado',
        statePlaceholder: 'Selecciona un estado',
        zipCode: 'Código postal',
        zipCodePlaceholder: '12345',
        country: 'País',
      },
      notifications: {
        email: 'Notificaciones por correo',
        sms: 'Notificaciones por SMS',
        push: 'Notificaciones push',
      },
      agreement: 'Acepto los Términos del servicio y la Política de privacidad',
    },
    roleOptions: {
      admin: 'Administrador',
      editor: 'Editor',
      viewer: 'Visualizador',
    },
    actions: {
      submit: 'Crear cuenta',
    },
  },
  settings: {
    page: {
      title: 'Configuración',
      description: 'Actualiza la información de tu perfil y las preferencias de notificación.',
    },
    fields: {
      namePlaceholder: 'Nombre',
      emailPlaceholder: 'Correo electrónico',
    },
  },
  blank: {
    page: {
      title: 'Página en blanco',
      description: 'Comienza desde cero.',
      content: 'Personaliza esta página añadiendo componentes o visualizaciones de datos.',
    },
  },
  system: {
    error: {
      title: 'Algo salió mal',
    },
    notFound: {
      title: '404 - Página no encontrada',
      description: 'La página que buscas no existe.',
    },
  },
}

export default es
