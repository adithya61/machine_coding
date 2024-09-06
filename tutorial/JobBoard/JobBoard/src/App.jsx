/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./App.css";
import JobPosting from "./JobPosting";

function App() {
  const [items, setItems] = useState([]);
  const [ids, setIds] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [currPage, setCurrPage] = useState(0);

  useEffect(() => {
    fetchPageContent(currPage);
  }, [currPage]);

  const API_ENDPOINT = "https://hacker-news.firebaseio.com/v0";
  const ITEMS_PER_PAGE = 6;

  async function fetchPageContent(currPage) {
    setFetching(true);

    let tempIds = ids;

    if (tempIds.length <= 0) {
      const res = await fetch(API_ENDPOINT + "/jobstories.json");
      const jobIds = await res.json();

      setIds([...jobIds]);
      tempIds = jobIds;
    }

    const curPageJobs = tempIds.slice(
      currPage * ITEMS_PER_PAGE,
      currPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );

    const items = await Promise.all(
      curPageJobs.map((id) =>
        fetch(API_ENDPOINT + `/item/${id}.json`).then((res) => res.json())
      )
    );

    setItems(items);

    setFetching(false);
  }

  return (
    <>
      <div className="app">
        <h1>Hacker news job board</h1>
        {fetching ? (
          <p>Items loading</p>
        ) : (
          <div>
            Job Listings
            <div className="items">
              {items.map((item) => {
                return (
                  <JobPosting
                    key={item.id}
                    url={item.url}
                    title={item.title}
                    by={item.by}
                  />
                );
              })}
            </div>
            <button onClick={() => setCurrPage(currPage + 1)}>
              load more jobs
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
