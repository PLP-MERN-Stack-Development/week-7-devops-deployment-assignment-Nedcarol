import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import App from '../../src/App'; // Adjust path if needed
jest.mock('axios');

describe('E2E: Create Post Flow', () => {
  it('should allow a user to fill and submit a post form', async () => {
    // Mock the POST request
    axios.post.mockResolvedValueOnce({
      data: {
        title: 'Test Post',
        content: 'Test content',
      },
    });

    render(<App />);

    // Fill form
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Test Post' },
    });
    fireEvent.change(screen.getByLabelText(/content/i), {
      target: { value: 'Test content' },
    });

    // Submit form
    fireEvent.click(screen.getByText(/submit/i));

    // Assert successful render/output (e.g., post displayed)
    expect(await screen.findByText(/test post/i)).toBeInTheDocument();
  });
});
