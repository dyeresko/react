import { useRef, useState } from 'react';
import './App.css';
import Modal from '@components/Modal';
import UncontrolledForm from '@components/UncontrolledForm';
import ControlledForm from '@components/ControlledForm';
import { useAppSelector } from '@/hooks/hooks';

function App() {
  const uncontrolledModal = useRef<HTMLDialogElement>(null);
  const controlledModal = useRef<HTMLDialogElement>(null);
  const [isControlledBordered, setIsControlledBordered] = useState(false);
  const [isUncontrolledBordered, setIsUncontrolledBordered] = useState(false);
  const uncontrolledFormData = useAppSelector(
    (state) => state.forms.uncontrolledFormData
  );
  const controlledFormData = useAppSelector(
    (state) => state.forms.controlledFormData
  );

  const closeUncontrolledModal = () => {
    uncontrolledModal.current?.close();
    setIsUncontrolledBordered(true);
    setTimeout(() => setIsUncontrolledBordered(false), 1000);
  };

  const closeControlledModal = () => {
    controlledModal.current?.close();
    setIsControlledBordered(true);
    setTimeout(() => setIsControlledBordered(false), 1000);
  };

  const showUncontrolledForm = () => {
    uncontrolledModal.current?.showModal();
  };
  const showControlledForm = () => {
    controlledModal.current?.showModal();
  };
  return (
    <>
      <button className="cursor-pointer" onClick={showUncontrolledForm}>
        Uncontrolled form
      </button>
      <button className="cursor-pointer" onClick={showControlledForm}>
        Controlled form
      </button>

      <div className="flex gap-10 p-10">
        {uncontrolledFormData.accept ? (
          <ul
            className={`flex justify-center flex-col items-center ${isUncontrolledBordered ? 'border-4 border-green-500' : ''}`}
          >
            <li>
              <img
                width={200}
                height={200}
                src={uncontrolledFormData.picture}
              ></img>
            </li>
            <li>{uncontrolledFormData.name}</li>
            <li>{uncontrolledFormData.age}</li>
            <li>{uncontrolledFormData.email}</li>
            <li>{uncontrolledFormData.gender}</li>
            <li>{uncontrolledFormData.country}</li>
          </ul>
        ) : null}
        {controlledFormData.accept ? (
          <ul
            className={`flex justify-center flex-col items-center ${isControlledBordered ? 'border-4 border-green-500' : ''}`}
          >
            <li>
              <img
                width={200}
                height={200}
                src={controlledFormData.picture}
              ></img>
            </li>
            <li>{controlledFormData.name}</li>
            <li>{controlledFormData.age}</li>
            <li>{controlledFormData.email}</li>
            <li>{controlledFormData.gender}</li>
            <li>{controlledFormData.country}</li>
          </ul>
        ) : null}
      </div>

      <Modal modalDialogRef={uncontrolledModal}>
        <UncontrolledForm onSuccess={closeUncontrolledModal} />
      </Modal>

      <Modal modalDialogRef={controlledModal}>
        <ControlledForm onSuccess={closeControlledModal} />
      </Modal>
    </>
  );
}

export default App;
