'use strict'

// json url 가져오는 변수
const requestURL = './data/pokemonList.json';

// 요청을 만들기 위해, XMLHttpRequest 생성자로부터 새로운 request 인스턴스 생성
const request = new XMLHttpRequest();

// open() 메서드로 새로운 요청 생성
request.open('GET', requestURL);

// responseType을 json으로 설정
// XHR로 하여금 서버가 json 데이터를 반환할 것이며, js 객체로 변환될 것이라는 걸 명시
request.responseType = 'json';

// send() 메서드로 요청 보내기
request.send();

// request.onload 로 서버의 응답을 기다린 후 함수 실행
request.onload = function() {
  // response 프로퍼티를 사용하여, json 데이터에 기반한 js 객체를 변수에 저장
  const pokemonList = request.response;

  const list = document.querySelector('.wrap_list');
  const searchInput = document.querySelector('.searchbar');
  const searchBtn = document.querySelector('.btn_search');

  function showList(txt) {
    list.innerHTML = '';
  
    // txt가 빈 값이 아니면
    if(txt !== '') {
      for (let i = 0; i < pokemonList.length; i++) {
        const li = document.createElement('li');
        const pokemon = pokemonList[i];
  
        // pokemon.name이 txt를 포함하면
        if(pokemon.name.includes(txt)) {
          li.innerHTML = `
            <img src='${pokemon.url}' alt='${pokemon.name}'>
            <br/><span class='txt_name'>${pokemon.name}</span>
          `
  
          // list에 자식 요소(li) 추가
          list.appendChild(li);
        }
      }
    } else alert('포켓몬 이름을 입력하세요.'); // pokemon.name이 txt를 포함하지 않으면
  }
  
  // searchBtn이 click 되면
  searchBtn.addEventListener('click', (e) => {
    e.preventDefault(); // 기본 이벤트 방지
    const txt = searchInput.value;
    showList(txt);
  })
}
