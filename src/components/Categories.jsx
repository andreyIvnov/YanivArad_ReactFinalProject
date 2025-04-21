import { memo } from "react"
import { useSelector } from "react-redux";
import Categoria from "./Categoria";

const Categories = () => {
  const categories = useSelector((state) => state.categories);

  return (
    <>
      {!categories &&
        <h3>Loading categories...</h3>
      }
      {categories && categories.length > 0 &&
        <>
          <h3>Categories</h3>
          {categories.map(cat => {
            return (<>
              <Categoria key={cat.id} categoria={cat} /><br />
            </>)
          })}
        </>
      }
    </>
  )
}

export default memo(Categories)