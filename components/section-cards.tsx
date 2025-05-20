// SectionCards.tsx
import {
  IconTrendingDown,
  IconTrendingUp
} from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CardMetric } from "@/types"

type SectionCardsProps = {
  metrics: CardMetric[]
}

export function SectionCards({ metrics }: SectionCardsProps) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {metrics.map((metric, idx) => {
        const TrendIcon = metric.trend === "up" ? IconTrendingUp : IconTrendingDown;
        return (
          <Card key={idx} className="@container/card">
            <CardHeader>
              <CardDescription>{metric.title}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {metric.value}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <TrendIcon />
                  {metric.trend === "up" ? "+" : "-"}
                  {metric.trendValue}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                {metric.description} <TrendIcon className="size-4" />
              </div>
              <div className="text-muted-foreground">{metric.subtext}</div>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
