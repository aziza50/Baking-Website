"use client";
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
import { getAdditionalInfoByUserId, insertAdditionalInfo } from "./actions";
const allergies = ["Dairy", "Nuts", "Gluten", "Eggs", "Soy"] as const;

import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { updateAdditionalInfo } from "./actions";

interface AuthUser {
  id: string;
  email: string;
  created_at: string;
}

interface AdditionalInfo {
  id: number;
  user_id: string;
  display_name: string;
  allergies: string;
  phone_number: string;
}

const Page = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const anchor = useComboboxAnchor();
  /* Fetch additional info for the user */
  const [additionalInfo, setAdditionalInfo] = useState<AdditionalInfo | null>(
    null,
  );

  useEffect(() => {
    const fetchUserById = async () => {
      const supabase = createClient();
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (!authUser) {
        setUser(null);
        return;
      }

      setUser({
        id: authUser.id,
        email: authUser.email || "",
        created_at: authUser.created_at,
      });
    };

    fetchUserById();
  }, []);

  useEffect(() => {
    const fetchAdditionalInfo = async () => {
      if (!user?.id) {
        setAdditionalInfo(null);
        return;
      }

      const response = await getAdditionalInfoByUserId(user.id);
      if (response) {
        setAdditionalInfo(response);
      }
    };

    fetchAdditionalInfo();
  }, [user?.id]);

  const profileItems = [{ id: 1, name: user?.email }];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //check to submit or update additional info!!!
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const allergyValues = formData.getAll("allergies");
    let parsedAllergies = "";
    const allergies = allergyValues.map((item) => {
      const str = String(item);
      parsedAllergies += str.trim() + ",";
      return str.trim();
    });
    const phone_number = formData.get("phone_number") as string;
    const display_name = formData.get("display_name") as string;
    console.log(additionalInfo);
    if (additionalInfo) {
      const updatedInfo: AdditionalInfo = {
        id: additionalInfo.id,
        user_id: String(user?.id || ""),
        display_name: String(display_name || ""),
        allergies: String(parsedAllergies.slice(0, -1)),
        phone_number: String(phone_number || ""),
      };

      try {
        console.log("Updating additional info with payload:", updatedInfo);
        const response = await updateAdditionalInfo(updatedInfo);
        if (response.ok) {
          setAdditionalInfo(updatedInfo);
        } else {
          console.error("Failed to update additional info");
        }
      } catch (error) {
        console.error("Error updating additional info:", error);
      }
    } else {
      const newAdditionalInfo = {
        user_id: String(user?.id || ""),
        display_name: String(display_name || ""),
        allergies: String(parsedAllergies.slice(0, -1)),
        phone_number: String(phone_number || ""),
      };

      // Log for debugging
      console.log("Payload to send:", JSON.stringify(newAdditionalInfo));

      try {
        console.log("Inserting new additional info:", newAdditionalInfo);
        const response = await insertAdditionalInfo(newAdditionalInfo);
        if (response.ok) {
          const refreshedAdditionalInfo = await getAdditionalInfoByUserId(
            user?.id || "",
          );
          setAdditionalInfo(refreshedAdditionalInfo);
        } else {
          console.error("Failed to add additional info");
        }
      } catch (error) {
        console.error("Error adding additional info:", error);
      }
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
                  <DialogTrigger asChild>
                    <Button
                      className={`${dawn.className} text-xl border-[#74070E] justify-center`}
                      variant="magnolia"
                    >
                      Add Additional Info
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-sm">
                    <form onSubmit={handleSubmit}>
                      <DialogHeader>
                        <DialogTitle>Edit Additional Info</DialogTitle>
                        <DialogDescription>
                          Make changes to your additional info here. Click save
                          when you&apos;re done.
                        </DialogDescription>
                      </DialogHeader>
                      <FieldGroup>
                        <Field>
                          <Label htmlFor="display_name">Name</Label>
                          <Input id="display_name" name="display_name" />
                        </Field>
                        <Field>
                          <Label htmlFor="phone-number">Phone Number</Label>
                          <Input
                            id="phone-number"
                            name="phone_number"
                            defaultValue="1234567890"
                            type="tel"
                          />
                        </Field>
                        <Field>
                          <Label htmlFor="allergies-1">Allergies</Label>
                          <Combobox
                            multiple
                            autoHighlight
                            items={allergies}
                            defaultValue={[allergies[0]]}
                            name="allergies"
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
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
