import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [values, setValues] = useState("");
  const [result, setResults] = useState<string[]>([]);
  const [valuesCount, setValuesCount] = useState(0);
  const [resultsCount, setResultsCount] = useState(0);
  const handleReset = () => {
    setResults([]);
    setValues("");
  };

  const getData = async () => {
    let search = values.split("\n");
    setValuesCount(search.length);
    let resultArray: string[] = [];

    for (let j = 0; j < Math.ceil(search.length / 9); j++) {
      setTimeout(async () => {
        for (let i = 0; i < 9; i++) {
          if (search[i + 9 * j]) {
            let res = await axios.get("/v1/search/local.json", {
              params: {
                query: search[i + 9 * j],
                display: 1,
              },
              headers: {
                "X-Naver-Client-Id": process.env.NEXT_PUBLIC_ID_KEY,
                "X-Naver-Client-Secret": process.env.NEXT_PUBLIC_SECRET_KEY,
              },
            });

            resultArray.push(
              res.data.items.length === 0
                ? `${search[i + 9 * j]}-검색 실패`
                : res.data.items[0].roadAddress
            );
          }
        }
        setResults(result.concat(resultArray));
        setResultsCount(result.concat(resultArray).length);
      }, 1500 * j);
    }
  };

  return (
    <div
      className="App"
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "500px",
        }}
      >
        <div
          style={{
            height: "100%",
          }}
        >
          <h2>입력 개수 : {valuesCount}</h2>
          <textarea
            onChange={(e) => {
              setValues(e.target.value);
            }}
            value={values}
            style={{
              resize: "none",
              height: "100%",
              width: 394,
              outline: "none",
              padding: 0,
              border: "solid 1px black",
              fontFamily: "-moz-initial",
              fontSize: 14,
              lineHeight: "170%",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: 20,
            gap: 40,
          }}
        >
          <button
            disabled={values.length === 0}
            onClick={getData}
            style={{
              width: 120,
              height: 50,
            }}
          >
            주소변환
          </button>
          <button
            onClick={handleReset}
            style={{
              width: 120,
              height: 50,
            }}
          >
            초기화
          </button>
        </div>

        <div
          style={{
            height: "100%",
          }}
        >
          <h2>출력 개수 : {resultsCount}</h2>
          <div
            style={{
              height: "100%",
              width: 600,
              border: "solid 1px black",
              fontFamily: "-moz-initial",
              fontSize: 14,
              textAlign: "left",
              lineHeight: "170%",
              overflowY: "scroll",
            }}
          >
            {result.map((ele, idx) => (
              <div
                key={idx + "result"}
                className={ele.includes("검색 실패") ? "red" : ""}
              >
                {ele}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
