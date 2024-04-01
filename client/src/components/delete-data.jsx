import React from "react";
import { Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteData } from "@/redux/dataSlice";

const DeleteData = ({ data }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.data);
  const [open, setOpen] = React.useState(false);

  const handleDelete = async () => {
    try {
      const response = await dispatch(deleteData(data._id));
      if (response.meta.requestStatus === "fulfilled") {
        setOpen(!open);
      } else {
        console.error("Failed to delete data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Trash
          className="text-red-500 cursor-pointer"
          onClick={() => setOpen(true)}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete data</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this data?
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            {isLoading ? (
              <>
                Deleting <Loader2 className="w-4 h-4 ml-2 animate-spin" />
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteData;
