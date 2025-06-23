import React, { useEffect, useState } from "react";
import axios from "axios";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import {toast, ToastContainer}from 'react-toastify'

const AddMembers = () => {
  const [loaderImage, setLoaderImage] = useState(false);
  const [membershipList, setMembershipList] = useState([]);
  const [selectedOption , setSelectedOption] = useState("");
  const [inputField, setInputField] = useState({
    name: "",
    mobileNo: "", // corrected from mobilNo
    address: "",
    memberShip: "",
    profilePic: "",
    joiningDate: "",
  });

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.log("No file selected");
      return;
    }

    setLoaderImage(true); // Start loader here

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "gym-gms"); // Unsigned preset

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dehdpbk2h/image/upload",
        data
      );
      const imageUrl = response.data.secure_url;
      setInputField({ ...inputField, profilePic: imageUrl });
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
    } finally {
      setLoaderImage(false); // Stop loader here
    }
  };
  const fetchMembership = async () => {
    await axios
      .get("http://localhost:3002/plans/get-membership", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setMembershipList(res.data.membership);
        if(res.data.membership.length === 0){
          return toast.error("No Membership Added Yet",{className:"text-lg"})
        }else{
          let a = res.data.membership[0]._id;
          // setSelectedOption(a)
          setInputField({...inputField, membership:a})
        }
        

      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Went Wrong.")
      });
  };
  useEffect(() => {
    console.log(inputField);
    fetchMembership();
  }, []);

  const handleOnChangeSelect = (event)=>{
    let value = event.target.value
    setSelectedOption(value)
    setInputField({...inputField, membership:value})
  };
  const handleRegisterBtn =async ()=>{
    await axios.post("http://localhost:3002/members/register-member", inputField, {withCredentials:true}).then((res)=>{
      console.log(res);
      toast.success("Added Successfully.")
      setTimeout(() => {
        window.location.reload();
      },2000);
    }).catch(err=>{
      console.log(err);
      toast.error("Something Went Wrong.")
      
    })
  }
  return (
    <div className="text-black">
      <div className="grid gap-5 grid-cols-2 text-lg">
        <input
          value={inputField.name}
          onChange={(e) => handleOnChange(e, "name")}
          type="text"
          placeholder="Name of the Joinee"
          className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
        />

        <input
          value={inputField.mobileNo}
          onChange={(e) => handleOnChange(e, "mobileNo")}
          type="number"
          placeholder="Mobile No"
          className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
        />

        <input
          value={inputField.address}
          onChange={(e) => handleOnChange(e, "address")}
          type="text"
          placeholder="Enter Address"
          className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
        />

        <input
          value={inputField.joiningDate}
          onChange={(e) => handleOnChange(e, "joiningDate")}
          type="date"
          className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
        />

        <select
          value={selectedOption}
          onChange={(e) => handleOnChangeSelect(e, "memberShip")}
          className="border-2 w-[90%] h-12 pt-2 pb-2 border-slate-400 rounded-md">
          {
            membershipList.map((item , index)=>{
              return (
                <option key = {index} value={item._id}> {item.months} Moths Membership</option>
              );
            })
          }
        </select>

        <input type="file" onChange={uploadImage} />

        {/* Loader */}
        {loaderImage && (
          <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
            <LinearProgress color="secondary" />
          </Stack>
        )}

        {/* Image Preview */}
        {inputField.profilePic && (
          <div className="w-32 h-32 relative">
            <img
              src={inputField.profilePic}
              alt="Uploaded"
              className="absolute inset-0 rounded-full border-4 border-t-4 border-gray-300 border-t-blue-500 "
            />
          </div>
        )}

        {/* Submit Button */}
        <div onClick={()=>handleRegisterBtn()} className="p-3 border-2 mt-5 w-28 text-lg h-14 text-center bg-slate-900 text-white rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          Register
        </div>

      </div>
      <ToastContainer />
    </div>
  );
};

export default AddMembers;