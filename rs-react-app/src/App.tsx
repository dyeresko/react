import { useRef } from 'react';
import './App.css';
import Modal from '@components/Modal';
import UncontrolledForm from '@components/UncontrolledForm';

function App() {
  const uncontrolledModal = useRef<HTMLDialogElement>(null);
  const controlledModal = useRef<HTMLDialogElement>(null);

  const showUncontrolledForm = () => {
    uncontrolledModal.current?.showModal();
  };
  const showControlledForm = () => {
    controlledModal.current?.showModal();
  };
  return (
    <>
      <button onClick={showUncontrolledForm}>Uncontrolled form</button>
      <button onClick={showControlledForm}>Controlled form</button>
      <Modal modalDialogRef={uncontrolledModal}>
        <UncontrolledForm />
      </Modal>

      <Modal modalDialogRef={controlledModal}>
        <p>Controlled modal</p>
      </Modal>
    </>
  );
}

export default App;
