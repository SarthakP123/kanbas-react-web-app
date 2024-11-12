import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div id="wd-account-navigation">

      {currentUser && <Link to={`/Kanbas/Account/Profile`}> Profile </Link>}
    </div>
  );
}
