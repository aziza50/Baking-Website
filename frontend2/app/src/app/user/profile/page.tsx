"use client";
import GetUserInfo from "@/components/get_user_info";
import { Button } from "@/components/ui/button";
import { dawn, crimson } from "@/styles/fonts";
import { useEffect, useState } from "react";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";

const allergies = ["Dairy", "Nuts", "Gluten", "Eggs", "Soy"] as const;

import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form } from "lucide-react";

interface UserAdditionalInfo {
  id: BinaryType;
  user_id: string;
  allergies: string;
  phone_number: string;
}

const page = () => {
  const userInfo = GetUserInfo();
  const anchor = useComboboxAnchor();
  const [additionalInfo, setAdditionalInfo] =
    useState<UserAdditionalInfo | null>(null);
  const profileItems = [{ id: 1, name: userInfo?.display_name }];
  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await fetch("/api/users/get-user-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userInfo?.id }),
      });
      try {
        const data = await response.json();
        setAdditionalInfo(data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchUserInfo();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const allergies = formData.getAll("allergies") as string[];
    const phone_number = formData.get("phone_number") as string;
    const newAdditionalInfo: UserAdditionalInfo = {
      id: crypto.randomUUID() as unknown as BinaryType,
      user_id: userInfo?.id || "",
      allergies: allergies.join(","),
      phone_number,
    };
    try {
      const response = await fetch("/api/users/add-additional-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAdditionalInfo),
      });
      if (response.ok) {
        setAdditionalInfo(newAdditionalInfo);
      } else {
        console.error("Failed to add additional info");
      }
    } catch (error) {
      console.error("Error adding additional info:", error);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center w-fill h-screen">
      <div className="flex flex-col items-center gap-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-22 sm:gap-25 md:gap-25 lg:gap-15 xl:gap-20 w-full lg:w-auto">
          {profileItems.map((item, index) => (
            <div
              key={index}
              className="relative w-70 sm:w-60 md:w-64 lg:w-72 aspect-square flex items-center justify-center hover:scale-105 transition-transform duration-300 mx-auto sm:mx-0"
            >
              <img
                src="/images/cake.png"
                alt="image"
                className="w-full h-full object-cover rounded-full"
              />
              <svg viewBox="0 0 300 300" className="absolute w-100 h-100">
                <defs>
                  <path
                    id={`circlePath-${item.id}`}
                    d="M 150, 150 m -115, 0 a 115,115 0 1,1 230,0 a 115,115 0 1,1 -230,0"
                    fill="none"
                  />
                </defs>
                <text
                  fill="#74070E"
                  fontSize="32"
                  className={` text-4xl ${dawn.className}`}
                >
                  <textPath href={`#circlePath-${item.id}`} startOffset="20%">
                    {item.name}
                  </textPath>
                </text>
              </svg>
            </div>
          ))}
        </div>
        <div>
          <h3 className={`${crimson.className} text-[#74070E] text-3xl`}>
            Additional Info
          </h3>
          <div className="flex flex-col items-center">
            {additionalInfo ? (
              <div
                className={`flex flex-col items-start gap-2 text-[#74070E] ${crimson.className} text-xl`}
              >
                <p>Allergies: {additionalInfo.allergies}</p>
                <p>Phone Number: {additionalInfo.phone_number}</p>
              </div>
            ) : (
              <div
                className={`flex flex-col items-center text-start gap-4 ${crimson.className} text-xl`}
              >
                <p>No additional info found. Consider adding one below</p>
                <Dialog>
                  <form onSubmit={handleSubmit}>
                    <DialogTrigger asChild>
                      <Button
                        className={`${dawn.className} text-xl border-[#74070E] justify-center`}
                        variant="magnolia"
                      >
                        Add Additional Info
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-sm">
                      <DialogHeader>
                        <DialogTitle>Edit Additional Info</DialogTitle>
                        <DialogDescription>
                          Make changes to your additional info here. Click save
                          when you&apos;re done.
                        </DialogDescription>
                      </DialogHeader>
                      <FieldGroup>
                        <Field>
                          <Label htmlFor="name-1">Phone Number</Label>
                          <Input
                            id="phone-number"
                            name="phone_number"
                            defaultValue="1234567890"
                            type="number"
                          />
                        </Field>
                        <Field>
                          <Label htmlFor="allergies-1">Allergies</Label>
                          <Combobox
                            multiple
                            autoHighlight
                            items={allergies}
                            defaultValue={[allergies[0]]}
                          >
                            <ComboboxChips
                              ref={anchor}
                              className="w-full max-w-xs"
                            >
                              <ComboboxValue>
                                {(values) => (
                                  <React.Fragment>
                                    {values.map((value: string) => (
                                      <ComboboxChip key={value}>
                                        {value}
                                      </ComboboxChip>
                                    ))}
                                    <ComboboxChipsInput />
                                  </React.Fragment>
                                )}
                              </ComboboxValue>
                            </ComboboxChips>
                            <ComboboxContent anchor={anchor}>
                              <ComboboxEmpty>No items found.</ComboboxEmpty>
                              <ComboboxList>
                                {(item) => (
                                  <ComboboxItem key={item} value={item}>
                                    {item}
                                  </ComboboxItem>
                                )}
                              </ComboboxList>
                            </ComboboxContent>
                          </Combobox>
                        </Field>
                      </FieldGroup>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </form>
                </Dialog>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default page;
