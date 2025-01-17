import React from 'react';
import Link from 'next/link';

const CTA: React.FC = () => {
  return (
    <section id="cta" className="p-12 bg-[#5A47AB] text-center text-white">
      <h2 className="text-3xl font-bold">Ready to Start Learning?</h2>
      <p className="mt-4 font-semibold">Register now and take the first step towards your goals.</p>
      <Link href="/auth">
        <button className="mt-6 px-6 py-3 bg-[#39229A] text-white rounded-lg hover:bg-blue-700">
          Register
        </button>
      </Link>
    </section>
  );
};

export default CTA;
