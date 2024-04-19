import { PropsCheckPermission } from "./interfaces";
import { RootState } from "~/redux/store";
import styles from "./CheckPermission.module.scss";
import { useMemo } from "react";
import { useSelector } from "react-redux";


function CheckPermission({
  children,
  pageKey,
  permissionId,
}: PropsCheckPermission) {
  const permissionList  = useSelector((state: any) => state.auth.permissionList);

  const isDisplay: boolean = useMemo(
    () =>
      permissionList && !!permissionList.find(
        (x : {permissionId: number,  pageKey: string, active : number} ) => x.permissionId == permissionId && x.pageKey == pageKey && x.active === 1
      ),
    [pageKey, permissionId, permissionList]
  );
  return isDisplay ? children : null;
}

export default CheckPermission;
