import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [values, setValues] = useState("");
  const [result, setResults] = useState<string[]>([]);

  const handleReset = () => {
    setResults([]);
    setValues("");
  };

  const getData = async () => {
    let search = values.split("\n");

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
                ? "결과가 검색되지 않았습니다."
                : res.data.items[0].address
            );
          }
        }
        setResults(result.concat(resultArray));
      }, 1000 * j);
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
      <h1>강영우 메롱</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "500px",
        }}
      >
        <textarea
          onChange={(e) => {
            setValues(e.target.value);
          }}
          value={values}
          style={{
            resize: "none",
            height: "100%",
            width: 294,
            outline: "none",
            padding: 0,
            border: "solid 1px black",
            fontFamily: "-moz-initial",
            fontSize: 14,
            lineHeight: "170%",
          }}
        />
        <button
          disabled={values.length === 0}
          onClick={getData}
          style={{
            width: 120,
            height: 50,
            margin: 14,
          }}
        >
          주소변환
        </button>
        <div
          style={{
            height: "100%",
            width: 300,
            border: "solid 1px black",
            fontFamily: "-moz-initial",
            fontSize: 14,
            textAlign: "left",
            lineHeight: "170%",
            overflowY: "scroll",
          }}
        >
          {result.map((ele, idx) => (
            <div key={idx + "result"}>{ele}</div>
          ))}
        </div>
      </div>
      <button
        onClick={handleReset}
        style={{
          width: 120,
          height: 50,
          margin: 14,
        }}
      >
        초기화
      </button>
    </div>
  );
}
