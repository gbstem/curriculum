import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import CodeBlockModal from '../app/components/CodeBlockModal';

// Mock react-syntax-highlighter to avoid style resolution issues in Jest
jest.mock('react-syntax-highlighter', () => ({
  Prism: function MockSyntaxHighlighter({ children }: any) {
    return <pre data-testid="syntax-highlighter">{children}</pre>;
  },
}));

describe('CodeBlockModal component', () => {
  it('does not render when show is false', () => {
    const { container } = render(
      <CodeBlockModal show={false} onHide={() => {}} onInsert={() => {}} />
    );
    expect(container.querySelector('.modal')).not.toBeInTheDocument();
  });

  it('renders correctly when show is true', () => {
    render(<CodeBlockModal show={true} onHide={() => {}} onInsert={() => {}} />);
    expect(screen.getAllByText('Insert Code Block')).toHaveLength(2); // Header title + button
    expect(screen.getByText('Language')).toBeInTheDocument();
    expect(screen.getByText('Code')).toBeInTheDocument();
  });

  it('enables the insert button when code is typed and calls onInsert', () => {
    const mockOnInsert = jest.fn();
    const mockOnHide = jest.fn();

    render(<CodeBlockModal show={true} onHide={mockOnHide} onInsert={mockOnInsert} />);

    const textarea = screen.getByPlaceholderText(/Enter your Python code here/i);
    const select = screen.getByRole('combobox');
    const insertBtn = screen.getByRole('button', { name: 'Insert Code Block' });

    // Initially disabled
    expect(insertBtn).toBeDisabled();

    // Select language
    fireEvent.change(select, { target: { value: 'javascript' } });

    // Type code
    fireEvent.change(textarea, { target: { value: 'console.log("hello");' } });

    // Now enabled
    expect(insertBtn).toBeEnabled();

    // Check preview is rendered
    expect(screen.getByTestId('syntax-highlighter')).toHaveTextContent('console.log("hello");');

    // Click insert
    fireEvent.click(insertBtn);

    expect(mockOnInsert).toHaveBeenCalledWith('javascript', 'console.log("hello");');
    expect(mockOnHide).toHaveBeenCalled();
  });

  it('calls onHide when cancel button is clicked', () => {
    const mockOnHide = jest.fn();
    render(<CodeBlockModal show={true} onHide={mockOnHide} onInsert={() => {}} />);

    const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelBtn);

    expect(mockOnHide).toHaveBeenCalled();
  });
});
