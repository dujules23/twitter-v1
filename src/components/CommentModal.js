import { useRecoilState } from "recoil";
import { modalState } from "../../atom/modalAtom";
import Modal from "react-modal";

export default function CommentModal() {
  const [open, setOpen] = useRecoilState(modalState);
  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          className="max-w-lg w-[90%] h-[300px] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray- 400 rounded-xl shadow-md"
        >
          <h1>Comment Modal</h1>
        </Modal>
      )}
    </div>
  );
}
