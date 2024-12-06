import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Addproducts: React.FC = () => {


  const [title, settitle] = useState<string>("")
  const [price, setProductPrice] = useState<number | undefined>(undefined)
  const [descript, setProductDescript] = useState<string>("")

  let AddProducF = async () => {
    if (!title || !price || !descript) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }
    try {
      let AddProdctData = await axios({
        method: "post",
        url: `https://fakestoreapi.com/carts`,
        data: {
          title: title,
          price: price.toString(),
          image: "https://w.forfun.com/fetch/07/07a5912517ee8e518442ba5631bf417f.jpeg",
          category: "electronics",
          description: descript,
        },
        headers: {
          "Content-Type": 'application/json; charset=utf-8', // Явно указываем формат JSON
        },
      });

      console.log(AddProdctData);
      alert("Продукт добавлен успешно!");
      back()
    } catch (error) {
      console.error("Ошибка при добавлении продукта:", error);
      alert("Не удалось добавить продукт.");
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
            <input className="rounded mt-3" type="text" onChange={(e) => settitle(String(e.target.value))} /><br />title < br />
            <input className="rounded mt-3" type="number" onChange={(e) => setProductPrice(Number(e.target.value))} /><br />price < br />
            <input className="rounded mt-3" type="text" onChange={(e) => setProductDescript(String(e.target.value))} /><br />description < br />
            <button className="btn btn-success mt-3" onClick={AddProducF}>submit</button><br />
          </div>
        </div>

      </div>

    </div>


  )
}
export default Addproducts 