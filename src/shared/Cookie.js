// 키값 기준으로 쿠키에 저장된 값을 가져오는 함수
const getCookie = (name) => {

    // 쿠키 값을 가져옵니다.
    let value = "; " + document.cookie;
    console.log(document.cookie);
    // ;
    // __tawkuuid=e::localhost::jBgmOxFadeHXqz8/
    // emxPEQ44+fPkmSY3WfaFtycy9VpztkgxBq8pqaQaSnAf/9UY::2; 
    // undefined=undefined; user_id=perl; user_pwd=pppp

    // 키 값을 기준으로 파싱합니다.
    let parts = value.split("; " + name + "=");
    console.log(parts);
    // ['; __tawkuuid=e::localhost::jBgmOxFadeHXqz8/
    // emxPEQ4…y9VpztkgxBq8pqaQaSnAf/9UY::2; undefined=undefined', 'perl; user_pwd=pppp']

    // value를 return!
    if (parts.length === 2) {

          return parts.pop().split(";").shift();
          // pop() 배열의 맨 뒷값을 빼서 반환해준다.
          // shift() 배열의 맨 앞값을 빼서 반환해준다.
          // perl
      }
    
  };
  
  // 쿠키에 저장하는 함수
  const setCookie = (name, value, exp = 5) => {
    // setCookie 함수는 exp를 지정해주지 않더라도 쓸 수 있다. 기본값을 지정해줬으니까!
    let date = new Date();
    // 날짜를 만들어줍니다.
    date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
    // 저장!
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
  };
  
  // 만료일을 예전으로 설정해 쿠키를 지웁니다.
  const deleteCookie = (name) => {
    document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
  }
  
  export { getCookie, setCookie, deleteCookie };