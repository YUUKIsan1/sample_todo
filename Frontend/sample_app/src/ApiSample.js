import React, { useState, useEffect } from 'react';

function ApiSample() {
  let date = new Date();
  const [time, setTime] = useState(date);
  // dataには何が入る？
  // setDataの呼び出し箇所に注目（※１）
  const [data, setData] = useState(/* ここに初期値。無しだとundefinedになる */);

  useEffect(() => {
    console.log("call useEffect START");
    const intervalId = setInterval(() => {
      console.log("call interval START");
      setTime(new Date());
      fetch('http://localhost:8080').then(response=>{
        response.json().then(value=>{
          // ※２
          console.log(value);
          // ※１：valueがdataに代入される
          // data = value; と同義
          // ではなぜdata = value; ではないのか？
          // ApiSample関数コンポーネントがdata（じゃんけん）の最新情報を描画するため
          // useStateを活用することで最新情報を保存することができます
          setData(value);
        })
        // catchを入れることで、サーバに接続できなくなったときに画面にエラーを出す代わりにコンソールに出す
      }).catch(error => {console.log(error)});
      console.log("call interval END");
    }, 1000);

    console.log("call useEffect END");
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // !data ? '読み込み中' : data.hand
  // dataがnullやundefinedの場合 読み込み中 を表示
  // dataがnullやundefined以外の場合，data.hand を表示
  // ここでdata.handのみだと画面上にエラーが表示されてしまう
  // dataの中身はどのように判断できるか？
  // 最終的には※２のconsole.logの出力内容で判断しましょう！
  // data.hand: じゃんけんのグーチョキパー
  // data.createdTime: じゃんけんの手が出された時間
  return (
    <div>
      <h1>現在の時刻</h1>
      <p>{time.toLocaleTimeString()}</p>
      <h3>じゃんけん</h3>
      <p>ポン：{!data ? '読み込み中' : data.hand}</p>
      <p>サーバ時間：{!data ? '読み込み中' : data.createdTime}</p>
    </div>
  );
}

export default ApiSample;
