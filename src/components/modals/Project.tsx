import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { createProject } from "../../services/projects.service";

type Props = {}

const Project = (props: Props) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');

    const dispatch = useDispatch<AppDispatch>();
 
    const handleOpen = () => setOpen(!open);
    const onSubmit = () => {
        dispatch(createProject(name));
    }

  return (
    <Fragment>
      <Button onClick={handleOpen} variant="gradient" className="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>

        New Project
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size="lg"
      >
        <DialogHeader className="text-center">Create a New Project</DialogHeader>
        <DialogBody>
            <div className="text-center lg:px-10">
                <Input onChange={(event) => setName(event.target.value)} name="name" value={name} label="Name" />
            </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" onClick={onSubmit}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  )
}

export default Project