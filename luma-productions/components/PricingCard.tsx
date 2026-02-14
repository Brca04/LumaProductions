interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}

interface PricingCardProps {
  plan: PricingPlan;
}

export default function PricingCard({ plan }: PricingCardProps) {
  return (
    <div
      className={`rounded-lg p-8 ${
        plan.highlighted
          ? 'bg-gray-900 text-white shadow-2xl scale-105'
          : 'bg-white text-gray-900 shadow-lg'
      } transition-transform hover:scale-110 duration-300`}
    >
      <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold">{plan.price}</span>
        <span className={plan.highlighted ? 'text-gray-300' : 'text-gray-600'}>€</span>
      </div>
      <ul className="space-y-3 mb-8">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg
              className={`w-5 h-5 mr-2 mt-0.5 flex-shrink-0 ${
                plan.highlighted ? 'text-green-400' : 'text-green-500'
              }`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      <button
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${
          plan.highlighted
            ? 'bg-white text-gray-900 hover:bg-gray-100'
            : 'bg-gray-900 text-white hover:bg-gray-800'
        }`}
      >
        Kontaktirajte nas
      </button>
    </div>
  );
}
