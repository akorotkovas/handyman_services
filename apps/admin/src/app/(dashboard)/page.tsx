import { prisma } from "@meistrai/db";
import {
  Users,
  HardHat,
  CalendarCheck,
  CreditCard,
  AlertTriangle,
  Star,
} from "lucide-react";

async function getStats() {
  const [users, tradespeople, bookings, disputes] = await Promise.all([
    prisma.user.count(),
    prisma.tradespersonProfile.count(),
    prisma.booking.count(),
    prisma.dispute.count({ where: { status: "OPEN" } }),
  ]);

  return { users, tradespeople, bookings, disputes };
}

export default async function AdminDashboard() {
  let stats = { users: 0, tradespeople: 0, bookings: 0, disputes: 0 };

  try {
    stats = await getStats();
  } catch {
    // DB not available yet — show zeros
  }

  const cards = [
    {
      label: "Vartotojai",
      value: stats.users,
      icon: Users,
      color: "text-blue-500 bg-blue-50",
    },
    {
      label: "Meistrai",
      value: stats.tradespeople,
      icon: HardHat,
      color: "text-green-500 bg-green-50",
    },
    {
      label: "Užsakymai",
      value: stats.bookings,
      icon: CalendarCheck,
      color: "text-purple-500 bg-purple-50",
    },
    {
      label: "Atviri ginčai",
      value: stats.disputes,
      icon: AlertTriangle,
      color: "text-red-500 bg-red-50",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Valdymo skydas</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-500">
                  {card.label}
                </span>
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.color}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-bold">{card.value}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Naujausi veiksmai</h2>
        <p className="text-sm text-gray-500">
          Veiksmų žurnalas bus rodomas čia kai platforma bus aktyvi.
        </p>
      </div>
    </div>
  );
}
