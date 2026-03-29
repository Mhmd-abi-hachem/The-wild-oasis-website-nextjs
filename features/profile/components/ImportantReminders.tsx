import {
  ClockIcon,
  IdentificationIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";

const reminders = [
  {
    label: "Bring a valid ID at check-in",
    icon: <IdentificationIcon className="size-4 text-primary-500" />,
  },
  {
    label: "Quiet hours after 10 PM",
    icon: <ClockIcon className="size-4 text-primary-500" />,
  },
  {
    label: "No smoking inside the cabin",
    icon: <XCircleIcon className="size-4 text-primary-500" />,
  },
];

export default function ImportantReminders() {
  return (
    <div className="border border-primary-800">
      <div className="divide-y divide-primary-800">
        {reminders.map((reminder, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5">
                {reminder.icon}
              </div>
              <span className="text-sm font-light text-primary-100 mt-0.5 sm:mt-1">
                {reminder.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
