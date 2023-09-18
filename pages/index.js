import Header from "@/components/Header";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import MyContext from "@/store/context";

export default function Home() {
  const inputRef = useRef();
  const [authURL, setAuthURL] = useState("");
  const [isAuth, setIsAuth] = useState(true);
  const [loading, setLoading] = useState(false);
  const ctx = useContext(MyContext);

  const userAuthHandler = async () => {
    const response = await fetch("http://localhost:8000/api/authenticate-user");
    const data = await response.json();
    console.log(data);
    setAuthURL(data.authUrl);
    localStorage.setItem("codeVerifier", data.codeVerifier);
    console.log(localStorage.getItem("codeVerifier"));
    // setIsAuth(true);
  };

  const searchButtonHandler = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      const codeVerifier = localStorage.getItem("codeVerifier");
      const response = await fetch("http://localhost:8000/api/get-token", {
        method: "POST",
        body: JSON.stringify({
          codeVerifier: codeVerifier,
          authCode: ctx.data,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      localStorage.setItem("token", data.access_token);
    } else {
      setLoading(true);
      const response = await fetch("http://localhost:8000/api/get-animeList", {
        method: "POST",
        body: JSON.stringify({ user: inputRef.current.value, token: token }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const animeData = await response.json();

      console.log(animeData);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ctx.data) {
      setIsAuth(true);
    }
  }, []);

  return (
    <Fragment>
      <Header />

      <main>
        {
          <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
            <div className="bg-white rounded shadow p-6 m-4 w-3/4 lg:max-w-lg">
              {isAuth ? (
                <div className=" mb-4">
                  <h1 className="text-grey-darkest">Search User</h1>
                  <div className="flex mt-4">
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                      placeholder="user name"
                      ref={inputRef}
                    />
                    <div className="flex items-center justify-center">
                      <button
                        className="flex-no-shrink px-3 border-2 rounded bg-[#bc6cf9] hover:bg-[#9c41f4]"
                        onClick={searchButtonHandler}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                  {loading && <p>Please wait while adding veidos to your playlist</p>}
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center">
                  <button
                    className="flex-no-shrink px-3 border-2 rounded bg-[#bc6cf9] hover:bg-[#9c41f4]"
                    onClick={userAuthHandler}
                  >
                    Authenticate User
                  </button>
                  {authURL && (
                    <a href={authURL} className="mt-2 underline text-blue">
                      Click on this link to verify user
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        }
      </main>
    </Fragment>
  );
}
