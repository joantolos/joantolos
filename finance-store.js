const DEFAULT_DASHBOARD = {
  title: 'Savings Dashboard',
  updatedAt: null,
  totalSaved: 0,
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
    totalSaved: normalizeNumber(dashboard.totalSaved, 0),
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
    })).filter((item) => item.date).sort((left, right) => left.date.localeCompare(right.date)) : [],
    notes: Array.isArray(dashboard.notes) ? dashboard.notes.filter((note) => typeof note === 'string') : []
  };
};

const JSONBIN_BASE = 'https://api.jsonbin.io/v3/b';

const createFinanceStore = () => {
  const apiKey = process.env.JSONBIN_API_KEY;
  const binId = process.env.JSONBIN_BIN_ID;

  if (apiKey && binId) {
    const headers = {
      'Content-Type': 'application/json',
      'X-Master-Key': apiKey
    };

    return {
      async init() {},
      async getDashboard() {
        const res = await fetch(`${JSONBIN_BASE}/${binId}/latest`, { headers });
        if (!res.ok) throw new Error(`JSONBin read failed: ${res.status}`);
        const { record } = await res.json();
        return normalizeDashboard(record);
      },
      async saveDashboard(payload) {
        const normalized = normalizeDashboard(payload);
        const res = await fetch(`${JSONBIN_BASE}/${binId}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(normalized)
        });
        if (!res.ok) throw new Error(`JSONBin write failed: ${res.status}`);
        const { record } = await res.json();
        return normalizeDashboard(record);
      }
    };
  }

  // Fallback: read-only from FINANCE_DASHBOARD_JSON env var
  return {
    async init() {},
    async getDashboard() {
      return parseEnvDashboard();
    },
    async saveDashboard(payload) {
      return normalizeDashboard(payload);
    }
  };
};

module.exports = { createFinanceStore };
