const { Pool } = require('pg');

const DEFAULT_DASHBOARD = {
  title: 'Savings Dashboard',
  updatedAt: null,
  averageMonthlyQuota: 0,
  goals: [],
  monthlySavings: [],
  notes: []
};

const parseEnvDashboard = () => {
  const rawData = process.env.FINANCE_DASHBOARD_JSON;
  if (!rawData) {
    return { ...DEFAULT_DASHBOARD };
  }

  try {
    return normalizeDashboard(JSON.parse(rawData));
  } catch (error) {
    console.error('Invalid FINANCE_DASHBOARD_JSON value', error);
    return {
      ...DEFAULT_DASHBOARD,
      notes: ['Finance dashboard data is temporarily unavailable.']
    };
  }
};

const normalizeNumber = (value, fallback = 0) => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizeDashboard = (payload) => {
  const dashboard = payload && typeof payload === 'object' ? payload : {};

  return {
    title: typeof dashboard.title === 'string' && dashboard.title.trim() ? dashboard.title.trim() : DEFAULT_DASHBOARD.title,
    updatedAt: typeof dashboard.updatedAt === 'string' ? dashboard.updatedAt : null,
    averageMonthlyQuota: normalizeNumber(dashboard.averageMonthlyQuota, 0),
    goals: Array.isArray(dashboard.goals) ? dashboard.goals.map((goal) => ({
      name: typeof goal?.name === 'string' ? goal.name : 'Untitled goal',
      current: normalizeNumber(goal?.current, 0),
      target: normalizeNumber(goal?.target, 0),
      etaMonths: goal?.etaMonths == null ? undefined : normalizeNumber(goal.etaMonths, 0),
      etaLabel: typeof goal?.etaLabel === 'string' ? goal.etaLabel : undefined
    })) : [],
    monthlySavings: Array.isArray(dashboard.monthlySavings) ? dashboard.monthlySavings.map((item) => ({
      date: typeof item?.date === 'string' ? item.date : '',
      amount: normalizeNumber(item?.amount, 0)
    })).filter((item) => item.date) : [],
    notes: Array.isArray(dashboard.notes) ? dashboard.notes.filter((note) => typeof note === 'string') : []
  };
};

const createFinanceStore = () => {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    return {
      usesDatabase: false,
      async init() {},
      async getDashboard() {
        return parseEnvDashboard();
      },
      async saveDashboard(payload) {
        return normalizeDashboard(payload);
      }
    };
  }

  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });

  return {
    usesDatabase: true,
    async init() {
      await pool.query(`
        create table if not exists finance_dashboard (
          id integer primary key,
          payload jsonb not null,
          updated_at timestamptz not null default now()
        )
      `);
    },
    async getDashboard() {
      const result = await pool.query('select payload from finance_dashboard where id = 1');

      if (result.rows.length === 0) {
        return parseEnvDashboard();
      }

      return normalizeDashboard(result.rows[0].payload);
    },
    async saveDashboard(payload) {
      const normalized = normalizeDashboard(payload);

      await pool.query(
        `
          insert into finance_dashboard (id, payload, updated_at)
          values (1, $1::jsonb, now())
          on conflict (id)
          do update set payload = excluded.payload, updated_at = now()
        `,
        [JSON.stringify(normalized)]
      );

      return normalized;
    }
  };
};

module.exports = {
  createFinanceStore
};
