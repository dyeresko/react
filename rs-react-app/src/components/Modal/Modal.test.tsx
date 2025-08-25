import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Modal from '@/components/Modal';
import { useRef, type FC } from 'react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';

const TestingModal: FC = () => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleOpenClick = () => modalRef.current?.showModal();

  return (
    <>
      <div data-testid="outside"></div>
      <button onClick={handleOpenClick}>Open</button>
      <Modal modalDialogRef={modalRef}>
        <div>Modal content</div>
      </Modal>
    </>
  );
};

describe('Modal', () => {
  it('modal renders in body', async () => {
    render(<TestingModal />);
    const modal = await screen.findByTestId('dialog');
    expect(modal.parentElement).toBe(document.body);
  });
  it("doesn't render on initial state", () => {
    render(<TestingModal />);
    expect(screen.getByText('Modal content')).not.toBeVisible();
  });
  it('opens modal', async () => {
    render(<TestingModal />);
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));

    await waitFor(() => {
      expect((screen.queryByRole('dialog') as HTMLDialogElement).open).toBe(
        true
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Modal content')).toBeVisible();
    });
  });
  it('closes modal', async () => {
    render(<TestingModal />);
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));

    await waitFor(() => {
      expect((screen.queryByRole('dialog') as HTMLDialogElement).open).toBe(
        true
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Modal content')).toBeVisible();
    });

    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    await waitFor(() => {
      expect(screen.getByText('Modal content')).not.toBeVisible();
    });
  });
  it('focuses interactive element', async () => {
    render(<TestingModal />);

    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    await waitFor(() => {
      expect((screen.queryByRole('dialog') as HTMLDialogElement).open).toBe(
        true
      );
    });
    await userEvent.keyboard('{Tab}');
    expect(screen.getByRole('button', { name: 'Close' })).toHaveFocus();
  });
});
