import Header from "@/components/Header";
import { useRouter } from "next/router";
import { Fragment, useContext } from "react";
import MyContext from "@/store/context";

const AuthPage = () => {
  const router = useRouter();
  const ctx = useContext(MyContext);

  const authToken = router.query.code;
  console.log(authToken);

  const clickHnadler = () => {
    ctx.setData(authToken);
    router.push('/');
  }

  return (
    <Fragment>
      <Header />
      <div className="flex justify-center">
        <button className="flex-no-shrink px-3 border-2 rounded bg-[#bc6cf9] hover:bg-[#9c41f4]" onClick={clickHnadler}>
          Go Back
        </button>
      </div>
    </Fragment>
  );
};

export default AuthPage;
