import { render, screen, fireEvent } from '@testing-library/react'
import Home from "@/app/page";

describe('Home', function () {
    it('renders Get started paragraph', () => {
        render(<Home />)

        const paragraph = screen.getByText(/get started by editing/i)

        expect(paragraph).toBeInTheDocument();
    })

    it('has a link to the NextJS docs', () => {
        render(<Home />)

        const docsLink = screen.getByRole('link', { name: /Documentation/i });
        expect(docsLink).toHaveAttribute('href', 'https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app');
        expect(docsLink).toHaveAttribute('target', '_blank');
        expect(docsLink).toHaveAttribute('rel', 'noopener noreferrer');
    })
});
