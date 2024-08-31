"use client";

import { GetBalanceStatsResponseType } from "@/app/api/stats/balance/route";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import { Card } from "@/components/ui/card";
import { DateToUTCDate, GetFormatterForWeight } from "@/lib/helpers";
import { UserSettings } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import React, { ReactNode, useCallback, useMemo } from "react";
import CountUp from "react-countup";

interface Props {
  from: Date;
  to: Date;
  userSettings: UserSettings;
}

function StatsCards({ from, to, userSettings }: Props) {
  const statsQuery = useQuery<GetBalanceStatsResponseType>({
    queryKey: ["overview", "stats", from, to],
    queryFn: () =>
      fetch(
        `/api/stats/balance?from=${DateToUTCDate(from)}&to=${DateToUTCDate(to)}`
      ).then((res) => res.json()),
  });

  // const formatter = useMemo(() => {
  //   return GetFormatterForWeight(userSettings.weight);
  // }, [userSettings.weight]);
//Transaction balance
  // const order = statsQuery.data?.order || 0;
  // const returns = statsQuery.data?.returns || 0;
  // const balance = order - returns;
  const balance = statsQuery.data?.balance || 0;

  return (
    <div className="relative flex w-full flex-wrap gap-2 md:flex-nowrap">
      {/* <SkeletonWrapper isLoading={statsQuery.isFetching}>
        <StatCard
          // formatter={formatter}
          value={order}
          title="Orders"
          icon={
            <TrendingUp className="h-12 w-12 items-center rounded-lg p-2 text-emerald-500 bg-emerald-400/10" />
          }
        />
      </SkeletonWrapper>

      <SkeletonWrapper isLoading={statsQuery.isFetching}>
        <StatCard
          // formatter={formatter}
          value={returns}
          title="Returns"
          icon={
            <TrendingDown className="h-12 w-12 items-center rounded-lg p-2 text-red-500 bg-red-400/10" />
          }
        />
      </SkeletonWrapper> */}

      <SkeletonWrapper isLoading={statsQuery.isFetching}>
        <StatCard
          // formatter={formatter}
          value={balance}
          title="Inventory Balance"
          icon={
            <Wallet className="h-12 w-12 items-center rounded-lg p-2 text-violet-500 bg-violet-400/10" />
          }
        />
      </SkeletonWrapper>
    </div>
  );
}

export default StatsCards;

function StatCard({
  // formatter,
  value,
  title,
  icon,
}: {
  // formatter: Intl.NumberFormat;
  icon: ReactNode;
  title: String;
  value: number;
}) {
  // const formatFn = useCallback(
  //   (value: number) => {
  //     return formatter.format(value);
  //   },
  //   [formatter]
  // );

  return (
    <Card className="flex h-24 w-full items-center gap-2 p-4">
      {icon}
      <div className="flex flex-col items-start gap-0">
        <p className="text-muted-foreground">{title}</p>
        <CountUp
          preserveValue
          redraw={false}
          end={value}
          decimals={2}
          // formattingFn={formatFn}
          className="text-2xl"
        />
      </div>
    </Card>
  );
}