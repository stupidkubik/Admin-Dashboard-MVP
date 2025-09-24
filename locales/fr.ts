const fr = {
  navigation: {
    sections: {
      main: 'Menu',
      account: 'Compte',
    },
    items: {
      home: 'Accueil',
      dashboard: 'Tableau de bord',
      users: 'Utilisateurs',
      forms: 'Formulaires',
      settings: 'Paramètres',
      blank: 'Page vide',
      logout: 'Se déconnecter',
    },
  },
  header: {
    title: 'Tableau de bord administrateur',
    actions: {
      toggleSidebar: 'Basculer la barre latérale',
      toggleTheme: 'Changer de thème',
    },
  },
  common: {
    loading: {
      interface: "Chargement de l'interface…",
    },
    errors: {
      generic: 'Une erreur est survenue',
    },
    empty: {
      title: 'Aucun résultat',
      description: 'Aucun enregistrement trouvé',
      dashboard: 'Aucune donnée du tableau de bord disponible',
      revenueTrend: 'Aucune donnée de tendance des revenus disponible',
      revenueByRegion: 'Aucune donnée de revenus par région disponible',
      segments: 'Aucune donnée de répartition des utilisateurs disponible',
      performance: 'Aucune mesure de performance disponible',
      activity: 'Aucune activité récente enregistrée',
      users: 'Aucun utilisateur trouvé',
    },
    buttons: {
      tryAgain: 'Réessayer',
      viewAll: 'Voir tout',
      cancel: 'Annuler',
      confirm: 'Confirmer',
      edit: 'Modifier',
      delete: 'Supprimer',
      save: 'Enregistrer',
    },
    status: {
      active: 'Actif',
      activeAccount: 'Compte actif',
      yes: 'Oui',
      no: 'Non',
    },
    table: {
      summary: 'Affichage de {{from}}–{{to}} sur {{total}} entrées',
      rowsPerPage: 'Lignes par page',
      page: 'Page {{current}} sur {{total}}',
      prev: 'Précédent',
      next: 'Suivant',
      columns: 'Colonnes',
      search: {
        default: 'Rechercher...',
        single: 'Rechercher {{field}}...',
        multiple: 'Rechercher {{fields}}...',
      },
    },
    modals: {
      deleteUserTitle: 'Supprimer l’utilisateur ?',
    },
    messages: {
      formSubmitted: 'Formulaire envoyé avec succès !',
      settingsSaved: 'Paramètres enregistrés',
      usersErrorTitle: 'Impossible de charger les utilisateurs',
      usersErrorMessage: 'Veuillez réessayer plus tard.',
      usersEmptyTitle: 'Pas encore d’utilisateurs',
      usersEmptyMessage: 'Invitez vos collègues pour commencer.',
    },
    password: {
      label: 'Solidité du mot de passe : {{level}}',
      levels: {
        weak: 'Faible',
        fair: 'Moyen',
        good: 'Bon',
        strong: 'Excellent',
      },
    },
  },
  dashboard: {
    page: {
      title: 'Vue d’ensemble du tableau de bord',
      description: 'Content de vous revoir ! Voici un résumé de vos indicateurs métier.',
    },
    errors: {
      stats: 'Échec du chargement des données du tableau de bord',
      users: 'Échec du chargement des données utilisateurs',
    },
    stats: {
      totalUsers: 'Utilisateurs au total',
      vsLastMonth: 'par rapport au mois dernier',
      activeUsers: 'Utilisateurs actifs',
      ofTotalUsers: 'du total des utilisateurs',
      revenue: 'Revenus',
      avgSession: 'Session moy.',
      satisfaction: 'Satisfaction',
      vsLastSurvey: 'par rapport à la dernière enquête',
    },
    revenue: {
      trendTitle: 'Tendance des revenus',
      regionTitle: 'Revenus par région',
      datasetLabel: 'Revenus',
    },
    segments: {
      title: 'Segments clients',
      share: 'Part des utilisateurs actifs',
    },
    performance: {
      title: 'Instantané des performances',
      pageLoad: 'Chargement de page',
      errorRate: "Taux d'erreur",
      improvement: 'Amélioration',
      uptime: 'Disponibilité',
      lastThirtyDays: '30 derniers jours',
    },
    recentUsers: {
      title: 'Utilisateurs récents',
    },
    recentActivity: {
      title: 'Activité récente',
    },
  },
  users: {
    page: {
      title: 'Utilisateurs',
      description: 'Gérez les membres de votre équipe et leurs niveaux d’accès.',
    },
    table: {
      columns: {
        name: 'Nom',
        email: 'E-mail',
        role: 'Rôle',
        active: 'Actif',
        actions: 'Actions',
      },
      active: {
        yes: 'Oui',
        no: 'Non',
      },
    },
  },
  forms: {
    page: {
      title: "Inscription avancée d'utilisateurs",
      description: 'Collectez des informations détaillées sur le compte et configurez les préférences en une seule fois.',
    },
    sections: {
      basicInfo: 'Informations de base',
      roleStatus: 'Rôle et statut',
      skills: 'Compétences',
      address: 'Adresse',
      notifications: 'Préférences de notification',
      agreement: 'Accord',
    },
    fields: {
      fullName: 'Nom complet',
      fullNamePlaceholder: 'Jean Dupont',
      email: 'E-mail',
      emailPlaceholder: 'jean@example.com',
      password: 'Mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
      phone: 'Téléphone',
      phonePlaceholder: '+33123456789',
      dateOfBirth: 'Date de naissance',
      role: 'Rôle',
      status: 'Statut',
      address: {
        street: 'Adresse',
        city: 'Ville',
        state: 'État',
        statePlaceholder: 'Sélectionnez un État',
        zipCode: 'Code postal',
        country: 'Pays',
      },
      notifications: {
        email: 'Notifications par e-mail',
        sms: 'Notifications par SMS',
        push: 'Notifications push',
      },
      agreement: "J'accepte les Conditions d'utilisation et la Politique de confidentialité",
    },
    roleOptions: {
      admin: 'Administrateur',
      editor: 'Éditeur',
      viewer: 'Lecteur',
    },
    actions: {
      submit: 'Créer un compte',
    },
  },
  settings: {
    page: {
      title: 'Paramètres',
      description: 'Mettez à jour les informations de votre profil et vos préférences de notification.',
    },
    fields: {
      namePlaceholder: 'Nom',
      emailPlaceholder: 'E-mail',
    },
  },
  blank: {
    page: {
      title: 'Page vide',
      description: 'Repartez de zéro.',
      content: 'Personnalisez cette page en ajoutant des composants ou des visualisations de données.',
    },
  },
  system: {
    error: {
      title: 'Une erreur est survenue',
    },
    notFound: {
      title: '404 - Page introuvable',
      description: "La page que vous recherchez n'existe pas.",
    },
  },
}

export default fr
