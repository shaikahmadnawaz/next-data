import { Settings } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "@/redux/dataSlice";
import { Loader2 } from "lucide-react";

const UpdateData = ({ data }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.data);
  console.log("initialData:", data);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(updateData(formData));
      if (response.meta.requestStatus == "fulfilled") {
        setOpen(!open);
      } else {
        console.error("Failed to update data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Settings className="cursor-pointer" onClick={() => setOpen(true)} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update data</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter name"
              className="col-span-3"
              value={formData?.name}
              onChange={handleChange}
            />
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="Enter phone number"
              className="col-span-3"
              value={formData?.phoneNumber}
              onChange={handleChange}
            />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email"
              className="col-span-3"
              value={formData?.email}
              onChange={handleChange}
            />
            <Input
              id="hobbies"
              name="hobbies"
              type="text"
              placeholder="Enter hobbies"
              className="col-span-3"
              value={formData?.hobbies}
              onChange={handleChange}
            />
          </div>
          <DialogFooter>
            <Button className="w-full font-semibold" type="submit">
              {isLoading ? (
                <>
                  Saving
                  <Loader2 className="w-4 h-4 ml-2 font-semibold animate-spin" />
                </>
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateData;
