import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../styles/BlogCard.module.css";
import Link from "next/link";

const Search = ({ blogs, success }) => {
  useEffect(() => {
    if (success == true) {
      toast.success("Your search result", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("no data found", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  }, [blogs]);

  return (
    <div style={{ backgroundColor: "#18151f" }}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <main className={`container min-vh-100`}>
        {blogs &&
          blogs.map((item, index) => {
            return (
              <div key={item._id} className="py-4">
                <article
                  className={`${styles.postcard} ${styles.dark} ${
                    index % 4 == 0
                      ? styles.blue
                      : index % 4 == 1
                      ? styles.red
                      : index % 4 == 2
                      ? styles.green
                      : index % 4 == 3
                      ? styles.yellow
                      : styles.blue
                  } ${index % 2 == 0 ? "flex-row-reverse" : ``}`}
                >
                  <Link href={`/blogposts/${item.slug}`}>
                    <a className={styles.postcard__img_link}>
                      <img
                        className={styles.postcard__img}
                        src={item.imageUrl}
                        alt="Image Title"
                      />
                    </a>
                  </Link>
                  <div className={`${styles.postcard__text} ${styles.tdark}`}>
                    <Link href={`/blogposts/${item.slug}`}>
                      <h1
                        className={`${styles.postcard__title} ${styles.blue} `}
                      >
                        <a href="#">{item.title}</a>
                      </h1>
                    </Link>
                    <div
                      className={`${styles.postcard__subtitle} ${styles.small}`}
                    >
                      <time dateTime="2020-05-25 12:00:00">
                        <i className="fas fa-calendar-alt mr-2 mx-2"></i>
                        {item.date}
                      </time>
                    </div>

                    <div className={styles.postcard__bar}></div>
                    {item.subtitle}
                    <div className={styles.postcard__previewtxt}>
                      Description :<div>{item.description}</div>
                    </div>
                    <ul className={styles.postcard__tagbox}>
                      <li className={styles.tag__item}>
                        <i className="fas fa-tag mr-2 mx-2"></i>
                        {item.tag1}
                      </li>
                      <li className={styles.tag__item}>
                        <i className="fas fa-tag mr-2 mx-2"></i>
                        {item.tag2}
                      </li>
                      <li className={styles.tag__item}>
                        <i className="fas fa-tag mr-2 mx-2"></i>
                        {item.tag3}
                      </li>
                    </ul>
                  </div>
                </article>
              </div>
            );
          })}
        {!success && (
          <div style={{ height: "100vh" }}>
            {" "}
            <h1 className="text-center text-white p-5">No Data Found</h1>
          </div>
        )}
      </main>
    </div>
  );
};

export async function getServerSideProps(context) {
  const search = context.query.search;
  const data = {
    search,
  };

  let res = await fetch("http://localhost:3000/api/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  let response = await res.json();
  return {
    props: {
      blogs: JSON.parse(JSON.stringify(response.blogs)),
      success: response.success,
    }, // will be passed to the page component as props
  };
}

export default Search;
