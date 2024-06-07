import Selection from "../Components/Selection";
import Order from "../Components/Order";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApi } from "../Context/Context";

export default function POS() {
  const { setTempOrderArray, setOrderArray, setErrMsg, errMsg } = useApi();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/api/getOrder/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            // console.log(data);
            setTempOrderArray({
              items: data.data.items,
              quantity: data.data.quantity,
              notes: data.data.notes,
              discount: data.data.discount,
              orderType: data.data.orderType,
              readystatus: data.data.readystatus,
            });
          }
        })
        .catch((err) => setErrMsg(err.message));
    } else {
      alert("create order first");
      navigate("/tables");
    }
    return () => {
      setTempOrderArray({});
    };
  }, []);
  if (id) {
    return (
      <div className="w-full">
        {!errMsg ? (
          <>
            <Selection />
            <Order />
          </>
        ) : (
          <div className="bg-gray-900 text-white p-5 text-4xl justify-center items-center flex w-full h-screen">
            {errMsg} 🫠😵‍💫💀
          </div>
        )}
      </div>
    );
  }
}
