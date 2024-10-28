import { CardCategory } from '../components';
import { useCategories } from '../context/CategoriesContext';

const CategoriesListPage = () => {
  const { categoriesData } = useCategories();

  if (!categoriesData) {
    return <div>Loading categories...</div>;
  }

  if (categoriesData.length === 0) {
    return <div>No categories available.</div>;
  }

  return (
    <div className="flex">
      <div className="flex flex-col justify-center items-center">
        <div className="w-full p-4">
          <h1 className="text-3xl font-bold">Categories</h1>
        </div>
        <div className="flex items-center justify-center flex-wrap p-4 gap-4">
          {categoriesData.map((category) => (
            <CardCategory key={category._id} {...category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesListPage;
