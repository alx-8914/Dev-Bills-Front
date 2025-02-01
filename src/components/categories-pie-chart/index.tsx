import { ResponsivePie } from '@nivo/pie';
import { useMemo } from 'react';

import { Expense } from '../../services/api-types';
import { theme } from '../../styles/theme';
import { formatCurrency } from '../../utils/format-currency';

export type CategoryProps = {
  id: string;
  title: string;
  color: string;
};

type ChartData = {
  id: string;
  label: string;
  externalId: string;
  value: number;
  color: string;
};

type CategoriesPieChartProps = {
  onClick: (category: CategoryProps) => void;
  expenses?: Expense[];
};

export function CategoriesPieChart({ onClick, expenses }: CategoriesPieChartProps) {
  const data = useMemo<ChartData[]>(() => {
    if (expenses?.length) {
      const chartData: ChartData[] = expenses.map((item) => ({
        id: item.title,
        label: item.title,
        externalId: item._id,
        value: item.amount,
        color: item.color || "#CCCCCC", // Define cor padrão se não houver
      }));

      console.log("Dados do gráfico:", chartData); // Debug

      return chartData;
    }

    return [];
  }, [expenses]);
  return (
    <ResponsivePie
      onClick={({ data }) =>
        onClick({
          id: data.externalId,
          title: data.id,
          color: data.color,
        })
      }
      data={data}
      enableArcLabels={false}
      enableArcLinkLabels={false}
      colors={[theme.colors.info, theme.colors.primary, theme.colors.error]}
      margin={{ top: 20 }}
      valueFormat={formatCurrency}
      theme={{
        text: {
          fontFamily: 'Lexend',
          fontSize: 10,
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
      legends={[
        {
          anchor: "top-left",
          direction: "column",
          justify: false,
          translateX: 40,
          translateY: 20,
          itemsSpacing: 20,
          itemWidth: 100,
          itemHeight: 20,
          itemTextColor: theme.colors.neutral,
          itemDirection: "left-to-right",
          symbolSize: 12,
          symbolShape: "square",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#FFFFFF",
              },
            },
          ],
        },
      ]}

    />
  );
}