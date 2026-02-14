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
    <div className="rounded-2xl p-8 bg-white text-gray-900 shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-gray-400 border-2 border-gray-200 flex flex-col h-full">
      <h3 className="text-2xl font-bold mb-4 text-gray-900">{plan.name}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold text-black">{plan.price}</span>
      </div>
      
      {/* Features list with flex-grow to push button to bottom */}
      <ul className="space-y-3 mb-8 flex-grow">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg
              className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-green-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="text-sm text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
    
    </div>
  );
}
