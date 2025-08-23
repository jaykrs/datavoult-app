import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { getTopProducts } from "../fetch";

interface Product {
  id: number;
  title: string;
  content: string;
  vendor: string;
  type: string;
  origin: string;
  price: number;
  tax: number;
  discout: number;
  assets: string;
}


export async function TopProducts() {
 const _res = await fetch("http://localhost:3000/api/products?tag=vps");
const res = await _res.json();
const data: Product[] = res.products;
 // const data = await getTopProducts();

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5">
        <h2 className="text-2xl font-bold text-dark dark:text-white">
          Top Products
        </h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
            <TableHead className="min-w-[120px] pl-5 sm:pl-6 xl:pl-7.5">
              Product Name
            </TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Sold</TableHead>
            <TableHead className="pr-5 text-right sm:pr-6 xl:pr-7.5">
              Profit
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((product) => (
            <TableRow
              className="text-base font-medium text-dark dark:text-white"
              key={product.id + product.title}
            >
              <TableCell className="flex min-w-fit items-center gap-3 pl-5 sm:pl-6 xl:pl-7.5">
                <Image
                  src={product.assets}
                  className="aspect-[6/5] w-15 rounded-[5px] object-cover"
                  width={60}
                  height={50}
                  alt={"Image for product " + product.title}
                  role="presentation"
                />
                <div>{product.title}</div>
              </TableCell>

              <TableCell>{product.tax}</TableCell>

              <TableCell>${product.price}</TableCell>

              <TableCell>{product.origin}</TableCell>

              <TableCell className="pr-5 text-right text-green-light-1 sm:pr-6 xl:pr-7.5">
                ${product.origin}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
