import { Category, Food } from "@/types";
import SingleMenu from "./SingleMenu";
interface CategoryProps {
  categories: Category[];
  foods: Food[];
  fetchAllData: () => void;
}
export const AdminMenu = ({
  categories,
  foods,
  fetchAllData,
}: CategoryProps) => {
  return (
    <div className="rounded-xl bg-white transition-all duration-300 ease-in-out">
      {categories &&
        categories.map((category, index) => {
          return (
            <SingleMenu
              category={category}
              key={index}
              foods={foods}
              fetchAllData={fetchAllData}
            />
          );
        })}
    </div>
  );
};

export default AdminMenu;
