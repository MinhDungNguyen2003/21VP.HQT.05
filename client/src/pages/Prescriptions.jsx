import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import patientRecordService from "../features/patientRecord/patientRecordServices";
import prescribeMedicineService from "../features/prescribeMedicine/prescribeMedicineServices";
import serviceUseService from "../features/serviceUse/serviceUseServices";

export default function Prescriptions() {
  const location = useLocation();
  const recordId = location.pathname.split("/")[2];
  const [patientRecord, setPatientRecord] = useState([]);
  let [medicines, setMedicines] = useState([
    { order: 1, medicine: "Toothpaste", quantity: 2, price: 4.0 },
    { order: 2, medicine: "Mouthwash", quantity: 1, price: 2.0 },
  ]);

  let [services, setServices] = useState([
    { order: 1, service: "Dental Cleaning", quantity: 1, price: 10.0 },
    { order: 2, service: "X-Ray", quantity: 1, price: 5.0 },
  ]);

  const totalMedicinePrice = medicines.reduce(
    (total, medicine) => total + medicine.price,
    0
  );

  const totalServicePrice = services.reduce(
    (total, service) => total + service.price,
    0
  );

  const totalPrice = totalMedicinePrice + totalServicePrice;
  useEffect(() => {
    patientRecordService
      .getOnePatientRecord(recordId)
      .then((res) => setPatientRecord(res || []));
    prescribeMedicineService
      .getPrescribeMedicineByRecordId(recordId)
      .then((res) => setMedicines(res || []));
    serviceUseService
      .getServiceUseByRecordId(recordId)
      .then((res) => setServices(res || []));
  }, []);
  return (
    <>
      <NavBar />
      <div className="container mx-auto my-8 p-8 bg-white shadow-xl text-center">
        <h2 className="text-4xl font-semibold mb-4 pb-7">Dental Prescription</h2>
        <div className='flex flex-col pl-20'>
          <div className='flex flex-row gap-[130px] text-xl pb-2'>
              <div className='font-bold'>Patient's name: </div>
              <div className=''>Cristiano</div>
          </div>
          <div className='flex flex-row gap-[162px] text-xl pb-2'>
              <div className='font-bold'>Patient's ID: </div>
              <div className=''>01234ABC</div>
          </div>
        
          <div className='flex flex-row gap-[153px] text-xl pb-2'>
              <div className='font-bold'>Date of birth:</div>
              <div className=''>2/5/1987</div>
          </div>
          <div className='flex flex-row gap-[166px] text-xl pb-2'>
              <div className='font-bold'>Symptoms:</div>
              <div className=''>Tooth decay</div>
          </div>
          <div className='flex flex-row gap-[173px] text-xl pb-2'>
              <div className='font-bold'>Diagnosis:</div>
              <div className=''>Cavity detected</div>
          </div>
          <div className='flex flex-row gap-[160px] text-xl pb-2'>
              <div className='font-bold'>Dentist's ID: </div>
              <div className=''>05678CDE</div>
          </div>
          <div className='flex flex-row gap-[156px] text-xl pb-8'>
              <div className='font-bold'>Date of visit:</div>
              <div className=''>25/8/2023</div>
          </div>
        </div>

        <div className="w-full text-xl">
          <div className="bg-gray-200 flex flex-row justify-between px-4 py-2 font-bold">
            <div className="flex-1">Order</div>
            <div className="flex-1">Medicine</div>
            <div className="flex-1">Quantity</div>
            <div className="flex-1">Price</div>
          </div>

          {medicines.map((medicine) => (
            <div
              key={medicine.order}
              className="flex flex-row justify-between px-4 py-2"
            >
              <div className="flex-1">{medicine.order}</div>
              <div className="flex-1">{medicine.medicine}</div>
              <div className="flex-1">{medicine.quantity}</div>
              <div className="flex-1">${medicine.price.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto  p-8 bg-white shadow-xl text-center">
        <div className="w-full text-xl">
          <div className="bg-gray-200 flex flex-row justify-between px-4 py-2 font-bold">
            <div className="flex-1">Order</div>
            <div className="flex-1">Service</div>
            <div className="flex-1">Quantity</div>
            <div className="flex-1">Price</div>
          </div>

          {services.map((service) => (
            <div
              key={service.order}
              className="flex flex-row justify-between px-4 py-2"
            >
              <div className="flex-1">{service.order}</div>
              <div className="flex-1">{service.service}</div>
              <div className="flex-1">{service.quantity}</div>
              <div className="flex-1">${service.price.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-row gap-4 items-center pt-5 pl-40">
        <div className="text-2xl font-semibold">Advice: </div>
        <div className="text-xl">
          {" "}
          Brush your teeth 3 times a day, avoid eating much sugary food
        </div>
      </div>

      <div className="container mx-auto my-8 p-8 bg-white shadow-xl flex flex-row justify-evenly gap-[822px]">
        <h2 className="text-3xl font-bold">TOTAL:</h2>
        <div className="text-2xl ">${totalPrice.toFixed(2)}</div>
      </div>

      <Footer />
    </>
  );
}
