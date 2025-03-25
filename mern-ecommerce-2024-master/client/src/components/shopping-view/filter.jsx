import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
      <div className="pb-4 border-b border-gray-300 dark:border-gray-700">
        <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">Filters</h2>
      </div>
      <div className="pt-4 space-y-6">
        {Object.keys(filterOptions).map((keyItem, index) => (
          <Fragment key={index}>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300">{keyItem}</h3>
              <div className="grid gap-3 mt-3">
                {filterOptions[keyItem].map((option) => (
                  <Label key={option.id} className="flex items-center gap-3 text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                    <Checkbox
                      className="h-5 w-5 border-gray-400 dark:border-gray-600 text-primary-500"
                      checked={
                        filters &&
                        filters[keyItem] &&
                        filters[keyItem].includes(option.id)
                      }
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator className="border-gray-300 dark:border-gray-700" />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
