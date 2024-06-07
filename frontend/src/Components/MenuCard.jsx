import { useContext, useEffect } from "react";
import { useApi } from "../Context/Context";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MenuCard({ menudata }) {
  const { tempOrderArray, setOrderArray, setTempOrderArray } = useApi();

  // console.log(menudata);
  // console.log(tempOrderArray);
  // useEffect(() => {
  //   fetch("http://localhost:3000/api/getOrder/1")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setOrderArray(data.data);
  //       setTempOrderArray({
  //         items: data.data.items,
  //         quantity: data.data.quantity,
  //         notes: data.data.notes,
  //       });
  //     })
  //     .catch((err) => console.log(err));
  //   console.log("ran");
  // }, []);

  const handleSelect = (id) => {
    console.log(id);
    const selectedItem = menudata.filter((itm) => itm._id === id)[0];
    console.log(selectedItem);
    const duplicate = tempOrderArray.items.filter((itm) => itm._id === id);

    if (!duplicate.length > 0) {
      // console.log([
      //   ...tempOrderArray,
      //   {
      //     ...selectedItem,
      //     qty: [...selectedItem.qty, 1],
      //     note: [...selectedItem.note, ""],
      //   },
      // ]);
      setTempOrderArray({
        ...tempOrderArray,
        items: [...tempOrderArray.items, selectedItem],
        quantity: [...tempOrderArray.quantity, 1],
        notes: [...tempOrderArray.notes, ""],
      });
      toast.success("Items added");
    } else {
      const dupHandleArr = tempOrderArray.items.map((obj) =>
        obj._id === id ? { ...obj, qty: obj.qty++ } : obj
      );
      // console.log(dupHandleArr);
      // setTempOrderArray(dupHandleArr);
      toast.error("Already in the Order List!!");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {menudata &&
        menudata.map((data) => {
          const { _id, name, image, category, availability, price } = data;

          return (
            <div
              className="flex bg-blend-overlay"
              onClick={() => handleSelect(_id)}
              key={_id}
            >
              <div className="rounded-xl shadow-lg bg-black w-48 h-24 flex flex-col justify-center  m-4 p-2">
                {/* <img src={image} alt="" className="w-32 block m-auto" /> */}
                <div className="text-center">
                  <h2 className="block text-base">{name}</h2>
                  <span className="font-light text-sm">{price}</span>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
