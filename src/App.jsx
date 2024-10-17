import { useRef, useState } from "react";
import { useForm } from "./hooks/useForm";

function App() {
  const initialValue = {
    name: "",
    lastName: "",
    email: "",
    password: "",
    file: "",
  };
  const { formState, setFormState, onInputChange, onResetForm } =
    useForm(initialValue);
  const [selectecImage, SetSelectecImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormState({ ...formState, file });
      SetSelectecImage(URL.createObjectURL(file));
    }
  };

  const inputFileRef = useRef();
  const handleClick = () => {
    inputFileRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(formState).forEach((key) => {
      formData.append(key, formState[key]);
    });

    //TODO: send formData to the backend
    onResetForm();
  };

  return (
    <main className="container-fluid flex flex-col justify-center items-center bg-black text-white p-4 min-h-screen">
      <h1 className="text-center font-bold p-2">Upload image</h1>
      <form className="container flex flex-col gap-2 justify-center items-center p-8 rounded-lg max-w-xl bg-slate-800 shadow-inner shadow-slate-400">
        <section className="p-5" onClick={handleClick}>
          {selectecImage ? (
            <img
              className={` ${
                selectecImage ? " border-4" : ""
              } rounded-lg h-52 w-52 object-cover border-4 hover:brightness-105 hover:scale-110 ease-in-out duration-200`}
              src={selectecImage}
              alt=""
            />
          ) : (
            <div className="flex flex-col justify-center items-center rounded-lg cursor-pointer font-bold bg-black h-52 w-52">
              <span className="text-5xl font-bold">+</span>
              <span className="text-xs">Upload image</span>
            </div>
          )}
        </section>
        <section className="flex flex-col gap-3 text-black p-2 w-64 lg:w-80">
          <input
            className="rounded-md shadow-inner p-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
            onChange={onInputChange}
            value={formState.name}
            type="name"
            id="name"
            name="name"
            placeholder=" name"
            required
          />
          <input
            className="rounded-md shadow-inner p-1 border border-gray-300 focus:outline-none focus:ring-2  focus:ring-lime-500"
            onChange={onInputChange}
            value={formState.lastName}
            type="lastName"
            id="lastName"
            name="lastName"
            placeholder=" lastName"
            required
          />
          <input
            className="rounded-md shadow-inner p-1 border border-gray-300 focus:outline-none focus:ring-2  focus:ring-lime-500"
            onChange={onInputChange}
            value={formState.email}
            type="email"
            id="email"
            name="email"
            placeholder=" email@gmail.com"
            required
          />
          <input
            className="rounded-md shadow-inner p-1 border border-gray-300 focus:outline-none focus:ring-2  focus:ring-lime-500"
            onChange={onInputChange}
            value={formState.password}
            type="password"
            id="password"
            name="password"
            placeholder=" *****"
            autoComplete="true"
            required
          />
          <input
            onChange={handleImageUpload}
            ref={inputFileRef}
            className="hidden"
            type="file"
            name="file"
            id="file"
          />
        </section>
        <button
          type="submit"
          onClick={(e) => handleSubmit(e, formState, selectecImage)}
          className="bg-lime-500 hover:bg-lime-400 p-2 mt-5 rounded-lg"
        >
          Create perfil
        </button>
      </form>
    </main>
  );
}

export default App;
