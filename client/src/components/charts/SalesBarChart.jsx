import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: '8px', padding: '10px 14px',
    }}>
      <p style={{ color: 'var(--text-muted)', fontSize: 11, marginBottom: 6 }}>{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color, fontSize: 13, fontWeight: 600 }}>
          {p.name}: {p.value?.toLocaleString()} units
        </p>
      ))}
    </div>
  );
};

const GRADIENT_COLORS = [
  '#6366f1', '#7c73f3', '#8b82f5', '#9a91f7',
  '#a99ff8', '#b8aef9', '#c7bcfa', '#d5cbfb',
  '#6366f1', '#7c73f3', '#8b82f5', '#9a91f7',
];

const SalesBarChart = ({ data }) => {
  if (!data?.length) return <div className="loading-wrapper"><div className="spinner" /><p className="loading-text">Loading…</p></div>;

  const chartData = data.map((d) => ({
    month: d.month,
    'Units Sold': d.units,
    Returns: d.returns,
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
          axisLine={false} tickLine={false}
        />
        <YAxis
          tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
          axisLine={false} tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,0.06)' }} />
        <Legend
          wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
          formatter={(v) => <span style={{ color: 'var(--text-secondary)' }}>{v}</span>}
        />
        <Bar dataKey="Units Sold" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={30}>
          {chartData.map((_, i) => (
            <Cell key={i} fill={GRADIENT_COLORS[i % GRADIENT_COLORS.length]} />
          ))}
        </Bar>
        <Bar dataKey="Returns" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={30} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SalesBarChart;
