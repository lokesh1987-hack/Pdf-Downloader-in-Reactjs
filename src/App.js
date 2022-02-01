import axios from "axios";
import { useState } from "react";

function App() {
  const [inputedUrl, setInputedUrl] = useState();
  const [error,setError] = useState(false)

  const formSubmit = (e) => {
    e.preventDefault();

    const url = (inputedUrl.includes('https'))? inputedUrl : inputedUrl.replace("http", "https")
    console.log(url)
    axios({
      url: `${url}`,
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        setError(false)
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement("a");

        fileLink.href = fileURL;
        fileLink.setAttribute("download", "file.pdf");
        document.body.appendChild(fileLink);
        fileLink.click();
      })
      .catch((response) => {
        console.log(response.data);
        setError(true)
      });
  };

  return (
    <div className="text-center">
      <div className="bg-light p-2 pt-5">
        <p className="h1">Enter pdf Url or Link</p>
      </div>
      <div className="p-4 bg-light bp-5 ">
        <form onSubmit={formSubmit}>
          <input
            className="input p-1 m-2 w-75 "
            type="text"
            value={inputedUrl}
            onChange={(e) => setInputedUrl(e.target.value)}
          />
          <button className="btn btn-success " type="submit">
            Download
          </button>
        </form>
      {(error === true) && <p className="h3 text-danger">Enter Valid Url</p>}

      </div>
    </div>
  );
}

export default App;
