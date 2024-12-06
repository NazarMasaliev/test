import { useEffect, useState } from "react"
import Header from "./header"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const MainPage: React.FC = () => {
  const [products, setProducts] = useState<any>([])
  let ProductsF = async () => {
    let ProductsData = await axios({
      method: "get",
      url: `https://fakestoreapi.com/products`
    })
    if (ProductsData.status == 200) {
      setProducts(ProductsData.data)
      console.log(ProductsData)
    }
    else {
      setProducts([])
    }
  }
  const [findBlockState, setFindBlockState] = useState<boolean>(false)
  const [findProduct, setFindProduct] = useState<any>([])
  let findProductF = (name: string) => {
    const findProductData = products.filter((i: any) => i.title.toLowerCase().startsWith(name.toLocaleLowerCase()))
    if (findProductData.length > 0) {
      setFindProduct(findProductData)
    }
    if (name.length > 0) {
      setFindBlockState(true)
    }
    else {
      setFindProduct([])
      setFindBlockState(false)
    }
  }


  //icon
  //like
  const [likedIds, setLikedIds] = useState<number[]>([])
  const toggleLike = (id: number) => {
    setLikedIds(prev =>
      prev.includes(id)
        ? prev.filter(likedId => likedId !== id) // Удаляем id, если уже лайкнут
        : [...prev, id]);
  };// Добавляем id, если ещё не лайкнут
  const navigate = useNavigate();
  const ProductInfo = (id: number) => {
    navigate(`/AboutProduct/${id}`)
  }
  //favorite

  const [FavoriteProducts, setFavoriteProducts] = useState<number[]>([])
  const toggleFavorite = (id: number) => {
    setFavoriteProducts((prevFavorites) => {
      if (prevFavorites.includes(id)) {
        return prevFavorites.filter((productId) => productId !== id); // Удалить из избранного
      } else {
        return [...prevFavorites, id]; // Добавить в избранное
      }
    });
  };



  //filter
  const [FilterState, setFilterState] = useState<string>("Все продукты")




  useEffect(() => {
    ProductsF()
  }, [])

  return (
    <div className="MainBlock pb-5">
      <div className="container-fluid pb-5">
        <div className="row p-0">
          <div className="col-12 text-center border-bottom p-3">
            <Header />
          </div>
          <div className="col-12 mt-4 d-flex justify-content-center">
            <div className="FindBlock ms-5">
              <input onChange={(e) => findProductF(String(e.target.value))} type="text" placeholder="Search..." className="form-control" />
            </div>
          </div>
          {/* ResultSearchBlock */}
          {findBlockState ?
            <>
              <div className="col-12 ps-5 pt-3 pb-4 border mt-5 bg-secondary">
                <div className="row">
                  <div className="col-12 text-center pb-3">
                    <h3 className="text-white">
                      Find Result:
                    </h3>
                  </div>
                  {findProduct.map((i: any) =>
                    <div className="col">
                      <div className="card" style={{ width: "15rem" }}>
                        <img src={i.image} className="card-img-top imgCard" alt="..." />
                        <div className="card-body">
                          <div className="product-title mt-2"><h5 className="card-title">{i.title}</h5></div>
                          <button className="btn btn-primary mt-3" onClick={() => ProductInfo(i.id)}> Go somewhere</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
            :
            <>

            </>
          }

          {/* resultFilterblock */}
          <div className="col-12 text-center mt-5">
            <h2 className="text-white">Products</h2>
          </div>
          <div className="col-12 mb-2">
            <div className="FilterBlock ps-4">
              <select onChange={(e) => setFilterState(String(e.target.value))} className="selectBlock form-select" aria-label="Default select example">
                <option value="Все продукты">Все продукты</option>
                <option value="Избранные">Избранные</option>
              </select>
            </div>
          </div>
          {FilterState === "Все продукты" ?
            <>

              <div className="col-12 ps-5">
                <div className="row pt-2 pb-5 border  d-flex" style={{ overflowY: "scroll", height: "430px" }}>
                  <div className="col-12 text-center">
                    <h2 className="text-white">All</h2>
                  </div>
                  {products.map((i: any) =>
                    <>
                      <div className="col-3 mt-4">
                        <div className="card" style={{ width: "16rem" }}>
                          <img src={i.image} className="card-img-top imgCard" alt="..." />
                          <div className="card-body">
                            <div className="product-title">
                              <h5 className="card-title">{i.title}</h5>
                            </div>
                            <div className="product-description mt-2">
                              <p className="card-text">{i.description}.</p>
                            </div>
                            <div className="mt-3">
                              <button className="btn btn-primary" onClick={() => ProductInfo(i.id)}>Go somewhere</button>
                              {likedIds.includes(i.id) ? <i className="fa-solid fa-heart text-danger fa-2xl ms-2" style={{ cursor: "pointer" }} onClick={() => toggleLike(i.id)}></i>
                                :
                                <i className="fa-regular fa-heart fa-2xl ms-2" style={{ cursor: "pointer" }} onClick={() => toggleLike(i.id)}></i>
                              }
                              {FavoriteProducts.includes(i.id) ?
                                <i className="fa-solid fa-star fa-2xl ms-2" onClick={() => toggleFavorite(i.id)}></i>
                                :
                                <i className="fa-regular fa-star fa-2xl ms-2" onClick={() => toggleFavorite(i.id)}></i>
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
            :
            <>
            </>
          }
          {FilterState === "Избранные" ?
            <>
              <div className="col-12 ps-5">
                <div className="row pt-2 pb-5 border  d-flex" style={{ overflowY: "scroll", height: "430px" }}>
                  <div className="col-12 text-center">
                    <h2 className="text-white">Favorite</h2>
                  </div>
                  {products.filter((i:any) => FavoriteProducts.includes(i.id)).map((i:any) => (
                    <div className="col-3 mt-4">
                      <div className="card" style={{ width: "16rem" }}>
                        <img src={i.image} className="card-img-top imgCard" alt="..." />
                        <div className="card-body">
                          <div className="product-title">
                            <h5 className="card-title">{i.title}</h5>
                          </div>
                          <div className="product-description mt-2">
                            <p className="card-text">{i.description}.</p>
                          </div>
                          <div className="mt-3">
                            <a href="#" className="btn btn-primary" onClick={() => ProductInfo(i.id)}>Go somewhere</a>
                            {likedIds.includes(i.id) ? <i className="fa-solid fa-heart text-danger fa-2xl ms-2" style={{ cursor: "pointer" }} onClick={() => toggleLike(i.id)}></i>
                              :
                              <i className="fa-regular fa-heart fa-2xl ms-2" style={{ cursor: "pointer" }} onClick={() => toggleLike(i.id)}></i>
                            }
                            {FavoriteProducts.includes(i.id) ?
                              <i className="fa-solid fa-star fa-2xl ms-2" onClick={() => toggleFavorite(i.id)}></i>
                              :
                              <i className="fa-regular fa-star fa-2xl ms-2" onClick={() => toggleFavorite(i.id)}></i>
                            }
                          </div>
                        </div>
                      </div>
                    </div>

                  ))}


                </div>
              </div>
            </>
            : <></>
          }
        </div>
      </div>
    </div>

  )
}
export default MainPage