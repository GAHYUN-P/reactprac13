import React from "react";
import _ from "lodash"; // lodash 부르기, _안에 디바운스와 스로틀이 들어있다.

const Search = () => {
//   // 디바운스 : 일정 시간을 기다렸다가 이벤트를 수행한다
//   // 일정 시간 내에 같은 이벤트가 또 들어오면 이전 요청은 취소된다.
//   const debounce = _.debounce((k) => console.log("디바운스! :::", k), 1000);
//   const keyPress = React.useCallback(debounce, []);

  const onChange = (e) => {
    keyPress(e.target.value);
  };

  // 쓰로틀 : 일정 시간 동안 일어난 이벤트를 모아서 주기적으로 1번씩 실행해줘요.
  const throttle = _.throttle((k) => console.log("쓰로틀! :::", k), 1000);
  const keyPress = React.useCallback(throttle, []);


  return (
    <div>
      <label>Search:</label>
      <input onChange={onChange} />
    </div>
  );
};

export default Search;