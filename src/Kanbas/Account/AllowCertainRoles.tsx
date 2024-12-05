import { useSelector } from 'react-redux';
export default function AllowCertainRoles({
  children,
  role,
}: {
  children: any;
  role: string;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  if (currentUser && currentUser.role && currentUser.role === role) {
    return children;
  } else {
    return <></>;
  }
}