import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addData } from "@/redux/dataSlice";
import { FilePlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

const AddData = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.data);

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    hobbies: "",
  });

  const { name, phoneNumber, email, hobbies } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await dispatch(addData(formData));

      console.log("Response from server:", response);

      if (response.meta.requestStatus === "fulfilled") {
        setOpen(!open);

        setFormData({
          name: "",
          phoneNumber: "",
          email: "",
          hobbies: "",
        });
      } else {
        console.error("Failed to add data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="ml-auto" onClick={() => setOpen(true)}>
            <FilePlusIcon className="w-4 h-4 mr-2" /> New
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Data</DialogTitle>
            <DialogDescription>Enter new data details here.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 py-4">
              <div className="grid items-center gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter name"
                  className="col-span-3"
                  value={name}
                  onChange={handleChange}
                />
              </div>

              <div className="grid items-center gap-3">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  placeholder="Enter phone number"
                  className="col-span-3"
                  value={phoneNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="grid items-center gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  className="col-span-3"
                  value={email}
                  onChange={handleChange}
                />
              </div>

              <div className="grid items-center gap-3">
                <Label htmlFor="hobbies">Hobbies</Label>
                <Input
                  id="hobbies"
                  name="hobbies"
                  type="text"
                  placeholder="Enter hobbies"
                  className="col-span-3"
                  value={hobbies}
                  onChange={handleChange}
                />
              </div>
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
    </>
  );
};

export default AddData;
