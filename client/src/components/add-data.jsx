"use client";
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
import { FilePlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const AddData = () => {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    hobbies: "",
  });

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
      const response = await fetch(`http://localhost:5000/api/v1/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Response from server:", response);

      if (response.ok) {
        setOpen(false);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
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
                  value={formData.name}
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
                  value={formData.phoneNumber}
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
                  value={formData.email}
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
                  value={formData.hobbies}
                  onChange={handleChange}
                />
              </div>
            </div>

            <DialogFooter>
              <Button className="w-full font-semibold" type="submit">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddData;
