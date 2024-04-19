import {
  AiFillCaretRight,
  AiFillFile,
  AiTwotoneFolderAdd,
  AiTwotoneFolderOpen,
} from "react-icons/ai";
import { Fragment, useState } from "react";
import { Menu, menu } from "~/constants/config";

import Link from "next/link";
import { PropsMenu } from "./interfaces";
import clsx from "clsx";
import styles from "./Menu.module.scss";
import { useRouter } from "next/router";

function Menu({}: PropsMenu) {
  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {menu.map((itemMenu, i) => (
          <Item key={i} data={itemMenu} />
        ))}
      </div>
    </div>
  );
}

function Item({ data }: { data: Menu }) {
  const [showGroup, setShowGroup] = useState(false);
  const { pathname } = useRouter();
  return (
    <div className={styles.item}>
      {data?.path ? (
        <Link
          href={data?.path}
          className={clsx(styles.title, {
            [styles.active]: data?.path == pathname,
          })}
        >
          <i>{data?.Icon ? data?.Icon() : <AiFillFile />}</i>
          {data.title}
        </Link>
      ) : (
        <Fragment>
          <p className={styles.title} onClick={() => setShowGroup(!showGroup)}>
            <i>
              {showGroup ? <AiTwotoneFolderOpen /> : <AiTwotoneFolderAdd />}
            </i>
            {data.title}
          </p>
          {showGroup && data?.group
            ? data.group.map((item, i) => <Item data={item} key={i} />)
            : null}
        </Fragment>
      )}
    </div>
  );
}

export default Menu;
