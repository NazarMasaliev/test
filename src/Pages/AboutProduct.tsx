import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./header";

const AboutProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  interface ProductInfo {
    id: number;
    title: string;
    price: number;
    description: string;
    category: {
      id:string;
      name:string;
      image:string;
    }
    images: string;
    rating: {
      count: number;
      rate: number;
    }
  }


  const [product, setProduct] = useState<ProductInfo>();
  let ProductF = async () => {
    let ProductData = await axios({
      method: 'get',
      url: `https://api.escuelajs.co/api/v1/products/${id}`,
    })
    console.log(ProductData)
    if (ProductData.status = 200) {
      setProduct(ProductData.data)
    }
  }
  const navigate = useNavigate()
  // UseEffect
  function back() {
    navigate(-1)
  }
  useEffect(() => {
    ProductF();
  }, [])
  return (
    <div className="container-fluid">
      {product != null ?
        <>
          <div className="row">
            <div className="col-12">
              <div className="Header text-center">
                <button className="btn btn-dark border m-2" onClick={back}>
                  Back
                </button>
              </div>
            </div>
            <div className="col-12 border text-white" style={{ height: "600px" }}>
              <div className="row">
                <div className="col-6">
                  <div style={{ width: "100%", height: "800px" }} >
                    <div className="border rounded" style={{ float: "right", width: "70%", height: "350px", marginTop: "120px", background: "#2E2E2E" }}>
                      <div className="border d-flex" style={{ float: "left", width: "80%", height: "80%", margin: "30px 50px", overflowX: "scroll" }}>
                        <div style={{ flex: "0 0 auto", width: "100%", height: "100%", backgroundImage: `url("${product.images}")`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div style={{ width: "100%", height: "600px" }}>
                    <div className="border rounded" style={{ float: "left", width: "70%", height: "350px", marginTop: "120px", background: "#2E2E2E", padding: "20px" }}>
                      <div className="row">
                        <div className="col-12" style={{ height: "40px" }}>
                          <h4>{product.title}</h4>
                        </div>
                        <div className="col-12 mt-4" style={{ fontSize: "14px", height: "20px" }}>
                          Category: {product.category.name}
                        </div>
                        <div className="col-12 mt-3 " style={{ height: "inherit" }}>
                          <p style={{ fontSize: "14px" }}>
                            {product.description}
                          </p>
                        </div>
                        <div className="col-12 " style={{ height: "40px" }}>
                          <div className="row">
                            <div className="col-6 text-center">
                              <b style={{ fontSize: "20px" }}>${product.price}</b>
                            </div>
                            <div className="col-6" style={{ textAlign: "right" }}>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
        :
        <>
        </>
      }

    </div>
  )
}
export default AboutProduct