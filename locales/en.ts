const en = {
  navigation: {
    sections: {
      main: 'Menu',
      account: 'Account',
    },
    items: {
      home: 'Home',
      dashboard: 'Dashboard',
      users: 'Users',
      forms: 'Forms',
      settings: 'Settings',
      blank: 'Blank Page',
      logout: 'Logout',
    },
  },
  header: {
    title: 'Admin Dashboard',
    actions: {
      toggleSidebar: 'Toggle sidebar',
      toggleTheme: 'Toggle theme',
      toggleAccountMenu: 'Toggle account menu',
    },
  },
  common: {
    loading: {
      interface: 'Loading interface…',
    },
    errors: {
      generic: 'Something went wrong',
    },
    empty: {
      title: 'No results',
      description: 'No records found',
      dashboard: 'No dashboard data available',
      revenueTrend: 'No revenue trend data available',
      revenueByRegion: 'No regional revenue data available',
      segments: 'No user distribution data available',
      performance: 'No performance metrics available',
      activity: 'No recent activity recorded',
      users: 'No users found',
    },
    buttons: {
      tryAgain: 'Try again',
      viewAll: 'View All',
      cancel: 'Cancel',
      confirm: 'Confirm',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
    },
    units: {
      minutesShort: 'min',
    },
    status: {
      active: 'Active',
      activeAccount: 'Active Account',
      yes: 'Yes',
      no: 'No',
    },
    table: {
      summary: 'Showing {{from}} – {{to}} of {{total}} entries',
      rowsPerPage: 'Rows per page',
      page: 'Page {{current}} of {{total}}',
      prev: 'Prev',
      next: 'Next',
      columns: 'Columns',
      emptyMessage: 'Adjust filters or add new records.',
      search: {
        default: 'Search...',
        single: 'Search {{field}}...',
        multiple: 'Search {{fields}}...',
      },
    },
    modals: {
      deleteUserTitle: 'Delete user?',
    },
    messages: {
      formSubmitted: 'Form submitted successfully!',
      settingsSaved: 'Settings saved',
      usersErrorTitle: 'Failed to load users',
      usersErrorMessage: 'Please try again later.',
      usersEmptyTitle: 'No users yet',
      usersEmptyMessage: 'Invite your colleagues to get started.',
    },
    password: {
      label: 'Password strength: {{level}}',
      levels: {
        weak: 'Weak',
        fair: 'Fair',
        good: 'Good',
        strong: 'Strong',
      },
    },
  },
  dashboard: {
    page: {
      title: 'Dashboard Overview',
      description: "Welcome back! Here's a summary of your business metrics.",
    },
    errors: {
      stats: 'Failed to load dashboard data',
      users: 'Failed to load user data',
    },
    stats: {
      totalUsers: 'Total Users',
      vsLastMonth: 'vs last month',
      activeUsers: 'Active Users',
      ofTotalUsers: 'of total users',
      revenue: 'Revenue',
      avgSession: 'Avg. Session',
      satisfaction: 'Satisfaction',
      vsLastSurvey: 'vs last survey',
    },
    revenue: {
      trendTitle: 'Revenue Trend',
      regionTitle: 'Revenue by Region',
      datasetLabel: 'Revenue',
    },
    segments: {
      title: 'Customer Segments',
      share: 'Share of active users',
    },
    performance: {
      title: 'Performance Snapshot',
      pageLoad: 'Page Load',
      errorRate: 'Error Rate',
      improvement: 'Improvement',
      uptime: 'Uptime',
      lastThirtyDays: 'Last 30 days',
    },
    recentUsers: {
      title: 'Recent Users',
    },
    recentActivity: {
      title: 'Recent Activity',
    },
  },
  users: {
    page: {
      title: 'Users',
      description: 'Manage your team members and their access levels.',
    },
    table: {
      columns: {
        name: 'Name',
        email: 'Email',
        role: 'Role',
        active: 'Active',
        actions: 'Actions',
      },
      active: {
        yes: 'Yes',
        no: 'No',
      },
    },
  },
  forms: {
    page: {
      title: 'Advanced User Registration',
      description: 'Collect detailed account information and configure preferences at once.',
    },
    sections: {
      basicInfo: 'Basic Information',
      roleStatus: 'Role and Status',
      skills: 'Skills',
      address: 'Address',
      notifications: 'Notification Preferences',
      agreement: 'Agreement',
    },
    fields: {
      fullName: 'Full Name',
      fullNamePlaceholder: 'John Doe',
      email: 'Email',
      emailPlaceholder: 'john@example.com',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      phone: 'Phone',
      phonePlaceholder: '+1234567890',
      dateOfBirth: 'Date of Birth',
      role: 'Role',
      status: 'Status',
      address: {
        street: 'Street Address',
        city: 'City',
        state: 'State',
        statePlaceholder: 'Select State',
        zipCode: 'ZIP Code',
        zipCodePlaceholder: '12345',
        country: 'Country',
      },
      notifications: {
        email: 'Email Notifications',
        sms: 'SMS Notifications',
        push: 'Push Notifications',
      },
      agreement: 'I agree to the Terms of Service and Privacy Policy',
    },
    roleOptions: {
      admin: 'Admin',
      editor: 'Editor',
      viewer: 'Viewer',
    },
    actions: {
      submit: 'Create Account',
    },
  },
  settings: {
    page: {
      title: 'Settings',
      description: 'Update your profile information and notification preferences.',
    },
    fields: {
      namePlaceholder: 'Name',
      emailPlaceholder: 'Email',
    },
  },
  blank: {
    page: {
      title: 'Blank Page',
      description: 'Start from a clean slate.',
      content: 'Customize this page by adding components or data visualisations.',
    },
  },
  system: {
    error: {
      title: 'Something went wrong',
    },
    notFound: {
      title: '404 - Page Not Found',
      description: 'The page you are looking for does not exist.',
    },
  },
}

export default en
