import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Addproducts: React.FC = () => {


  const [title, setTitle] = useState<string>('')
  const [price, setPrice] = useState<number | undefined>(undefined)
  const [description, setdescription] = useState<string>('')

  let AddF = async () => {
    if (!title || !price || !description) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }
    let ProductData = await axios({
      method: 'POST',
      url: `https://api.escuelajs.co/api/v1/products/`,
      data: {
        "title": title,
        "price": price,
        "description": description,
        "categoryId": 1,
        "images": ["https://s1.1zoom.ru/big3/95/347423-svetik.jpg"]
      }
    })

    console.log(ProductData)
    if (ProductData.status = 200) {
      console.log(ProductData)

    }
  }





  const naviagte = useNavigate()
  function back() {
    naviagte(-1)
  }

  return (
    <div className="addProductMainBlock">
      <div className="addProductBlock text-white rounded">
        <div className="row">
          <div className="col-12 ms-3 mt-3">
            <i className="fa-solid fa-xmark fa-2xl backIcon" onClick={back}></i>
          </div>
          <div className="col-12 text-center mt-3">
            <h3>
              New Product
            </h3>
          </div>
          <div className="col-12 mt-4 text-center">

            <input className="rounded" type="text" name="title" id="title" onChange={(e) => setTitle(String(e.target.value))} /><br />title < br />
            <input className="rounded" type="number" name="price" id="price" onChange={(e) => setPrice(Number(e.target.value))} /><br />price < br />
            <input className="rounded" type="text" name="description" id="description" onChange={(e) => setdescription(String(e.target.value))} /><br />description < br />
            <button className="btn btn-success mt-3" onClick={AddF}>submit</button><br />

          </div>
        </div>

      </div>

    </div>


  )
}
export default Addproducts 