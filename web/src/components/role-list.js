import { Link } from "gatsby";
import React from "react";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import { ucfirst } from "../lib/string-utils";

import styles from "./role-list.module.css";

function RoleList({ items, title }) {
  return (
    <div className={styles.root}>
      <h2 className={styles.headline}>{title}</h2>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item._key} className={styles.listItem}>
            <div>
              <div className={styles.avatar}>
                {item.author && item.author.image && item.author.image.asset && (
                  <img
                    src={imageUrlFor(buildImageObj(item.author.image))
                      .width(100)
                      .height(100)
                      .fit("crop")
                      .url()}
                    alt={item.author.name}
                  />
                )}
              </div>
            </div>
            <div>
              <div>
                <Link to={`/authors/${item.author.slug.current}`}>
                  <strong>{(item.author && item.author.name) || <em>Missing name</em>}</strong>
                </Link>
              </div>
              {item.roles && (
                <div>
                  {item.roles.map((role, idx) => {
                    switch (true) {
                      case idx === 0:
                        return <span key={role}>{ucfirst(role)}</span>;
                      case idx === item.roles.length - 1:
                        return <span key={role}> & {role}</span>;
                      default:
                        return <span key={role}>, {role}</span>;
                    }
                  })}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RoleList;
