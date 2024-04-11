import { Modal } from 'flowbite-react';
import { toast } from 'react-toastify';
import { Input, Button } from '../common';
import { createTicket } from '../../services';

const TicketModal = ({ show, setShow, refresh = () => { } }) => {
  const onSubmit = async (e) => {
    e.preventDefault()
    await createTicket({
      title: e.target.title.value,
      description: e.target.description.value
    }).then((res) => {
      if (res.success) {
        toast.success('Ticket created successfully');
      }
    });
    setShow(false);
    refresh();
  };

  return (
    <Modal
      show={show}
      size="2xl"
      onClose={() => setShow(false)}
    >
      <form onSubmit={onSubmit}>
        <Modal.Header color="white">Create Ticket</Modal.Header>
        <Modal.Body>
          <div class="flex flex-col mb-4">
            <Input placeholder="Title" name="title" label className="h-12 sm:h-14" required />
            <Input placeholder="Description" name="description" label className="h-12 sm:h-14" required />
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button className="py-2 px-5" type="submit">
            Create
          </Button>
          <Button
            className="py-2 px-5 bg-red-500 hover:bg-red-600"
            onClick={() => setShow(false)}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default TicketModal;
