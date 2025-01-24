import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CTA from '@/components/CTA';
import { useRouter } from 'next/router';
import userEvent from '@testing-library/user-event';

// Mock the Next.js router for Link components
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('CTA Component', () => {
  let routerPushMock: jest.Mock;

  beforeEach(() => {
    routerPushMock = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: routerPushMock,
    }));
    jest.clearAllMocks();
  });

  it('renders the CTA component without crashing', () => {
    render(<CTA />);
    expect(screen.getByRole('heading', { name: 'Ready to Start Learning?' })).toBeInTheDocument();
    expect(
      screen.getByText('Register now and take the first step towards your goals.')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
  });

  it('contains the correct text in the heading and paragraph', () => {
    render(<CTA />);
    const heading = screen.getByRole('heading', { name: /ready to start learning/i });
    const paragraph = screen.getByText(/register now and take the first step towards your goals/i);
    expect(heading).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
  });

  // it('navigates to the correct link when the button is clicked', async () => {
  //   render(<CTA />);
  //   const Link = screen.getByRole('Link', { name: /register/i });
  //   await userEvent.click(Link);

  //   // Check for navigation
  //   expect(routerPushMock).toHaveBeenCalledWith('/auth');
  // });

  it('applies the correct styles', () => {
    render(<CTA />);
    const section = screen.getByTestId('cta-section');
    const button = screen.getByRole('button', { name: /register/i });

    expect(section).toHaveClass('p-12 bg-[#5A47AB] text-center text-white');
    expect(button).toHaveClass('mt-6 px-6 py-3 bg-[#39229A] text-white rounded-lg hover:bg-blue-700');
  });
});
