import { type FC, type ReactNode, type RefObject } from 'react';
import { createPortal } from 'react-dom';

const Modal: FC<{
  children: ReactNode;
  modalDialogRef: RefObject<HTMLDialogElement | null>;
}> = ({ children, modalDialogRef }) => {
  const handleCloseModal = () => {
    modalDialogRef.current?.close();
  };

  const closeOnOutsideClick = (
    e: React.MouseEvent<HTMLDialogElement, MouseEvent>
  ) => {
    const dialogDimensions = modalDialogRef.current?.getBoundingClientRect();
    if (
      dialogDimensions &&
      (e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom)
    ) {
      modalDialogRef.current?.close();
    }
  };

  return createPortal(
    <dialog
      data-testid="dialog"
      className="dialog"
      onClick={(e) => closeOnOutsideClick(e)}
      ref={modalDialogRef}
    >
      <div className="p-5 border">
        <button className="cursor-pointer" onClick={handleCloseModal}>
          Close
        </button>
        {children}
      </div>
    </dialog>,
    document.body
  );
};

export default Modal;
