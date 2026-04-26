import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "radix-ui";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { josefin } from "@/styles/fonts";
import { removeFromCart } from "@/app/checkout/process/actions";
import { menu } from "framer-motion/client";
import { toast } from "sonner";
interface MenuItemProps {
  product_name: string;
  product_image_url: string | null;
  product_size: string;
  product_price: number;
  quantity: number;
  cart_id: number;
  menu_id: number;
  variant_quantity: number;
  variant_count: number;
  variant_id: number;
}

const MenuItem = ({ menuItemInfo }: { menuItemInfo: MenuItemProps }) => {
  const baseUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;
  async function handleRemoveFromCart() {
    const response = await removeFromCart(
      menuItemInfo.cart_id,
      menuItemInfo.menu_id,
      menuItemInfo.variant_id,
      menuItemInfo.quantity,
    );
    if (!response.ok) {
      toast.error("Failed to remove item from cart");
    } else {
      toast.success("Item removed from cart");
    }
    //need to refresh the page to update the cart items, will implement better state management later
    window.location.reload();
  }
  return (
    <div className="flex flex-row items-start gap-6">
      <Image
        src={
          menuItemInfo.product_image_url
            ? baseUrl + menuItemInfo.product_image_url
            : "https://folioimagess.s3.us-east-1.amazonaws.com/public/good13.jpg"
        }
        alt={menuItemInfo.product_name}
        width={180}
        height={180}
        className="rounded-lg"
      />
      <div className="flex text-[15px] text-[#74070E] flex-col items-start gap-5">
        <div className="flex flex-row gap-70 items-center">
          <h2 className="text-[20px] font-medium">
            {menuItemInfo.product_name}
          </h2>
          <h3
            onClick={handleRemoveFromCart}
            className="text-[15px] underline cursor-pointer"
          >
            Remove
          </h3>
        </div>
        <div className="flex flex-row gap-8 items-center">
          <p>
            {menuItemInfo.product_size === "unit"
              ? `Count: ${menuItemInfo.variant_count}`
              : `Size: ${menuItemInfo.product_size}`}
          </p>
          <p>${menuItemInfo.product_price.toFixed(2)}</p>
        </div>
        <p>{`Quantity: ${menuItemInfo.quantity}`}</p>
        {/* <Select>
          <SelectTrigger className={`w-30 border-none`}>
            <SelectValue
              className={`text-[#74070E] ${josefin.className}`}
              placeholder={`Quantity ${menuItemInfo.quantity}`}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Quantity</SelectLabel>
              {Array.from(
                { length: menuItemInfo.variant_quantity },
                (_, i) => i + 1,
              ).map((qty) => (
                <SelectItem key={qty} value={qty.toString()}>
                  Quantity {qty}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select> */}
      </div>
    </div>
  );
};

export default MenuItem;
