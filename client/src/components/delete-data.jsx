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

const DeleteData = ({ data }) => {
  const [open, setOpen] = React.useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/data/${data._id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log("Data deleted successfully.");
      } else {
        console.error("Failed to delete data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setOpen(false);
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
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteData;
