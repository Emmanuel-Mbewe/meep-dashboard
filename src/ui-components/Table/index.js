import React from 'react';
import styles from './Table.module.css';
import { FaLongArrowAltDown } from 'react-icons/fa';

const Table = ({ mainHeading, subHeading, headingRightItem = () => {}, heading, data }) => {
  return (
    <section className={styles['table-container']}>
      <div className={styles['table-header']}>
        <div>
          {mainHeading && <h4 className="s-16">{mainHeading}</h4>}
          {subHeading && <p className="s-12 tc-grey">{subHeading}</p>}
        </div>
        <div>{headingRightItem()}</div>
      </div>
      <div className={styles['table-wrapper']}>
        <table className={styles['table']}>
          <thead>
            <tr>
              {heading.map((th, i) => (
                <React.Fragment key={`th-${i}`}>
                  {th.icon ? (
                    <th>
                      <span>{th.heading}</span>
                      <span>
                        <FaLongArrowAltDown />
                      </span>
                    </th>
                  ) : (
                    <th>{th.heading}</th>
                  )}
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((tr, index) => (
              <tr key={tr.id || index}>
                {heading.map((th, i) => {
                  const td = tr[th.key];
                  return td.component ? (
                    <td key={`td-${i}`}>{td.component()}</td>
                  ) : td.icon ? (
                    <td key={`td-${i}`}>
                      <span>
                        {td.icon && <td.icon />}
                      </span>
                      <span>{td.value}</span>
                    </td>
                  ) : (
                    <td key={`td-${i}`}>{td.value}</td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Table;