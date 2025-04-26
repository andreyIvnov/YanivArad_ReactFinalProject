import { memo } from "react"
import { useSelector } from "react-redux";
import Category from "../Categories/Category";
import AddNewCategory from "../Categories/AddNewCategory";

const Categories = () => {
  const categories = useSelector((state) => state.categories);

  return (
    <>
      {!categories &&
        <div style={{ textAlign: 'left', backgroundColor: 'lightgray', padding: '8px 0 0 20px' }}>
          <h3>Loading categories...</h3>
        </div>
      }
      {categories && categories.length > 0 &&
        <>
          <div style={{ textAlign: 'left', backgroundColor: 'lightgray', padding: '8px 0 0 20px' }}>
            <h3>Categories</h3>
            {categories.map(cat => {
              return (
                <Category key={cat.id} category={cat} />
              )
            })}
            <AddNewCategory/>
          </div>
        </>
      }
    </>
  )
}

export default memo(Categories)