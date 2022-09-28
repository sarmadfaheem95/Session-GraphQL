import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_CHARACTERS } from "../../queries/character";

interface Character {
  name: string;
  image: string;
}

export default function CharactersList() {
  const [search, setSearch] = useState("");
  const [fetchData, { data, loading }] = useLazyQuery(GET_CHARACTERS);
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="search-box">
        <input type="search" placeholder="Search" value={search} onChange={(e) => setSearch(e?.target?.value)} />
        <button
          onClick={() => {
            fetchData({
              variables: {
                filter: {
                  name: search,
                },
              },
            });
          }}
        >
          Search
        </button>
      </div>
      <>
        {loading && (
          <div className="loader-box">
            <div className="loader" />
          </div>
        )}
        <div className="card-list">
          {data?.characters?.results?.length === 0 ? (
            <p className="no-results">No results found.</p>
          ) : (
            data?.characters?.results?.map((item: Character, ind: number) => (
              <div key={ind} className="card">
                <img src={item.image} alt="" />
                <p>{item?.name}</p>
              </div>
            ))
          )}
        </div>
      </>
    </div>
  );
}
