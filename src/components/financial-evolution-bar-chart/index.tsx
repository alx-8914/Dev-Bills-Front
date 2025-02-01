import { ResponsiveBar } from '@nivo/bar';
import dayjs from 'dayjs';
import ptBRLocale from 'dayjs/locale/pt-br';
import { useMemo } from 'react';

import { FinancialEvolution } from '../../services/api-types';
import { theme } from '../../styles/theme';
import { formatCurrency } from '../../utils/format-currency';

dayjs.locale(ptBRLocale);

type ChartData = {
  month: string;
  Saldo: number;
  Receitas: number;
  Gastos: number;
};

type FinancialEvolutionBarChartProps = {
  financialEvolution?: FinancialEvolution[];
};

export function FinancialEvolutionBarChart({
  financialEvolution = [], // Define um valor padrão vazio
}: FinancialEvolutionBarChartProps) {
  // Certifica que financialEvolution é válido antes de criar os dados
  const data = useMemo<ChartData[]>(() => {
    if (Array.isArray(financialEvolution) && financialEvolution.length > 0) {
      return financialEvolution.map((item) => {
        const [year, month] = item._id;

        return {
          month: dayjs(`${year}-${month}-01`).format('MMM'),
          Saldo: item.balance,
          Receitas: item.incomes,
          Gastos: item.expenses,
        };
      });
    }

    return []; // Retorna um array vazio se não houver dados
  }, [financialEvolution]);

  // Exibe uma mensagem se não houver dados
  if (data.length === 0) {
    return <p>Não há dados para exibir no gráfico de evolução financeira.</p>;
  }

  return (
    <ResponsiveBar
      data={data}
      keys={['Saldo', 'Receitas', 'Gastos']}
      colors={[theme.colors.info, theme.colors.primary, theme.colors.error]}
      indexBy={'month'}
      groupMode="grouped"
      enableLabel={false}
      enableGridY={false}
      padding={0.2}
      axisLeft={{
        tickSize: 0,
        format: formatCurrency,
      }}
      margin={{ left: 80, bottom: 28 }}
      theme={{
        text: {
          fontFamily: 'Lexend',
          fontSize: 10,
        },
        axis: {
          ticks: {
            text: {
              fill: theme.colors.white,
            },
          },
        },
        tooltip: {
          container: {
            backgroundColor: theme.colors.black,
            padding: 16,
            color: theme.colors.white,
            fontFamily: 'Lexend',
            fontSize: 12,
            borderRadius: 4,
          },
        },
      }}
      valueFormat={formatCurrency}
    />
  );
}
