import FeaturedProductsSection from "../components/Home/FeaturedProductsSection"
import Products from "../pages/Products"

const Home = () => {
  return (
    <div>
    <FeaturedProductsSection/>
    <div className="-mt-36 w-full">
    <Products/>
    </div>
    </div>
  )
}

export default Home
